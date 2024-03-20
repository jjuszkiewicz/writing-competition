import express from "express";
import competitionController from "../controllers/competitionController";
const competitionRouter = express.Router();

competitionRouter.post("/answer", competitionController.saveAnswer);
competitionRouter.get("/round", competitionController.round);

export default competitionRouter;
