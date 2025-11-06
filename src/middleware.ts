import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function middleware(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const token = req.cookies.get("sb-access-token")?.value;
  if (!token) return NextResponse.redirect(new URL("/login", req.url));

  // You can add more logic here (e.g., check role before allowing /dashboard routes)
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
