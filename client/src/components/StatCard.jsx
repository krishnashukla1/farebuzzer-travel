
//================21 jan=======
// components/StatCard.jsx
import React from 'react';

const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  color, 
  subtitle, 
  trend, 
  highlight = false,
  compact = false 
}) => {
  const colorConfig = {
    blue: {
      bg: "bg-blue-50",
      border: "border-blue-200",
      text: "text-blue-700",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600"
    },
    indigo: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600"
    },
    green: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600"
    },
    red: {
      bg: "bg-red-50",
      border: "border-red-200",
      text: "text-red-700",
      iconBg: "bg-red-100",
      iconColor: "text-red-600"
    },
    orange: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-600"
    },
    teal: {
      bg: "bg-teal-50",
      border: "border-teal-200",
      text: "text-teal-700",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-600"
    },
    purple: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600"
    },
    lightblue: {
      bg: "bg-sky-50",
      border: "border-sky-200",
      text: "text-sky-700",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-600"
    },
    gray: {
      bg: "bg-gray-50",
      border: "border-gray-200",
      text: "text-gray-700",
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600"
    }
  };

  const config = colorConfig[color] || colorConfig.blue;

  return (
    <div className={`
      rounded-2xl border-2 p-${compact ? '4' : '6'} 
      transition-all duration-300 hover:shadow-lg hover:scale-[1.02] 
      ${config.bg} ${config.border}
      ${highlight ? 'ring-2 ring-offset-2 ring-opacity-50' : ''}
      ${highlight && color === 'green' ? 'ring-emerald-300' : ''}
      ${highlight && color === 'red' ? 'ring-red-300' : ''}
    `}>
      <div className="flex items-center justify-between mb={compact ? '2' : '4'}">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${config.iconBg} ${config.iconColor}`}>
            <Icon size={compact ? 18 : 24} />
          </div>
          <div>
            <h3 className={`font-semibold ${compact ? 'text-sm' : 'text-base'} ${config.text}`}>
              {title}
            </h3>
            {subtitle && (
              <p className={`text-xs ${compact ? 'mt-0.5' : 'mt-1'} text-gray-500`}>
                {subtitle}
              </p>
            )}
          </div>
        </div>
        {trend && (
          <span className="text-xs font-medium bg-white/80 px-2 py-1 rounded-full text-gray-700">
            {trend}
          </span>
        )}
      </div>
      
      <div className={compact ? 'mt-2' : 'mt-4'}>
        <div className={`font-bold ${compact ? 'text-2xl' : 'text-3xl'} ${config.text}`}>
          {value}
        </div>
        
        {/* Profit/Loss indicator */}
        {title.includes("PROFIT") || title.includes("Profit") ? (
          <div className={`text-xs font-medium px-2 py-1 rounded-full mt-2 inline-block ${
            value.includes("-") 
              ? "bg-red-100 text-red-700" 
              : "bg-emerald-100 text-emerald-700"
          }`}>
            {value.includes("-") ? "▼ Loss" : "▲ Profit"}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default StatCard;