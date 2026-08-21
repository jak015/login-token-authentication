import { Router } from "express";
import { login, logout, me, register } from "../controllers/authController";
import { requireAuth } from "../middleware/requireAuth";
import { validateBody } from "../middleware/validateBody";
import { authSchema } from "../schemas/auth.schema";

const router = Router();

router.post("/login", validateBody(authSchema), login);
router.post("/register", validateBody(authSchema), register);
router.get("/me", requireAuth, me);
router.post("/logout", logout);

export default router;