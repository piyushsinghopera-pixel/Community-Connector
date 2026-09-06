import { NextResponse } from 'next/server'
import { desc } from 'drizzle-orm'
import { z } from 'zod'
import { civicReports, db } from '@/lib/db'

const reportSchema = z.object({
  title: z.string().min(3), category: z.string().min(2), description: z.string().min(10), location: z.string().min(2),
  latitude: z.number(), longitude: z.number(), severity: z.string(), isAnonymous: z.boolean(), media: z.array(z.object({ name: z.string(), type: z.string(), url: z.string() })).default([]),
})

export async function GET() {
  try { return NextResponse.json(await db.select().from(civicReports).orderBy(desc(civicReports.createdAt))) }
  catch { return NextResponse.json({ error: 'Database unavailable. Add DATABASE_URL to use persistence.' }, { status: 503 }) }
}

export async function POST(request: Request) {
  const parsed = reportSchema.safeParse(await request.json())
  if (!parsed.success) return NextResponse.json({ error: 'Please complete all report fields.' }, { status: 400 })
  try {
    const report = await db.insert(civicReports).values({ ...parsed.data, reportNo: `CC-${Date.now().toString().slice(-6)}` }).returning()
    return NextResponse.json(report[0], { status: 201 })
  } catch { return NextResponse.json({ error: 'Could not save report.' }, { status: 500 }) }
}
