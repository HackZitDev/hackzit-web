"use client";

import { useEffect, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";

const detectTouchDevice = () => {
  if (typeof window === "undefined") return true;
  return (
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    window.matchMedia("(pointer: coarse)").matches
  );
};

const springConfig = { damping: 20, stiffness: 250, mass: 0.25 };

interface TrailDotProps {
  index: number;
  sourceX: MotionValue<number>;
  sourceY: MotionValue<number>;
  isPointer: boolean;
  isVisible: boolean;
}

const TrailDot = ({
  index,
  sourceX,
  sourceY,
  isPointer,
  isVisible,
}: TrailDotProps) => {
  const x = useSpring(sourceX, springConfig);
  const y = useSpring(sourceY, springConfig);

  const size = (isPointer ? 40 : 25) * (1 - index * 0.15);
  const opacity = 0.5 - index * 0.1;

  return (
    <motion.div
      className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9998] bg-gradient-to-r from-primary/40 to-secondary/30 ${
        !isVisible ? "opacity-0" : ""
      }`}
      style={{
        width: size,
        height: size,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        opacity: opacity * (isVisible ? 1 : 0),
        filter: `blur(${index * 0.5}px)`,
        transition: "opacity 0.15s ease",
      }}
    />
  );
};

const Cursor = () => {
  // Use motion values for smoother tracking
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const [isPointer, setIsPointer] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Create spring physics for smoother motion with better conservation of momentum
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Customizable trail properties
  const trailCount = 5;

  useEffect(() => {
    document.body.classList.add("no-cursor");

    let requestId: number | null = null;
    let mouseX = -100;
    let mouseY = -100;

    const updateCursorPosition = () => {
      cursorX.set(mouseX);
      cursorY.set(mouseY);
      requestId = null;
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!requestId) {
        requestId = requestAnimationFrame(updateCursorPosition);
      }
    };

    const mouseLeaveHandler = () => setIsVisible(false);
    const mouseEnterHandler = () => setIsVisible(true);
    const mouseDownHandler = () => setIsActive(true);
    const mouseUpHandler = () => setIsActive(false);

    const mouseOverHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      setIsPointer(
        Boolean(
          target?.closest(
            'a, button, [role="button"], input[type="submit"], input[type="button"], .clickable'
          )
        )
      );
    };

    document.addEventListener("mousemove", mouseMoveHandler);
    document.addEventListener("mousedown", mouseDownHandler);
    document.addEventListener("mouseup", mouseUpHandler);
    document.addEventListener("mouseleave", mouseLeaveHandler);
    document.addEventListener("mouseenter", mouseEnterHandler);
    document.addEventListener("mouseover", mouseOverHandler);

    return () => {
      document.body.classList.remove("no-cursor");
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mousedown", mouseDownHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
      document.removeEventListener("mouseleave", mouseLeaveHandler);
      document.removeEventListener("mouseenter", mouseEnterHandler);
      document.removeEventListener("mouseover", mouseOverHandler);

      if (requestId) {
        cancelAnimationFrame(requestId);
      }
    };
  }, [cursorX, cursorY]);

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className={`fixed top-0 left-0 rounded-full pointer-events-none z-[9999] border-2 border-primary flex items-center justify-center ${
          isActive
            ? "bg-accent/30"
            : isPointer
            ? "bg-secondary/20"
            : "bg-primary/20"
        } ${!isVisible ? "opacity-0" : "opacity-100"}`}
        style={{
          width: isPointer ? 40 : 25,
          height: isPointer ? 40 : 25,
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: "-50%",
          translateY: "-50%",
          mixBlendMode: "screen",
          transition: "opacity 0.15s ease",
        }}
      >
        {isPointer && (
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-1 h-1 bg-accent rounded-full"
          />
        )}
      </motion.div>

      {/* Trail elements */}
      {Array.from({ length: trailCount }).map((_, i) => (
        <TrailDot
          key={i}
          index={i}
          sourceX={cursorXSpring}
          sourceY={cursorYSpring}
          isPointer={isPointer}
          isVisible={isVisible}
        />
      ))}
    </>
  );
};

const CustomCursor = () => {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    setEnabled(!detectTouchDevice());
  }, []);

  // Never render the custom cursor on touch devices
  if (!enabled) return null;

  return <Cursor />;
};

export default CustomCursor;
