import type { Metadata } from "next";
import Link from "next/link";
import { getSupabaseServerClient } from "@/lib/supabase";

type WaitlistSignup = {
  id: number;
  email: string;
  name: string | null;
  city: string | null;
  created_at: string;
};

export const metadata: Metadata = {
  title: "VOOM Admin | Waitlist",
  description: "Internal waitlist dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function formatDate(value: string) {
  return new Date(value).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const supabase = getSupabaseServerClient();
  if (!supabase) {
    return (
      <main className="container-page py-14 text-[#F0EDE8]">
        <h1 className="headline-display text-5xl">VOOM Admin</h1>
        <p className="mt-4 text-[#E05252]">
          Supabase env vars are missing. Set `NEXT_PUBLIC_SUPABASE_URL` and
          `SUPABASE_SERVICE_ROLE_KEY`.
        </p>
      </main>
    );
  }

  const [waitlistRowsResult, waitlistCountResult] = await Promise.all([
    supabase
      .from("waitlist")
      .select("id,email,name,city,created_at")
      .order("created_at", { ascending: false })
      .limit(500),
    supabase.from("waitlist").select("*", { head: true, count: "exact" }),
  ]);

  let rowsError = waitlistRowsResult.error;
  let signups = (waitlistRowsResult.data ?? []) as WaitlistSignup[];
  let totalSignups = waitlistCountResult.count ?? 0;

  if (waitlistRowsResult.error?.code === "PGRST205") {
    const [legacyRowsResult, legacyCountResult] = await Promise.all([
      supabase
        .from("waitlist_signups")
        .select("id,email,full_name,city,created_at")
        .order("created_at", { ascending: false })
        .limit(500),
      supabase
        .from("waitlist_signups")
        .select("*", { head: true, count: "exact" }),
    ]);

    rowsError = legacyRowsResult.error;
    signups = (legacyRowsResult.data ?? []).map((row) => ({
      id: row.id,
      email: row.email,
      name: row.full_name,
      city: row.city,
      created_at: row.created_at,
    })) as WaitlistSignup[];
    totalSignups = legacyCountResult.count ?? 0;
  }

  const todayDate = new Date().toISOString().slice(0, 10);
  const todayCount = signups.filter((item) =>
    item.created_at.startsWith(todayDate),
  ).length;

  return (
    <main className="container-page py-8 text-[#F0EDE8] sm:py-12">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#7A7A7A]">
            VOOM Cabs
          </p>
          <h1 className="headline-display text-6xl">Waitlist Dashboard</h1>
        </div>
        <div className="flex items-center gap-4">
          <p className="text-[11px] text-[#7A7A7A]">Latest 500 signups</p>
          <Link
            href="/admin/logout"
            className="border border-[#222222] px-3 py-2 text-[11px] uppercase tracking-[0.12em] text-[#F5A623] transition-colors hover:border-[#F5A623]"
          >
            Logout
          </Link>
        </div>
      </header>

      {rowsError ? (
        <p className="mt-6 border border-[#E05252] bg-[rgb(224_82_82_/_10%)] p-4 text-sm text-[#E05252]">
          Could not load signups: {rowsError.message}
        </p>
      ) : null}

      <section className="mt-6 grid gap-3 sm:grid-cols-2">
        <article className="border border-[#222222] bg-[#111111] p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#7A7A7A]">
            Total signups
          </p>
          <p className="headline-display mt-2 text-5xl text-[#F0EDE8]">
            {totalSignups}
          </p>
        </article>
        <article className="border border-[#222222] bg-[#111111] p-5">
          <p className="text-[11px] uppercase tracking-[0.12em] text-[#7A7A7A]">
            Signups today
          </p>
          <p className="headline-display mt-2 text-5xl text-[#F0EDE8]">
            {todayCount}
          </p>
        </article>
      </section>

      <section className="mt-6 overflow-hidden border border-[#222222] bg-[#111111]">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="bg-[#1A1A1A]">
              <tr>
                <th className="px-4 py-3 font-medium text-[#7A7A7A]">Created</th>
                <th className="px-4 py-3 font-medium text-[#7A7A7A]">Email</th>
                <th className="px-4 py-3 font-medium text-[#7A7A7A]">Name</th>
                <th className="px-4 py-3 font-medium text-[#7A7A7A]">City</th>
              </tr>
            </thead>
            <tbody>
              {signups.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-8 text-center text-[#7A7A7A]">
                    No signups yet.
                  </td>
                </tr>
              ) : (
                signups.map((signup) => (
                  <tr key={signup.id} className="border-t border-[#222222]">
                    <td className="px-4 py-3 whitespace-nowrap text-[#7A7A7A]">
                      {formatDate(signup.created_at)}
                    </td>
                    <td className="px-4 py-3 text-[#F0EDE8]">{signup.email}</td>
                    <td className="px-4 py-3 text-[#F0EDE8]">{signup.name || "-"}</td>
                    <td className="px-4 py-3 text-[#F0EDE8]">{signup.city || "-"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
