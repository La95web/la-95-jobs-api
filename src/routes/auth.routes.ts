import { Router } from "express";
import passport from "../auth/google";
import jwt from "jsonwebtoken";

const router = Router();

// 1. Redirige a Google
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// 2. Google devuelve al backend
router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const user = req.user as any;

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true, // en producción debe ser true
      sameSite: "none",
    });

    res.redirect("https://la95truckingshow.com/commentForm");
  }
);

export default router;
