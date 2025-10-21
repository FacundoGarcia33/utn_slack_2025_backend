import { Router } from "express";
import { WorkspaceControler } from "../controler/workpaceControler.js";

export const workspaceRouter = Router();

workspaceRouter.get("/workspace", WorkspaceControler.getAll);
