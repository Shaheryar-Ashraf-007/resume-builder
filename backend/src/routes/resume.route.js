import express from "express";
import { createResume, deleteResume, getResumeById, getUserResume, updateResume } from "../controllers/resume.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";
import { uploadImages } from "../controllers/uploadImages.js";
import { uploadMiddleware } from "../middleware/upload.middleware.js";

const router = express.Router()

router.post("/create-resume",protectRoutes, createResume )
router.get("/", protectRoutes,getUserResume )
router.get("/:id",protectRoutes,getResumeById )
router.put("/:id/update-resume",protectRoutes,updateResume )
router.put("/:id/upload-images", protectRoutes, uploadMiddleware,uploadImages )

router.delete("/delete-resume/:id", protectRoutes ,deleteResume )


export default router
