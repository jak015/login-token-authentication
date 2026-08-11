import { Router } from "express";
import { login, logout, me, register } from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;