import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/* The portal is not released. The navbar's login entry points are disabled
   buttons (cde06bb), but that only hides the door — the routes themselves
   still render for anyone who types the URL. This bounces every portal path
   back to the homepage at the request level, so deep links, old bookmarks
   and client-side navigations are all covered.

   To work on the portal locally, run with the flag:
     PORTAL_OPEN=1 npm run dev
   Delete this file (or set PORTAL_OPEN=1 in the deployment) when the portal
   ships. */
export function proxy(request: NextRequest) {
  if (process.env.PORTAL_OPEN === "1") return NextResponse.next();
  return NextResponse.redirect(new URL("/", request.url), 307);
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*"],
};
