import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";
import { Result } from "./Result";

@Entity()
export class Round {
  @PrimaryColumn()
  roundUuid: string;

  @Column({
    name: "user_uuid",
    type: "varchar",
  })
  userUuid: string;

  @Column({
    name: "end_date",
    type: "timestamp",
  })
  endDate: Date;

  @Column({
    name: "start_date",
    type: "timestamp",
  })
  startDate: Date;

  @Column({
    name: "sentence_id",
    type: "integer",
  })
  sentenceId: number;

  @OneToMany(() => Result, (result) => result.round)
  results: Result[];
}
