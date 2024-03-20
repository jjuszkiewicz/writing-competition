import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from 'uuid';
import { withHandleError } from "../../common/controllers/controllerErrorHandler";
import { TOKE_SEED } from "../../config";
import { sentences } from "../sentence";
import { format } from "date-fns/format";
import { addMinutes } from "date-fns/addMinutes";

export default withHandleError({
  join: (req, res) => {
    const { name } = req.body;
    if (!name) {
      throw new Error("invalid data: name");
    }
    const token = jwt.sign({ username: name, sub: uuidv4() }, TOKE_SEED);
    res.send({ token });
  },
  round: (req, res) => {
    const userUuid = res.locals.userUuid;
    // round every 60 seconds

    const now = new Date();
    const roundUuid = format(now, "yyyymmddHHmm");

    //TODO take form db is exists
    
    const endDate = addMinutes(now, 1);
    endDate.setMilliseconds(0);
    endDate.setSeconds(0);

    const randomInt = Math.floor(Math.random() * sentences.length);

    const result = {
      roundUuid,
      endDate,
      userUuid,
      sentence: sentences[randomInt],
    };

    //TODO save if not exists to DB

    res.send(result);
  },
  results: (req, res) => {

  },
  saveAnswer: (req, res) => {
    const userUuid = res.locals.userUuid;
    const { answer, sentence, roundUuid } = req.body;
    //TODO take round form DB

    let score = 0;
    for (let i = 0; i < sentence.length; i++) {
      if (sentence[i] === answer[i]) {
        score++;
      }
    }

    console.log("score", score)

    // TODO take round nad calculate words per minute
    // TODO save score
    // TODO push score to frontend via MQTT

    res.sendStatus(204);
  },
});
