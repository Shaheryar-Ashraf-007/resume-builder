import mongoose from "mongoose";

const resumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title:{ type: String, required: true },
    thumbnailLink:{ type: String, default: null},
    template:{ theme:String, colorPalette:[String] },
    profileInfo:{profilePreviewUrl:String, fullName:String, designation:String, summery:String},
    contactInfo:{ email:String, phone:String, location:String, website:String, linkedin:String, github:String },
    WorkerExperience:[{company:String, role:String, startDate:Date, endDate:Date, description: String}],
    education:[{institute:String, degree:String, fieldOfStudy:String, startDate:Date, endDate:Date, description: String}],
    skills:[{
        name:String,
        progress: Number,
    }],
    projects:[{title:String, description:String, github: String, livedemo: String}],
    certifications:[{title:String, issuer:String, year: String}],
    languages:[{name:String, proficiency: String}],
    interest:[String],
}, { timestamps:{createdAt: "createdAt" , updatedAt: "updatedAt"} });
export const Resume = mongoose.model('Resume', resumeSchema);
