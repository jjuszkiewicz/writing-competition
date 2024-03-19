import { API_URL, COOKIE_TOKEN_KEY } from "@/config";
import { cookies } from "next/headers";

import styles from "./competition.module.scss";
import { fetchClient } from "@/clientAPI/fetchClient";
import { AnswerForm } from "@/competition/components/AnswerForm";

export default async function Competition() {
  const { sentence } = await fetchClient<{ sentence: string }>(
    `${API_URL}competition/sentence`,
    {
      revalidate: 0,
    }
  );
  if (!cookies().get(COOKIE_TOKEN_KEY)) {
    throw new Error("unknown user");
  }

  return (
    <main>
      <div>Sentence to write:</div>
      <div className={styles.sentence}>{sentence}</div>
      <AnswerForm sentence={sentence} />
    </main>
  );
}
