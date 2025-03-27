import React, { useState } from 'react';
import { Frame } from './components/Frame';
import { ControlPanel } from './components/ControlPanel';
import { BreakpointProperties, Breakpoint, } from './types';

function App() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('lg');
  const [properties, setProperties] = useState<BreakpointProperties>({
    lg: { color: '#3B82F6', size: 200 }
  });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold text-gray-900">Square Editor</h1>
        
        <div className="space-y-8">
          <Frame
            properties={properties}
            currentBreakpoint={currentBreakpoint}
            onBreakpointChange={setCurrentBreakpoint}
          />
          
          <div className="flex">
            <div className='w-1/3'>
              <ControlPanel
                properties={properties}
                currentBreakpoint={currentBreakpoint}
                onPropertiesChange={setProperties}
                onBreakpointChange={setCurrentBreakpoint}
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default App;