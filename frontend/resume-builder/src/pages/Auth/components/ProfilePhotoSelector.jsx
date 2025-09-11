import { LucideUpload, LucideUser, Trash2 } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import Resizer from 'react-image-file-resizer';

const ProfilePhotoSelector = ({ setPreview }) => {
    const inputRef = useRef(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [image, setImage] = useState(null);

    const handleImageChange = (event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file size (e.g., limit to 2MB)
        if (file.size > 5 * 1024 * 1024) { // 2MB limit
            alert("File size must be less than 2MB.");
            return;
        }

        // Resize the image
        Resizer.imageFileResizer(
            file,
            640, // max width
            640, // max height
            'JPEG', // format
            80, // lower quality for better compression
            0, // rotation
            (uri) => {
                setPreview(uri); // Set the base64 string
                setPreviewUrl(uri); // Set the preview URL
                setImage(uri); // Save the base64 string
            },
            'base64' // Output type
        );
    };

    const handleRemoveImage = () => {
        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
        }
        setImage(null);
        setPreviewUrl(null);
        setPreview(null); // Clear the preview in the parent component
    };

    const onChoose = () => {
        inputRef.current.click();
    };

    // Cleanup on unmount
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
                        className="w-16 h-16 flex items-center justify-center bg-blue-400 text-white rounded-full absolute -bottom-1 -right-2 cursor-pointer"
                    >
                        <LucideUpload />
                    </button>
                </div>
            ) : (
                <div className="relative w-48 h-48">
                    <img
                        src={previewUrl}
                        alt="Preview Photo"
                        className="w-48 h-48 object-cover rounded-full border-2 border-blue-400 shadow-lg"
                    />
                    <button
                        type="button"
                        className="absolute -bottom-0 -right-0 bg-red-500 hover:bg-red-600 text-white p-2 rounded-full shadow-md"
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