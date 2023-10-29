// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { sql } from "drizzle-orm";
import {
  integer,
  sqliteTable,
  text,
} from "drizzle-orm/sqlite-core";

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const participants = sqliteTable(
  "participants",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true}),
    name: text("name", { length: 256 }),
    score: integer("score", { mode: "number"}).default(0).notNull(),
    createdAt: integer("created_at", {mode: 'timestamp'})
      .notNull()
      .default(sql`CURRENT_TIMESTAMP`),
    updatedAt: integer("updatedAt", {mode: 'timestamp'})
      .default(sql`CURRENT_TIMESTAMP`),
  },
);

export const tournaments = sqliteTable(
  "tournaments",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true}),
    name: text("name", { length: 256 }),
    createdAt: integer("created_at", {mode: 'timestamp'})
      .notNull(),
    updatedAt: integer("updatedAt", {mode: 'timestamp'}),
  },
)

export const participantResults = sqliteTable(
  "participantResults",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true}),
    tournamentId: integer("tournament_id", {mode: "number"}).references(()=>tournaments.id),
    participantId: integer("participant_id", {mode: "number"}).references(()=>participants.id),
    position: integer("position", {mode: "number"}).notNull(),
    createdAt: integer("created_at", {mode: 'timestamp'})
      .notNull(),
    updatedAt: integer("updatedAt", {mode: 'timestamp'}),
  },
)

export const matches = sqliteTable(
  "matches",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true}),
    tournamentId: integer("tournament_id", {mode: "number"}).references(()=>tournaments.id),
    firstParticipantId: integer("first_participant_id", {mode: "number"}).references(()=>participants.id),
    secondParticipantId: integer("second_participant_id", {mode: "number"}).references(()=>participants.id),
    winnerId: integer("winnerId", {mode: "number"}).references(()=>participants.id),
    loserId: integer("loserId", {mode: "number"}).references(()=>participants.id),
    matchIndex: integer("match_index", {mode: "number"}).notNull(),
    matchPhase: text("match_phase", {enum: ['sixteen', 'eight', 'semi', 'final']}).notNull(),
    createdAt: integer("created_at", {mode: 'timestamp'})
      .notNull(),
    updatedAt: integer("updatedAt", {mode: 'timestamp'}),
  },
)

export const scores = sqliteTable(
  "scores",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true}),
    matchId: integer("match_id", {mode: "number"}).references(()=>matches.id),
    ParticipantId: integer("participant_id", {mode: "number"}).references(()=>participants.id),
    participantScore: integer("participant_score").default(0).notNull(),
    scoreIndex: integer("score_index", {mode: "number"}).notNull(),
    createdAt: integer("created_at", {mode: 'timestamp'})
      .notNull(),
    updatedAt: integer("updatedAt", {mode: 'timestamp'}),
  },
)
