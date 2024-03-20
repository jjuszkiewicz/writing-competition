import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
import { withHandleError } from "../../common/controllers/controllerErrorHandler";
import { TOKE_SEED } from "../../config";
import { sentences } from "../sentence";
import { format } from "date-fns/format";
import { addMinutes } from "date-fns/addMinutes";
import { AppDataSource } from "../../data-source";
import { Round } from "../../entity/Round";
import { Result } from "../../entity/Result";
import { differenceInSeconds } from "date-fns/differenceInSeconds";

export default withHandleError({
  join: (req, res) => {
    const { name } = req.body;
    if (!name) {
      throw new Error("invalid data: name");
    }
    const token = jwt.sign({ username: name, sub: uuidv4() }, TOKE_SEED);
    res.send({ token });
  },
  round: async (req, res) => {
    const em = AppDataSource.manager;
    const userUuid = res.locals.userUuid;
    // round every 60 seconds

    const now = new Date();
    const roundUuid = format(now, "yyyymmddHHmm");

    const round = await em.findOneBy(Round, { roundUuid });

    if (round) {
      res.send({ ...round, sentence: sentences[round.sentenceId] });
      return;
    }

    const endDate = addMinutes(now, 1);
    endDate.setMilliseconds(0);
    endDate.setSeconds(0);

    const randomInt = Math.floor(Math.random() * sentences.length);

    const newRound = new Round();
    newRound.roundUuid = roundUuid;
    newRound.endDate = endDate;
    newRound.userUuid = userUuid;
    newRound.sentenceId = randomInt;
    newRound.startDate = now;

    await em.save(newRound);

    res.send({ ...newRound, sentence: sentences[newRound.sentenceId] });
  },
  results: async (req, res) => {
    const em = AppDataSource.manager;
    const results = await em
      .createQueryBuilder(Result, "r")
      .innerJoinAndSelect("r.round", "round")
      .take(30)
      .orderBy("id", "DESC")
      .getManyAndCount();

    res.send({
      results: results[0].map((result) => ({
        ...result,
        sentence: sentences[result.round.sentenceId],
      })),
      count: results[1],
    });
  },
  saveAnswer: async (req, res) => {
    const em = AppDataSource.manager;
    const now = new Date();
    const userUuid = res.locals.userUuid;
    const { answer, roundUuid } = req.body;

    const round = await em.findOneByOrFail(Round, { roundUuid });
    const isAnswer = await em.findOneBy(Round, { userUuid, roundUuid });
    if (isAnswer) {
      res.sendStatus(204);
      return;
    }
    const sentence = sentences[round.sentenceId];

    let score = 0;
    for (let i = 0; i < sentence.length; i++) {
      console.log(sentence[i], answer[i])
      if (sentence[i] === answer[i]) {
        
        score++;
      }
    }

    const result = new Result();
    result.round = round;
    result.score = parseFloat((score / sentence.length).toFixed(4));
    result.userUuid = userUuid;

    const words = answer.split(" ").length;
    const seconds = differenceInSeconds(now, round.startDate);
    result.wordsPerMinutes = Math.floor(words / (seconds / 60));

    console.log(score, sentence.length, answer, roundUuid, result);

    await em.save(result);

    // TODO push score to frontend via MQTT

    res.sendStatus(204);
  },
});
