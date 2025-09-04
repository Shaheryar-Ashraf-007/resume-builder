import { Delete, LucideUpload, LucideUser, Trash2 } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";

const ProfilePhotoSelector = ({ preview, setPreview }) => {
  const inputRef = useRef(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [image, setImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;

    setImage(file);

    try {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      if (setPreview) setPreview(objectUrl);
    } catch (err) {
      console.error("Error generating preview:", err);
    }
  };

  const handleRemoveImage = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl); // ✅ cleanup
    }
    setImage(null);
    setPreviewUrl(null);
    if (setPreview) setPreview(null);
  };

  const onChoose = () => {
    inputRef.current.click();
  };

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  return (
    <div className="text-white flex items-center justify-center">
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        ref={inputRef}
        className="hidden"
      />

      {!image ? (
        <div
          className="w-48 h-48 flex items-center justify-center bg-[#5c5757] rounded-full relative cursor-pointer"
          onClick={onChoose}
        >
          <LucideUser className="w-24 h-24 text-blue-400 cursor-pointer" />
          <button
            type="button"
            className="w-16 h-16 flex items-center cursor-pointer justify-center bg-blue-400 text-white rounded-full absolute -bottom-1 -right-[-6px]"
          >
            <LucideUpload />
          </button>
        </div>
      ) : (
        <div className="relative w-48 h-48">
          <img
            src={preview || previewUrl}
            alt="Preview Photo"
            className="w-48 h-48 object-cover rounded-full border-2 border-blue-400 shadow-lg"
          />
          <button
            type="button"
            className="absolute -bottom-1 -right-[-12px] bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
            onClick={handleRemoveImage}
          >
            <Trash2 className="w-8 h-8 cursor-pointer" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfilePhotoSelector;
