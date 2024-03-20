import express, { NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import jwt from "jsonwebtoken";
import cors from "cors";
import competitionRouter from "./competition/routers/competitionRouter";
import { TOKE_SEED } from "./config";
import competitionController from "./competition/controllers/competitionController";
const app = express();

const auth = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["access-token"];
  try {
    if (!token || Array.isArray(token)) {
      throw new Error("to many access-token or token is not set");
    }

    jwt.verify(token, TOKE_SEED);
    const tokenDecoded = jwt.decode(token);
    res.locals.userUuid = tokenDecoded!.sub;
    next();
  } catch (e) {
    res.status(401).send("invalid token ");
  }
};

app.use(bodyParser.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("welcome");
});

app.post("/competition/join", competitionController.join);

app.use("/competition", auth, competitionRouter);

export default app;
