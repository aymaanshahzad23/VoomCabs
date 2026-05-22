import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

function unauthorizedResponse() {
  return new NextResponse("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="VOOM Admin"' },
  });
}

export function proxy(request: NextRequest) {
  const username = process.env.ADMIN_USERNAME;
  const password = process.env.ADMIN_PASSWORD;

  if (!username || !password) {
    return new NextResponse(
      "Admin credentials are not configured. Set ADMIN_USERNAME and ADMIN_PASSWORD.",
      { status: 500 },
    );
  }

  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Basic ")) {
    return unauthorizedResponse();
  }

  const encoded = authorization.slice(6);
  const decoded = atob(encoded);
  const separatorIndex = decoded.indexOf(":");
  const providedUsername =
    separatorIndex >= 0 ? decoded.slice(0, separatorIndex) : decoded;
  const providedPassword =
    separatorIndex >= 0 ? decoded.slice(separatorIndex + 1) : "";

  if (providedUsername !== username || providedPassword !== password) {
    return unauthorizedResponse();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
