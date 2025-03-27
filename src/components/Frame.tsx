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
  const [frameWidth, setFrameWidth] = useState(breakpointRanges.lg.min);

  useEffect(() => {
    // Set initial width based on breakpoint
    const initialWidth = currentBreakpoint === 'sm' 
      ? breakpointRanges.sm.min 
      : currentBreakpoint === 'md' 
        ? breakpointRanges.md.min 
        : breakpointRanges.lg.min;
    setFrameWidth(initialWidth);
  }, [currentBreakpoint]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !frameRef.current) return;

      const frameRect = frameRef.current.getBoundingClientRect();
      const containerRect = frameRef.current.parentElement?.getBoundingClientRect();
      const maxWidth = containerRect?.width || 0;
      
      const newWidth = Math.min(
        maxWidth,
        Math.max(
          breakpointRanges.sm.min,
          e.clientX - frameRect.left
        )
      ); 

      setFrameWidth(newWidth);
      
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
        className="absolute top-0 right-0 w-4 h-full cursor-ew-resize bg-gray-200 hover:bg-gray-300 transition-colors flex items-center justify-center"
        onMouseDown={() => setIsResizing(true)}
      >
        <div className="w-0.5 h-8 bg-gray-400" />
      </div>

      <div className="absolute bottom-4 right-4 text-sm text-gray-600">
        Width: {Math.round(frameWidth)}px ({currentBreakpoint})
      </div>

    </div>
  );
}