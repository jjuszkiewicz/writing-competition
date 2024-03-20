import { API_URL, COOKIE_TOKEN_KEY } from "@/config";
import { cookies } from "next/headers";

import styles from "./competition.module.scss";
import { fetchClient } from "@/clientAPI/fetchClient";
import { AnswerForm } from "@/competition/components/AnswerForm";
import { Round } from "@/competition/types";
import { redirect } from "next/navigation";

export default async function Competition() {
  if (!cookies().get(COOKIE_TOKEN_KEY)) {
    redirect("/");
  }

  const round = await fetchClient<Round>(`${API_URL}competition/round`, {
    revalidate: 0,
  });

  return (
    <main>
      <div>Sentence to write:</div>
      <AnswerForm round={round} />
      // TODO result wyników
    </main>
  );
}
