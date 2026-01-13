import React from "react";

const LinearProgress: React.FC = () => {
  return (
    <div className="w-full h-1 bg-gray-200 overflow-hidden rounded">
      <div
        className="h-full bg-primary animate-linear-progress"
        style={{ width: "100%" }}
      />
      <style>{`
        @keyframes linear-progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-linear-progress {
          width: 50%;
          animation: linear-progress 1.2s linear infinite;
          background: linear-gradient(90deg, #62846e 0%, #1b9849 100%);
        }
      `}</style>
    </div>
  );
};

export default LinearProgress;
