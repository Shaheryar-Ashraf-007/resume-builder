import React from 'react';

const Card = ({ title, content, bgColor = '#0c0c0c', textColor = 'white' }) => {
  return (
    <div
      className="w-[400px] h-full mb-4 border rounded-2xl shadow-lg transition-transform transform hover:scale-105"
      style={{ backgroundColor: bgColor }}
    >
      
      <div className={`text-${textColor} text-xl font-bold m-6`}> 
        {title}
      </div>
      <div className={`text-${textColor} m-6`}>
        {content}
      </div>
    </div>
  );
};

export default Card;