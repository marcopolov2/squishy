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
  const perc = Math.abs(progress).toFixed(0);

  useEffect(() => {
    let start: number;
    let animationFrameId: number;
    const animateProgress = (timestamp: number) => {
      if (!start) start = timestamp;
      const progressDuration = 1000;
      const elapsed = timestamp - start;

      const newProgress = Math.min(
        (elapsed / progressDuration) * percentage,
        percentage
      );
      setProgress(newProgress);

      if (elapsed < progressDuration) {
        animationFrameId = requestAnimationFrame(animateProgress);
      }
    };

    animationFrameId = requestAnimationFrame(animateProgress);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [percentage]);

  return (
    <section title="Original vs. Compressed Size">
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
          stroke="#f35c0b"
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
          className="dark:fill-white fill-[#f35c0b]"
          fontSize="1.5625rem"
        >
          {Number(perc) > 0 ? "-" : Number(perc) === 0 ? "" : "+"} {perc}%
        </text>
      </svg>
    </section>
  );
};

export default CircularProgressBar;
