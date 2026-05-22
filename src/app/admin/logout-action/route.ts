import { NextResponse } from "next/server";

export async function GET() {
  return new NextResponse(
    "Logged out. Re-open /admin to sign in again.",
    {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="VOOM Admin Logout"',
        "Cache-Control": "no-store",
      },
    },
  );
}
