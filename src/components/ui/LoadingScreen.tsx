import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Hyperspeed from "../../blocks/Backgrounds/Hyperspeed/Hyperspeed"; // local hyperspeed
import Particles from "../../blocks/Backgrounds/Particles/Particles";   // local particles

const LoadingScreen: React.FC = () => {
  const [countdown, setCountdown] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Progress from 0 → 1 as countdown goes from 7 → 0
//   const progress = (7 - countdown) / 7;
//   const particlesSpeed = 0.1 + progress * 1;              
//   const particlesCount = Math.floor(200 + progress * 300);

  return (
    <Box
      className="w-full h-screen overflow-hidden relative"
      sx={{ backgroundColor: "#000" }}
    >
      {/* Particles background */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 0,
        }}
      >
        <Particles
          particleColors={['#ffffff', '#ffffff']}
          particleCount={500}       // final value
          speed={1.1} 
          particleBaseSize={100}
          moveParticlesOnHover={true}
          alphaParticles={false}
          disableRotation={false}
        />
      </Box>

      {/* Hyperspeed layer - static speed */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          zIndex: 1,
        }}
      >
        <Hyperspeed />
      </Box>

      {/* Dark overlay behind text to block particles */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 2,
        }}
      />

      {/* Centered quote and countdown */}
      <Box
        className="flex flex-col items-center justify-center w-full h-full text-center p-4"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 3,
          color: "#FFFFFF",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: "Orbitron, sans-serif",
            textShadow: "0 0 10px #00FFFF",
          }}
        >
          "Exploring the cosmos of creativity..."
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontFamily: "Orbitron, sans-serif",
            textShadow: "0 0 8px #00FFFF",
          }}
        >
          Please wait... {countdown}
        </Typography>
      </Box>
    </Box>
  );
};

export default LoadingScreen;
