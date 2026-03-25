import { db } from "@/db";
import { creators, listings } from "@/db/schema";
import { slugify } from "@/lib/slug";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET(
  _request: Request,
  context: { params: Promise<{ slug: string }> },
) {
  const { slug } = await context.params;

  // Optimized: Only fetch necessary fields for all creators to find matching slug
  const allCreators = await db.select({ id: creators.id, displayName: creators.displayName }).from(creators);
  const matchedCreatorRef = allCreators.find((entry) => slugify(entry.displayName) === slug);

  if (!matchedCreatorRef) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  // Fetch full row for the matched creator
  const [creator] = await db.select().from(creators).where(eq(creators.id, matchedCreatorRef.id)).limit(1);

  const publishedListings = await db
    .select()
    .from(listings)
    .where(and(eq(listings.creatorId, creator.id), eq(listings.status, "published")))
    .orderBy(desc(listings.updatedAt));

  return NextResponse.json({
    creator: {
      ...creator,
      slug,
    },
    listings: publishedListings,
  });
}
