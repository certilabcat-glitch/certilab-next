import { createServerClient } from "@supabase/ssr";
import { NextRequest, NextResponse } from "next/server";

/**
 * Auth callback route.
 *
 * Supabase redirects here after the user clicks the Magic Link (PKCE flow).
 * Steps:
 *  1. Read the `code` query parameter from the URL.
 *  2. Create a server client using the request cookies.
 *  3. Exchange the code for a session — this sets new session cookies on the response.
 *  4. Redirect to the destination (or /saas/login on error).
 *
 * CRITICAL: Uses createServerClient directly to carry cookies through the response.
 * Using createClient() from @/lib/supabase/server would lose cookies because
 * cookies().set() modifies the current response, but we return a NEW NextResponse.redirect().
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    // Create server client directly with request cookies,
    // so setAll writes cookies onto our response.
    const response = NextResponse.redirect(`${origin}${next}`);

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() {
            return request.cookies.getAll();
          },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value, options }) => {
              response.cookies.set(name, value, options);
            });
          },
        },
      },
    );

    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Return the response with session cookies baked in
      return response;
    }
  }

  // Exchange failed or no code — redirect to login with error
  return NextResponse.redirect(`${origin}/saas/login/?error=auth_failed`);
}