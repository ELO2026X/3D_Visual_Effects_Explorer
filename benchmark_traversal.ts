
// benchmark_traversal.ts
interface MaterialMock {
  uuid: string;
}

interface SceneObject {
  uuid?: string;
  name?: string;
  material?: MaterialMock;
  visible?: boolean;
  parent?: SceneObject;
  children?: SceneObject[];
  traverse?: (callback: (obj: SceneObject) => void) => void;
}

function createLargeScene(count: number): SceneObject {
  const allObjects: SceneObject[] = [];
  const scene: SceneObject = { children: [] };
  allObjects.push(scene);

  for (let i = 0; i < count; i++) {
    const mesh: SceneObject = {
      uuid: `uuid-${i}`,
      name: i % 10 === 0 ? (i % 20 === 0 ? 'outline' : 'marble-points') : `mesh-${i}`,
      material: { uuid: `mat-uuid-${i}` },
      visible: true,
      parent: scene
    };
    scene.children!.push(mesh);
    allObjects.push(mesh);
  }

  scene.traverse = function(callback: (obj: SceneObject) => void) {
    for (let i = 0; i < allObjects.length; i++) {
        callback(allObjects[i]);
    }
  };

  return scene;
}

const scene = createLargeScene(10000);
const originalMaterials = new Map<string, MaterialMock>();
scene.traverse!((child: SceneObject) => {
  if (child.uuid && child.material) {
    originalMaterials.set(child.uuid, child.material);
  }
});

function benchmarkTwoTraversals(model: SceneObject, materials: Map<string, MaterialMock>) {
  const start = performance.now();

  // Reset materials
  model.traverse!((child: SceneObject) => {
    if (child.uuid && materials.has(child.uuid)) {
      child.material = materials.get(child.uuid)!;
      child.visible = true;
    }
  });

  // Remove previous outlines and points
  const toRemove: SceneObject[] = [];
  model.traverse!((child: SceneObject) => {
    if (child.name === 'outline' || child.name === 'marble-points') {
      toRemove.push(child);
    }
  });

  const end = performance.now();
  return end - start;
}

function benchmarkOneTraversal(model: SceneObject, materials: Map<string, MaterialMock>) {
  const start = performance.now();

  const toRemove: SceneObject[] = [];
  model.traverse!((child: SceneObject) => {
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
