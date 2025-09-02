import fs from "fs";
import path from "path";

import { uploads } from "../middleware/upload.middleware.js";
import { Resume } from "../models/Resume.js";

export async function uploadImages(req, res) {
    try {
        // Protect uploads using middleware
        uploads.fields([{ name: 'Thumbnail' }, { name: 'profileImage' }])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "Failed to upload files" });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

            if (!resume) {
                return res.status(404).json({ message: "Resume not found" });
            }

            const uploadFolders = path.join(__dirname, 'uploads');
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files.Thumbnail?.[0]; // Corrected key to match the form field name
            const profileImage = req.files.profileImage?.[0];

            if (newThumbnail) {
                // Remove old thumbnail if it exists
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadFolders, path.basename(resume.thumbnailLink));
                    if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            if (profileImage) {
                // Remove old profile image if it exists
                if (resume.profileInfo?.profilePreviewUrl) {
                    const oldProfile = path.join(uploadFolders, path.basename(resume.profileInfo.profilePreviewUrl));
                    if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
                }
                resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${profileImage.filename}`;
            }

            await resume.save();

            res.status(200).json({
                message: "Image upload successful",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo.profilePreviewUrl,
            });
        });
    } catch (error) {
        console.log("Error uploading images:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}