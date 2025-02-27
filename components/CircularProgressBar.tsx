import React, { useState, useEffect } from "react";

interface CircularProgressBarProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
}

const CircularProgressBar: React.FC<CircularProgressBarProps> = ({
  percentage,
  size = 120,
  strokeWidth = 10,
}) => {
  const [progress, setProgress] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  useEffect(() => {
    let start: number;
    let animationFrameId: number;
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp; // Record the starting timestamp
      const progressDuration = 1000; // Animation duration (1 second)
      const elapsed = timestamp - start;

      const newProgress = Math.min(
        (elapsed / progressDuration) * percentage, // Calculate new progress
        percentage // Ensure progress does not exceed the target percentage
      );
      setProgress(newProgress);

      // Continue animation if the progress is not yet complete
      if (elapsed < progressDuration) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    // Start the animation
    animationFrameId = requestAnimationFrame(animateProgress);

    // Cleanup the animation on component unmount or when percentage changes
    return () => {
      cancelAnimationFrame(animationFrameId); // Stop the animation if percentage changes or component unmounts
    };
  }, [percentage]); // Runs when the percentage value changes

  return (
    <svg
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      className="circular-progress-bar"
    >
      <circle
        className="circle-bg"
        strokeWidth={strokeWidth}
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
      />
      <circle
        className="circle-progress"
        stroke="#9333ea"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        fill="none"
        cx={size / 2}
        cy={size / 2}
        r={radius}
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="dark:fill-white fill-[#9333ea]"
        fontSize="1.5625rem"
      >
        {progress > 0 ? "-" : "+"} {Math.abs(progress).toFixed(0)}%
      </text>
    </svg>
  );
};

export default CircularProgressBar;
