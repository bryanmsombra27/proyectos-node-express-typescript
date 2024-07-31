import { Router } from "express";
import { basic } from "../controllers/controller";

const router = Router();

router.get("/", basic);

export default router;
