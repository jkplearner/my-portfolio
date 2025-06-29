import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { Box, Typography, LinearProgress, LinearProgressProps } from "@mui/material";
import Hyperspeed from "../../blocks/Backgrounds/Hyperspeed/Hyperspeed"; // local hyperspeed

const LinearProgressWithLabel = ({
  value,
  width,
}: LinearProgressProps & { value: number; width: number }) => (
  <Box sx={{ width: `${width}px`, mt: 1 }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <LinearProgress 
        variant="determinate" 
        value={value} 
        sx={{ 
          height: 8, 
          borderRadius: 5,
          flex: 1,
          backgroundColor: '#222',
          '& .MuiLinearProgress-bar': {
            background: 'linear-gradient(90deg, #00FFFF, #8800FF)',
          },
        }}
      />
      <Typography
        sx={{ 
          ml: 2,
          minWidth: 40,
          fontFamily: "'Poppins', sans-serif", 
          fontWeight: 700,
          color: '#FFFFFF',
          textShadow: '0 0 8px #00FFFF'
        }}
      >
        {`${Math.round(value)}%`}
      </Typography>
    </Box>
  </Box>
);

const LoadingScreen: React.FC = () => {
  const [countdown, setCountdown] = useState(3); // changed from 7 → 3 seconds
  const [textWidth, setTextWidth] = useState(0);
  const textRef = useRef<HTMLDivElement>(null);

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

  const progress = ((3 - countdown) / 3) * 100;

  useLayoutEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, []);

  return (
    <Box
      className="w-full h-screen overflow-hidden relative"
      sx={{ backgroundColor: "#000" }}
    >
      {/* Hyperspeed background */}
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
        <Hyperspeed />
      </Box>

      {/* Dark overlay */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          height: "100%",
          width: "100%",
          background: "rgba(0, 0, 0, 0.5)",
          zIndex: 1,
        }}
      />

      {/* Centered loading text + progress bar */}
      <Box
        className="flex flex-col items-center justify-center w-full h-full text-center p-4"
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 2,
          color: "#FFFFFF",
        }}
      >
        <Typography
          ref={textRef}
          variant="h4"
          sx={{
            mb: 2,
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            textShadow: "0 0 10px #00FFFF",
            whiteSpace: "nowrap",
          }}
        >
          Loading...
        </Typography>
        {textWidth > 0 && (
          <LinearProgressWithLabel value={progress} width={textWidth} />
        )}
      </Box>
    </Box>
  );
};

export default LoadingScreen;
