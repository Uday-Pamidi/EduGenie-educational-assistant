import { 
  text, 
  timestamp, 
  boolean, 
  serial, 
  integer, 
  jsonb, 
  unique,
  pgTable 
} from "drizzle-orm/pg-core";

// Better Auth Tables
export const user = pgTable("user", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  emailVerified: boolean("emailVerified").default(false).notNull(),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  token: text("token").unique(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  userId: text("userId").notNull(),
  type: text("type").notNull(),
  provider: text("provider").notNull(),
  providerAccountId: text("providerAccountId").notNull(),
  refreshToken: text("refreshToken"),
  accessToken: text("accessToken"),
  expiresAt: integer("expiresAt"),
  tokenType: text("tokenType"),
  scope: text("scope"),
  idToken: text("idToken"),
  sessionState: text("sessionState"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
}, (t) => [
  unique().on(t.provider, t.providerAccountId),
]);

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt"),
  updatedAt: timestamp("updatedAt"),
});

// Application Tables
export const learningHistories = pgTable("learning_histories", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  moduleType: text("moduleType").notNull(),
  topic: text("topic").notNull(),
  query: text("query"),
  response: text("response"),
  duration: integer("duration"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const quizzes = pgTable("quizzes", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  topic: text("topic").notNull(),
  questions: jsonb("questions").notNull(),
  userAnswers: jsonb("userAnswers"),
  score: integer("score"),
  totalQuestions: integer("totalQuestions"),
  difficulty: text("difficulty").default("medium"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  completedAt: timestamp("completedAt"),
});

export const learningPaths = pgTable("learning_paths", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  subject: text("subject").notNull(),
  level: text("level").notNull(),
  curriculum: jsonb("curriculum").notNull(),
  completedTopics: jsonb("completedTopics").default("[]"),
  progress: integer("progress").default(0),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});

export const userPreferences = pgTable("user_preferences", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull().unique(),
  learningStyle: text("learningStyle").default("balanced"),
  preferredLanguage: text("preferredLanguage").default("english"),
  difficultyLevel: text("difficultyLevel").default("intermediate"),
  notificationsEnabled: boolean("notificationsEnabled").default(true),
  theme: text("theme").default("light"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull(),
});
