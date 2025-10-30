import express from "express";
import getTranscript from "../controllers/TranscriptController";
import handleAskQuestion from "../controllers/AskQuestionController";
import { verifyToken } from "../middleware/authMiddleware.js";
import SignUp from "../controllers/SignUp";
import Login from "../controllers/Login";
import progress from "../controllers/progress";

const router = express.Router();

router.post("/auth/signup", SignUp);
router.post("/auth/login", Login);
router.post("/ask", verifyToken, handleAskQuestion);
router.post("/transcript", verifyToken, getTranscript);
router.get("/progress", progress);

export default router;