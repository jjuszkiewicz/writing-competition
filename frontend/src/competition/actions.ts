"use server";

import { saveClient } from "@/clientAPI/fetchClient";
import { API_URL, COOKIE_TOKEN_KEY } from "@/config";
import { FormState } from "@/form/types";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

const ValidationJoinCompetition = z.object({
  name: z.string().min(2),
});

export const joinCompetition = async (state: FormState, formData: FormData) => {
  const data: { [key: string]: unknown } = {};
  for (const pair of formData.entries()) {
    data[pair[0]] = pair[1];
  }

  const parseResult = ValidationJoinCompetition.safeParse(data);
  if (parseResult.success === false) {
    const newState: FormState = {
      errors: parseResult.error.flatten().fieldErrors,
    };
    return newState;
  }

  const dataToSend = {
    ...parseResult.data,
  };

  const result = await saveClient<{ token: string }>(
    "POST",
    `${API_URL}competition/join`,
    dataToSend
  );
  cookies().set(COOKIE_TOKEN_KEY, result.token);
  redirect("/competition");
};

export const saveResult = async (roundUUid: string, answer: string) => {
  await saveClient<{ token: string }>(
    "POST",
    `${API_URL}competition/answer`,
    {
      roundUUid,
      answer,
    }
  );
};
