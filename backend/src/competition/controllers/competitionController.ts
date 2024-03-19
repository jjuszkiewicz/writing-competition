import jwt from "jsonwebtoken";
import { withHandleError } from "../../common/controllers/controllerErrorHandler";
import { TOKE_SEED } from "../../config";
import { sentences } from "../sentence";

export default withHandleError({
  join: (req, res) => {
    const { name } = req.body;
    if (!name) {
      throw new Error("invalid data: name");
    }
    const token = jwt.sign({ username: name }, TOKE_SEED);
    res.send({ token });
  },
  randomSentence: (req, res) => {
    const randomInt = Math.floor(Math.random() * sentences.length);
    res.send({ sentence: sentences[randomInt] });
  },
  saveAnswer: (req, res) => {
    const { answer, sentence } = req.body;
    let score = 0;
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] === answer[i]) {
        score++;
      }
    }

    console.log("score", score)

    //TODO save score
    //TODO push info browser

    res.sendStatus(204);
  },
});
