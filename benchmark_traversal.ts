
function createLargeScene(count: number) {
  const allObjects: any[] = [];
  const scene: any = { children: [] };
  allObjects.push(scene);

  for (let i = 0; i < count; i++) {
    const mesh: any = {
      uuid: `uuid-${i}`,
      name: i % 10 === 0 ? (i % 20 === 0 ? 'outline' : 'marble-points') : `mesh-${i}`,
      material: { uuid: `mat-uuid-${i}` },
      visible: true,
      parent: scene
    };
    scene.children.push(mesh);
    allObjects.push(mesh);
  }

  scene.traverse = function(callback: (obj: any) => void) {
    for (let i = 0; i < allObjects.length; i++) {
        callback(allObjects[i]);
    }
  };

  return scene;
}

const scene = createLargeScene(10000);
const originalMaterials = new Map<string, any>();
scene.traverse((child: any) => {
  if (child.uuid && child.material) {
    originalMaterials.set(child.uuid, child.material);
  }
});

function benchmarkTwoTraversals(model: any, materials: Map<string, any>) {
  const start = performance.now();

  // Reset materials
  model.traverse((child: any) => {
    if (child.uuid && materials.has(child.uuid)) {
      child.material = materials.get(child.uuid)!;
      child.visible = true;
    }
  });

  // Remove previous outlines and points
  const toRemove: any[] = [];
  model.traverse((child: any) => {
    if (child.name === 'outline' || child.name === 'marble-points') {
      toRemove.push(child);
    }
  });

  const end = performance.now();
  return end - start;
}

function benchmarkOneTraversal(model: any, materials: Map<string, any>) {
  const start = performance.now();

  const toRemove: any[] = [];
  model.traverse((child: any) => {
    if (child.uuid && materials.has(child.uuid)) {
      child.material = materials.get(child.uuid)!;
      child.visible = true;
    }
    if (child.name === 'outline' || child.name === 'marble-points') {
      toRemove.push(child);
    }
  });

  const end = performance.now();
  return end - start;
}

// Warm up
for (let i = 0; i < 100; i++) {
    benchmarkTwoTraversals(scene, originalMaterials);
    benchmarkOneTraversal(scene, originalMaterials);
}

const iterations = 10000;
let timeTwo = 0;
let timeOne = 0;

for (let i = 0; i < iterations; i++) {
  timeTwo += benchmarkTwoTraversals(scene, originalMaterials);
  timeOne += benchmarkOneTraversal(scene, originalMaterials);
}

console.log(`Average time for Two Traversals: ${(timeTwo / iterations).toFixed(4)}ms`);
console.log(`Average time for One Traversal: ${(timeOne / iterations).toFixed(4)}ms`);
console.log(`Improvement: ${(((timeTwo - timeOne) / timeTwo) * 100).toFixed(2)}%`);
