import { drizzle } from 'drizzle-orm/node-postgres'
import { pgTable, text, uuid, doublePrecision, integer, boolean, jsonb, timestamp } from 'drizzle-orm/pg-core'
import { Pool } from 'pg'

export const civicReports = pgTable('civic_reports', {
  id: uuid('id').defaultRandom().primaryKey(),
  reportNo: text('report_no').notNull().unique(),
  title: text('title').notNull(),
  category: text('category').notNull(),
  description: text('description').notNull(),
  location: text('location').notNull(),
  latitude: doublePrecision('latitude').notNull(),
  longitude: doublePrecision('longitude').notNull(),
  status: text('status').notNull().default('Reported'),
  severity: text('severity').notNull().default('Medium'),
  isAnonymous: boolean('is_anonymous').notNull().default(false),
  upvotes: integer('upvotes').notNull().default(0),
  media: jsonb('media').notNull().default([]),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
})

const globalForDb = globalThis as unknown as { pool?: Pool }
export const pool = globalForDb.pool ?? new Pool({ connectionString: process.env.DATABASE_URL })
if (process.env.NODE_ENV !== 'production') globalForDb.pool = pool

export const db = drizzle(pool)
export type CivicReport = typeof civicReports.$inferSelect
export type NewCivicReport = typeof civicReports.$inferInsert
