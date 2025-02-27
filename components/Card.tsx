import React, { ReactNode } from "react";
import clsx from "clsx";

interface ImageCardProps {
  heading?: string;
  headingClassName?: string;
  children: ReactNode;
  className?: string;
}

const Card: React.FC<ImageCardProps> = ({
  heading,
  headingClassName,
  children,
  className,
}) => {
  return (
    <div className={clsx("border rounded-lg shadow-lg p-4", className)}>
      <h2 className={clsx("text-lg font-semibold mb-2", headingClassName)}>
        {heading}
      </h2>
      {children}
    </div>
  );
};

export default Card;
