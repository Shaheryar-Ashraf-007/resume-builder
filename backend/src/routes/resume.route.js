import express from "express";
import { createResume, deleteResume, getResumeById, getUserResume, updateResume } from "../controllers/resume.controller.js";
import { protectRoutes } from "../middleware/auth.middleware.js";

const router = express.Router()

router.post("/", protectRoutes, createResume )
router.get("/", protectRoutes,getUserResume )
router.get("/:id",protectRoutes,getResumeById )
router.put("/update-resume/:id",protectRoutes,updateResume )
router.delete("/delete-resume/:id",protectRoutes,deleteResume )

export default router