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

  // Optimization: Only fetch identifiers to prevent O(N) memory/bandwidth bottleneck
  const allCreators = await db
    .select({
      id: creators.id,
      displayName: creators.displayName,
    })
    .from(creators);

  const matchedCreatorInfo = allCreators.find(
    (entry) => slugify(entry.displayName) === slug
  );

  if (!matchedCreatorInfo) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  const creator = await db.query.creators.findFirst({
    where: eq(creators.id, matchedCreatorInfo.id),
  });

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
