import { Resume } from "../models/Resume.js";
import fs from "fs";
import { dirname } from "path";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to create a new resume
export async function createResume(req, res) {
  console.log("User from request:", req.user); // Log the user object

  try {
    // Validate that the user is authenticated
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized - No user found" });
    }

    const { title } = req.body;

    // Validate the request body
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }

    const defaultResume = {
      profileInfo: {
        profileImage: null,
        previewUrl: "",
        fullName: "",
        designation: "",
        summary: "",
      },
      contactInfo: {
        email: "",
        phone: "",
        location: "",
        linkedin: "",
        github: "",
        website: "",
      },
      workExperience: [
        {
          company: "",
          startDate: "",
          role: "",
          endDate: "",
          description: "",
        },
      ],
      education: [
        {
          institute: "",
          degree: "",
          startDate: "",
          endDate: "",
        },
      ],
      projects: [
        {
          title: "",
          description: "",
          github: "",
          livedemo: "",
        },
      ],
      certifications: [
        {
          title: "",
          issuer: "",
          year: "",
        },
      ],
      languages: [
        {
          name: "",
          progress: "",
        },
      ],
      interest: [""],
    };

    // Create a new resume
    const newResume = await Resume.create({
      userId: req.user._id, // Attach the user ID from the authenticated user
      title,
      ...defaultResume,
    });

    // Respond with the created resume
    res.status(201).json(newResume);
  } catch (error) {
    console.error("Error creating resume:", error);
    res.status(500).json({
      message: "An error occurred while creating the resume.",
      error: error.message || "Internal Server Error",
    });
  }
}

// Function to get all resumes for a user
export async function getUserResume(req, res) {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({
      updatedAt: -1,
    });
    res.status(200).json(resumes);
  } catch (error) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({ message: "Failed to get all resumes" });
  }
}

// Function to get a resume by ID
export async function getResumeById(req, res) {
  try {
    const resumeId = req.params.id;
    const userId = req.user._id;

    console.log("Requested resume ID:", resumeId);
    console.log("Authenticated user ID:", userId);

    // Find the resume by ID and ensure it belongs to the authenticated user
    const resume = await Resume.findOne({ _id: resumeId, userId: userId });

    // Check if the resume was found
    if (!resume) {
      return res.status(404).json({ message: "Resume not found" });
    }

    // Respond with the found resume
    res.status(200).json(resume);
  } catch (error) {
    console.error("Error fetching resume:", error);
    res.status(500).json({
      message: "An error occurred while fetching the resume",
      error: error.message,
    });
  }
}

// Function to update a resume
export async function updateResume(req, res) {
  const resumeId = req.params.id;
  const userId = req.user._id;

  try {
    // Find the resume by ID and user ID
    const resume = await Resume.findOne({ _id: resumeId, userId: userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    // Update the resume with the new data
    Object.assign(resume, req.body);

    const updatedResume = await resume.save(); // Save the updated resume

    res.status(200).json(updatedResume);
  } catch (error) {
    console.error("Error updating resume:", error);
    res.status(500).json({ message: "Failed to update resume", error: error.message });
  }
}

// Function to delete a resume


// Derive __dirname for ES modules


export async function deleteResume(req, res) {
  const resumeId = req.params.id;
  const userId = req.user._id;

  try {
    // Find the resume by ID and user ID
    const resume = await Resume.findOne({ _id: resumeId, userId: userId });

    if (!resume) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    // Path for uploads
    const uploadsFolder = path.join(__dirname, "..", "uploads");

    // Delete associated files if they exist
    if (resume.thumbnailLink) {
      const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
    }

    if (resume.profileInfo?.previewUrl) {
      const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.previewUrl));
      if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
    }

    // Delete the resume
    const deleted = await Resume.findOneAndDelete({ _id: resumeId, userId: userId });

    if (!deleted) {
      return res.status(404).json({ message: "Resume not found or unauthorized" });
    }

    res.status(200).json({ message: "Resume deleted successfully" });
  } catch (error) {
    console.error("Error deleting resume:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
}