import { Resume } from "../models/Resume.js";
import fs from 'fs';
import path from 'path';

export async function uploadImages(req, res) {
    console.log("Uploaded files:", req.files); // Log received files

    // Check for missing files
    if (!req.files) {
        return res.status(400).json({ message: 'No files were uploaded.' });
    }

    const thumbnail = req.files.Thumbnail ? req.files.Thumbnail[0] : null; // Access the first file
    const profileImage = req.files.profileImage ? req.files.profileImage[0] : null; // Access the first file

    const resumeId = req.params.id;

    // Find the resume associated with the user
    const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

    // Check if the resume was found
    if (!resume) {
        return res.status(404).json({ message: "Resume not found." });
    }

    const baseUrl = `${req.protocol}://${req.get("host")}`;
    
    // Update the resume with the new profile image if it exists
    if (profileImage) {
        // Remove old profile image if it exists
        if (resume.profileInfo?.profilePreviewUrl) {
            const oldProfile = path.join(uploadFolders, path.basename(resume.profileInfo.profilePreviewUrl));
            if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${profileImage.filename}`; // Use filename
    }

    // Update thumbnail link if it exists
    if (thumbnail) {
        resume.thumbnailLink = `${baseUrl}/uploads/${thumbnail.filename}`; // Use filename
    }

    // Save the updated resume
    await resume.save();

    res.status(200).json({
        message: 'Files uploaded successfully',
        thumbnailLink: resume.thumbnailLink,
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
    });
}