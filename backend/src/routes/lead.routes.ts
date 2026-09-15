import { Router } from "express";
import { addLead, getLeads } from "../controllers/lead.controller";

const router = Router();

router.get("/", getLeads);
router.post("/", addLead);

export default router;