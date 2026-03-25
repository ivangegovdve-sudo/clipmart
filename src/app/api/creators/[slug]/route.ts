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

  // ⚡ Bolt: Fetch only id and displayName to minimize memory and database payload
  // when finding the matching creator slug.
  const allDisplayNames = await db
    .select({
      id: creators.id,
      displayName: creators.displayName,
    })
    .from(creators);

  const match = allDisplayNames.find((entry) => slugify(entry.displayName) === slug);

  if (!match) {
    return NextResponse.json({ error: "Creator not found" }, { status: 404 });
  }

  const [creator] = await db
    .select()
    .from(creators)
    .where(eq(creators.id, match.id))
    .limit(1);

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
