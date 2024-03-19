"use client";
import { ErrorForm } from "@/form/components/ErrorForm";
import formStyles from "@/form/form.module.scss";
import { useFormState } from "react-dom";
import { FormState } from "@/form/types";
import { joinCompetition } from "../actions";

export const JoinCompetitionForm = () => {
  const [state, formAction] = useFormState<FormState, FormData>(joinCompetition, {
    errors: {},
  });
  
  return (
    <form action={formAction}>
      <div className={formStyles["form-line"]}>
        <input type="text" name="name" placeholder="your name" />
        <ErrorForm errors={state.errors.name} />
        <button className="button">Join</button>
      </div>
    </form>
  );
};
