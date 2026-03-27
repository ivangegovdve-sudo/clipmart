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

  // ⚡ Bolt: Fetch only identifiers to find matching slug, avoiding O(N) memory/bandwidth transfer of full rows
  const creatorRefs = await db.select({
    id: creators.id,
    displayName: creators.displayName,
  }).from(creators);
  const matchedRef = creatorRefs.find((entry) => slugify(entry.displayName) === slug);

  if (!matchedRef) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  // Fetch full creator details now that we have the exact ID
  const [creator] = await db.select().from(creators).where(eq(creators.id, matchedRef.id));

  if (!creator) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

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
