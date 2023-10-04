import React, { useState } from "react"

type Props = {
  text: string | undefined
  children: React.ReactNode
}

const Tooltip = ({ children, text}: Props) => {
  const [isTooltipVisible, setIsTooltipVisible] = useState(false);

  const handleMouseEnter = () => {
    setIsTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setIsTooltipVisible(false);
  };

  return (
    <div className="relative group cursor-pointer" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {children}
      {isTooltipVisible && text && text !== "" && (
        <div className="absolute opacity-0 min-w-max bg-gray-700 text-white text-xs rounded p-2 mb-1 bottom-full left-1/2 transform -translate-x-1/2 transition-opacity duration-300 group-hover:opacity-100">
          {text}
        </div>
      )}
    </div>
  )
}

export default Tooltip
