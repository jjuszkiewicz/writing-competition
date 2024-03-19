"use client"
import formStyles from "@/form/form.module.scss";
import { FC, useState } from "react";
import { saveResult } from "../actions";

type AnswerFormProps = {
  sentence: string;
};
export const AnswerForm: FC<AnswerFormProps> = ({ sentence }) => {
  const [answer, setAnswer] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveResult(sentence, answer);
  };
  return (
    <form onSubmit={onSubmit}>
      <div className={formStyles["form-line"]}>
        <input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          type="text"
          placeholder="write sentence here and click enter"
        />
      </div>
    </form>
  );
};
