import React from 'react';
import { Settings } from 'lucide-react';
import { BreakpointProperties, Breakpoint } from '../types';

interface ControlPanelProps {
  properties: BreakpointProperties;
  currentBreakpoint: Breakpoint;
  onPropertiesChange: (properties: BreakpointProperties) => void;
  onBreakpointChange: (breakpoint: Breakpoint) => void;
}

export function ControlPanel({
  properties,
  currentBreakpoint,
  onPropertiesChange,
  onBreakpointChange
}: ControlPanelProps) {
  
  //function that updates the square properties
  const handlePropertyChange = (color?: string, size?: number) => {
    const newProperties = { ...properties };
    
    if (currentBreakpoint === 'lg') {
      newProperties.lg = {
        ...newProperties.lg,
        ...(color !== undefined && { color }),
        ...(size !== undefined && { size })
      };
    } else {

      // if (!newProperties[currentBreakpoint]) {
      //   newProperties[currentBreakpoint] = { color: '', size: 0 }; // Default values
      // }

      // Initialize the breakpoint properties if they don't exist
      if (!newProperties[currentBreakpoint]) {
        const inheritedProps = currentBreakpoint === 'sm' 
          ? properties.md || properties.lg 
          : properties.lg;
        newProperties[currentBreakpoint] = { ...inheritedProps };
      }
      
      // Only update the specific property that changed
      newProperties[currentBreakpoint] = {
        ...newProperties[currentBreakpoint],
        ...(color !== undefined && { color }),
        ...(size !== undefined && { size })
      };
    }
    
    onPropertiesChange(newProperties);
  };

  const handleBreakpointChange = (newBreakpoint: Breakpoint) => {
    onBreakpointChange(newBreakpoint);
  };

  const getCurrentProperties = () => {
    if (currentBreakpoint === 'sm') return properties.sm || properties.md || properties.lg;
    if (currentBreakpoint === 'md') return properties.md || properties.lg;
    return properties.lg;
  };

  const currentProps = getCurrentProperties();

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">

      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-5 h-5 text-gray-600" />
        <h2 className="text-xl font-semibold">Control Panel</h2>
      </div>

      <div className="space-y-6">

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breakpoint
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => handleBreakpointChange('sm')}
              className={`flex-1 px-4 py-2 rounded-md ${
                currentBreakpoint === 'sm'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Small
            </button>
            <button
              onClick={() => handleBreakpointChange('md')}
              className={`flex-1 px-4 py-2 rounded-md ${
                currentBreakpoint === 'md'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Medium
            </button>
            <button
              onClick={() => handleBreakpointChange('lg')}
              className={`flex-1 px-4 py-2 rounded-md ${
                currentBreakpoint === 'lg'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 hover:bg-gray-200'
              }`}
            >
              Large
            </button>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Square Color
          </label>
          <input
            type="color"
            value={currentProps.color}
            onChange={(e) => handlePropertyChange(e.target.value)}
            className="w-full h-10 rounded-md cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Square Size
          </label>
          <div className="flex gap-4">
            <input
              type="range"
              min="50"
              max="400"
              value={currentProps.size}
              onChange={(e) => handlePropertyChange(undefined, parseInt(e.target.value))}
              className="flex-1"
            />
            <input
              type="number"
              min="50"
              max="400"
              value={currentProps.size}
              onChange={(e) => handlePropertyChange(undefined, parseInt(e.target.value))}
              className="w-20 px-3 py-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Properties (JSON)
          </label>
          <pre className="bg-gray-50 p-4 rounded-md overflow-x-auto text-sm">
            {JSON.stringify(properties, null, 2)}
          </pre>
        </div>

        {currentBreakpoint !== 'lg' && (
          <p className="text-sm text-gray-500 italic">
            * Properties will inherit from larger breakpoints if not set
          </p>
        )}
      </div>
      
    </div>
  );
}