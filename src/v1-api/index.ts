import express from "express";
import { triviaController } from "./trivia/controller.trivia.js";

const router = express.Router();

router.get("/", (_req, res) => {
	res.json({ message: "NumberAma is up and running!" });
});

router.get("/:num", triviaController);
router.get("/trivia/:num", triviaController);

export default router;
