import { Box, Button } from "@mui/material";
import React, { useState } from "react";
import { keyframes } from "@emotion/react";

// Define animation durations
const animationDuration = "3s"; // Significantly slower for better visibility

// Keyframe for A: Fading out (linear)
const fadeOut = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
`;

// Keyframe for B: Sliding up AND Fading out AND changing z-index (linear motion for slide/fade)
const slideFadeOutB = keyframes`
  0% {
    opacity: 1;
    transform: translateX(-50%) translateY(0); /* Ensure initial centering */
    z-index: 2; /* B starts below A */
  }
  20% { /* Before crossing A, ensure z-index change happens */
    z-index: 4; /* B moves above A (A's z-index is 3) */
  }
  50% { /* Mid-point for both fade and slide, and above A */
    opacity: 0.5;
    transform: translateX(-50%) translateY(-250px); /* B moves well past A */
    z-index: 4;
  }
  100% {
    opacity: 0;
    transform: translateX(-50%) translateY(-400px); /* B moves completely out of view above */
    z-index: 4;
  }
`;

// Keyframe for C: Sliding up from below (linear)
const slideInC = keyframes`
  from {
    transform: translateX(-50%) translateY(0); /* Ensure initial centering */
  }
  to {
    transform: translateX(-50%) translateY(-800px); /* C moves up by 800px to reach the top (0px) */
  }
`;

const SampleUI = () => {
  const [animationActive, setAnimationActive] = useState(false); // True when animation is playing
  // State to hold the final transform for Box C
  const [cFinalTransform, setCFinalTransform] = useState(
    "translateX(-50%) translateY(0)"
  );

  const handleClick = () => {
    if (!animationActive) {
      setAnimationActive(true);
      // Reset C's transform to initial state right before animation starts
      setCFinalTransform("translateX(-50%) translateY(0)");

      setTimeout(() => {
        setAnimationActive(false); // Animation is complete
        // Set C's transform to its final animated state
        setCFinalTransform("translateX(-50%) translateY(-800px)");
      }, parseFloat(animationDuration) * 1000); // Convert s to ms
    }
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClick} sx={{ mb: 4 }}>
        Start Animation
      </Button>

      <Box
        sx={{
          position: "relative",
          width: "300px",
          height: "800px", // Enough height for C to start hidden
          mx: "auto",
          border: "1px solid lightgray", // Helps visualize the container boundary
          overflow: "hidden", // Crucial to hide elements outside this box
        }}
      >
        {/* Box A (Red) */}
        {/* Box A will be removed from DOM after animation completes */}
        {animationActive ||
        cFinalTransform === "translateX(-50%) translateY(0)" ? (
          <Box
            sx={{
              width: "200px",
              height: "200px",
              backgroundColor: "red",
              position: "absolute",
              top: "0px", // A's initial position
              left: "50%",
              transform: "translateX(-50%)", // Ensure initial centering
              zIndex: 3, // On top initially
              animation: animationActive
                ? `${fadeOut} ${animationDuration} forwards linear`
                : "none",
            }}
          >
            a
          </Box>
        ) : null}

        {/* Box B (Black) */}
        {/* Box B will be removed from DOM after animation completes */}
        {animationActive ||
        cFinalTransform === "translateX(-50%) translateY(0)" ? (
          <Box
            sx={{
              width: "200px",
              height: "200px",
              backgroundColor: "black",
              position: "absolute",
              top: "200px", // B's initial position (below A)
              left: "50%",
              transform: "translateX(-50%)", // Explicitly set initial centering for B
              animation: animationActive
                ? `${slideFadeOutB} ${animationDuration} forwards linear`
                : "none",
            }}
          >
            b
          </Box>
        ) : null}

        {/* Box C (Blue) */}
        <Box
          sx={{
            width: "200px",
            height: "200px",
            backgroundColor: "blue",
            position: "absolute",
            top: "800px", // C's initial position, starts exactly at the bottom edge
            left: "50%",
            // Conditionally apply animation or final transform
            animation: animationActive
              ? `${slideInC} ${animationDuration} forwards linear`
              : "none",
            transform: cFinalTransform, // Always apply the current C transform
            zIndex: 1, // At the bottom
          }}
        >
          c
        </Box>
      </Box>
    </div>
  );
};

export default SampleUI;
