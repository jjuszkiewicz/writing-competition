import { FC } from "react";
import style from "../form.module.scss";

type ErrorFormProps = {
  errors: string[] | undefined;
};

export const ErrorForm: FC<ErrorFormProps> = ({ errors }) => {
  return (
    errors &&
    errors.map((message) => (
      <div key={message} className={style.error}>
        {message}
      </div>
    ))
  );
};
