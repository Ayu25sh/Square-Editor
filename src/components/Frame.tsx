import React, { useRef, useState, useEffect } from 'react';
import { BreakpointProperties, Breakpoint, breakpointRanges } from '../types';

interface FrameProps {
  properties: BreakpointProperties;
  currentBreakpoint: Breakpoint;
  onBreakpointChange: (breakpoint: Breakpoint) => void;
}

export function Frame({ properties, currentBreakpoint, onBreakpointChange }: FrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [frameWidth, setFrameWidth] = useState(800);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !frameRef.current) return;
      
      const newWidth = e.clientX - frameRef.current.getBoundingClientRect().left;
      setFrameWidth(Math.max(breakpointRanges.sm.min, newWidth));
      
      // Determine new breakpoint
      let newBreakpoint: Breakpoint = 'lg';
      if (newWidth <= breakpointRanges.sm.max) newBreakpoint = 'sm';
      else if (newWidth <= breakpointRanges.md.max) newBreakpoint = 'md';
      
      if (newBreakpoint !== currentBreakpoint) {
        onBreakpointChange(newBreakpoint);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing, currentBreakpoint, onBreakpointChange]);

  // Get effective properties based on inheritance
  const getEffectiveProperties = () => {
    if (currentBreakpoint === 'sm') return properties.sm || properties.md || properties.lg;
    if (currentBreakpoint === 'md') return properties.md || properties.lg;
    return properties.lg;
  };

  const effectiveProps = getEffectiveProperties();

  return (
    <div 
      ref={frameRef}
      className="relative bg-gray-100 border border-gray-300 rounded-lg overflow-hidden"
      style={{ width: frameWidth, height: '500px' }}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div
          style={{
            width: `${effectiveProps.size}px`,
            height: `${effectiveProps.size}px`,
            backgroundColor: effectiveProps.color
          }}
        />
      </div>
      <div
        className="absolute top-0 right-0 w-4 h-full cursor-ew-resize bg-transparent hover:bg-gray-200 transition-colors"
        onMouseDown={() => setIsResizing(true)}
      />
      <div className="absolute bottom-4 right-4 text-sm text-gray-600">
        Width: {frameWidth}px ({currentBreakpoint})
      </div>
    </div>
  );
}