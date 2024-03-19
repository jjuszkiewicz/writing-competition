import express from "express";
import competitionController from "../controllers/competitionController";
const competitionRouter = express.Router();

competitionRouter.get("/sentence", competitionController.randomSentence);
competitionRouter.post("/answer", competitionController.saveAnswer);

export default competitionRouter;
