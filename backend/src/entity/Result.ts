import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Round } from "./Round";

@Entity()
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: "user_uuid",
    type: "varchar",
  })
  userUuid: string;

  @Column({
    name: "score",
    type: "decimal",
    scale: 4,
    precision: 5,
  })
  score: number;
  get scoreAsNumber() {
    return Number(this.score);
  }

  @Column({
    name: "words_per_minutes",
    type: "integer",
  })
  wordsPerMinutes: number

  @ManyToOne(() => Round)
  @JoinColumn({
    name: "round_uuid",
  })
  round: Round;
}
