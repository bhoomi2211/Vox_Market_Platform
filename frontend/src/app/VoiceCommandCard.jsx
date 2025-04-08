import React, { useState } from 'react';
import { IconCommand, IconChevronUp } from '@tabler/icons-react';

const VoiceCommandsCard = ({commands}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  

  return (
    <div 
      className={`fixed bottom-6 left-6 z-50 transition-all duration-300 ${
        isExpanded ? 'opacity-100' : 'opacity-30 hover:opacity-100'
      }`}
    >
      <div className="bg-gray-900 rounded-lg shadow-lg w-72 overflow-hidden">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full px-4 py-3 flex items-center justify-between bg-[#8C52FF] text-white"
        >
          <div className="flex items-center gap-2">
            <IconCommand size={20} />
            <span className="font-medium">Voice Commands</span>
          </div>
          <IconChevronUp
            size={20}
            className={`transform transition-transform ${
              isExpanded ? '' : 'rotate-180'
            }`}
          />
        </button>
        
        <div className={`transition-all duration-300 ${
          isExpanded ? 'max-h-96' : 'max-h-0'
        } overflow-hidden`}>
          <div className="p-4 space-y-3">
            {commands.map((cmd, index) => (
              <div key={index} className="text-white">
                <span className="text-[#8C52FF] font-medium">"{cmd.command}"</span>
                <p className="text-sm text-gray-400 mt-1">{cmd.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VoiceCommandsCard;