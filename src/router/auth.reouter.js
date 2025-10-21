import { Router } from "express";
import authControles from "../controler/auth.controler.js";

export const authRouter = Router();

authRouter.post("/register", authControles.register);
authRouter.post("/login", authControles.login);
authRouter.get("/veryfi/email/:email", authControles.veryfiEmail);
