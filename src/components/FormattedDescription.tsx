import React from 'react';

interface FormattedDescriptionProps {
  description: string;
}

export const FormattedDescription: React.FC<FormattedDescriptionProps> = ({ description }) => {
  return (
    <div className="prose prose-invert max-w-none">
      {description.split('\n').map((paragraph, index) => (
        <p key={index} className="mb-2 last:mb-0">{paragraph}</p>
      ))}
    </div>
  );
};
