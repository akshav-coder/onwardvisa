import React, { useState } from "react";
// make sure this path is correct

const FlyImage = () => {
  const [fly, setFly] = useState(false);

  const handleFly = () => {
    setFly(true);
    setTimeout(() => setFly(false), 2000); // Reset after 2s
  };

  return (
    <div style={{ height: "100vh", position: "relative", overflow: "hidden" }}>
      <style>{`
        .fly-up {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 0;
          transition: none;
          animation: flyUp 2s linear forwards;
        }
        @keyframes flyUp {
          0% {
            bottom: 0;
          }
          100% {
            bottom: 100vh;
          }
        }
      `}</style>
      <button onClick={handleFly}>Take Off</button>
      <img
        src="https://png.pngtree.com/png-vector/20190507/ourmid/pngtree-vector-airplane-icon-png-image_1024816.jpg"
        alt="Flight"
        className={fly ? "fly-up" : ""}
        style={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 0,
        }}
      />
    </div>
  );
};

export default FlyImage;
