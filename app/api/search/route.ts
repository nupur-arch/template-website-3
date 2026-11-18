import { NextResponse } from "next/server";
import { searchArticles } from "@/services/search";

export async function GET(request: Request) {
  const query = new URL(request.url).searchParams.get("q") ?? "";
  if (query.trim().length < 2) {
    return NextResponse.json({ query: query.trim(), total: 0, groups: [] });
  }
  try {
    return NextResponse.json(await searchArticles(query));
  } catch {
    return NextResponse.json({ message: "Search failed." }, { status: 500 });
  }
}
