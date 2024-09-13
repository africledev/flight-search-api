import express from "express";
import { dateFactController } from "./date/controller.date.js";
import { mathFactController } from "./math/controller.math.js";
import { triviaController } from "./trivia/controller.trivia.js";

const router = express.Router();

router.get("/", (_req, res) => {
	res.json({ message: "NumberAma is up and running!" });
});

router.get("/:num", triviaController);
router.get("/trivia/:num", triviaController);
router.get("/math/:num", mathFactController);
router.get("/date/:when", dateFactController);

export default router;
