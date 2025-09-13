import { getLightColorFromImage } from '@/lib/helper';
import React, { useEffect, useState } from 'react';

const ResumeSummaryCard = ({
    title, 
    imageUrl, 
    lastUpdate,
    onSelect
}) => {
  const [bgColor, setBgColor] = useState("#ffffff");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (imageUrl) {
      console.log("Fetching light color from image URL:", imageUrl);
      setLoading(true); // Start loading
      getLightColorFromImage(imageUrl)
        .then((color) => {
          setBgColor(color);
          console.log("Light color fetched:", color);
        })
        .catch((error) => {
          console.error("Error fetching the light color:", error);
          setBgColor("#ffffff"); // Fallback color
          setError(true); // Set error state
        })
        .finally(() => {
          setLoading(false); // End loading
        });
    }
  }, [imageUrl]);

  return (
    <div
      className='text-white h-[300px] flex flex-col items-center justify-between bg-[#0c0c0c] rounded-lg border border-gray-200 hover:border-blue-400 overflow-hidden cursor-pointer'
      style={{ backgroundColor: bgColor }}
      onClick={onSelect}
    >
      <div className='p-4 flex flex-col items-center justify-center w-full h-full'>
        {loading ? (
          <div className="loader w-8 h-8 border-4 border-t-4 border-gray-300 rounded-full animate-spin"></div>
        ) : error ? (
          <div className="placeholder w-full h-[200px] flex items-center justify-center bg-red-700 text-white rounded">
            Error loading image
          </div>
        ) : imageUrl ? (
          <img 
            src={imageUrl} 
            alt="Resume Thumbnail" 
            className='object-cover w-full h-[200px] rounded transition-transform duration-200 transform hover:scale-105' 
            onError={() => {
              console.error("Image failed to load:", imageUrl);
              setError(true);
            }}
          />
        ) : (
          <div className="placeholder w-full h-[200px] flex items-center justify-center bg-gray-700 text-gray-400 rounded">
            No Image Available
          </div>
        )}
      </div>
      <div className="w-full bg-[#0c0c0c] px-4 py-4">
        <h5 className='text-sm font-medium truncate overflow-hidden whitespace-nowrap'>{title}</h5>
        <p className="text-xs font-medium text-gray-500 mt-0.5">
          Last Updated: {lastUpdate}
        </p>
      </div>
    </div>
  );
}

export default ResumeSummaryCard;