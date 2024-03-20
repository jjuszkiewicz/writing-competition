"use client";

import { differenceInSeconds } from "date-fns";
import Cookies from "js-cookie";
import formStyles from "@/form/form.module.scss";
import styles from "@/app/competition/competition.module.scss";
import { FC, useCallback, useEffect, useState } from "react";
import { saveResult } from "../actions";
import { Round } from "../types";
import { API_URL } from "@/config";
import axios from "axios";

type AnswerFormProps = {
  round: Round;
};
let intervalId: NodeJS.Timeout;

export const AnswerForm: FC<AnswerFormProps> = ({ round }) => {
  const [answer, setAnswer] = useState("");
  const [currentRound, setRound] = useState(round);
  const [nextRoundInSeconds, setNextRoundInSeconds] = useState<number>(0);

  const fetchNewRound = useCallback(async () => {
    const nextRound = await axios.get<Round>(`${API_URL}competition/round`, {
      headers: {
        "access-token": Cookies.get("user-token"),
      },
    });
    setRound(nextRound.data);
  }, []);

  const startTimer = useCallback(
    (duration: number) => {
      let timer = duration;
      intervalId = setInterval(function () {
        --timer;
        if (timer <= 0) {
          clearInterval(intervalId);
          fetchNewRound();
        } else {
          setNextRoundInSeconds(timer);
        }
      }, 1000);
    },
    [fetchNewRound]
  );

  useEffect(() => {
    const timeLeft = differenceInSeconds(currentRound.endDate, new Date());
    setNextRoundInSeconds(timeLeft);
    startTimer(timeLeft);
  }, [currentRound]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveResult(currentRound.roundUuid, answer);
  };

  return (
    <>
      <div className={styles.sentence}>{currentRound.sentence}</div>
      <form onSubmit={onSubmit}>
        <div className={formStyles["form-line"]}>
          <input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            type="text"
            placeholder="write sentence here and click enter"
          />
          {nextRoundInSeconds > 0 && (
            <div className={styles["time-left"]}>
              Next round in: {nextRoundInSeconds}s
            </div>
          )}
        </div>
      </form>
    </>
  );
};
