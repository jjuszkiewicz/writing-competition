import styles from "./page.module.scss";
import { JoinCompetitionForm } from "@/competition/components/JoinCompetitionForm";

export default function CompetitionPage() {
  return (
    <main className={styles.main}>
      <h1>Join to writing competition</h1>
      <JoinCompetitionForm />
    </main>
  );
}
