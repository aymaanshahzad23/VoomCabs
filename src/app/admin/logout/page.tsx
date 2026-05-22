import Link from "next/link";

export default function AdminLogoutPage() {
  return (
    <main className="container-page py-16 text-[#F0EDE8]">
      <p className="section-label">Admin</p>
      <h1 className="headline-display mt-4 text-6xl">Logout</h1>
      <p className="mt-4 max-w-2xl text-xs leading-7 text-[#7A7A7A]">
        Click the button below to end this admin session. You will be prompted
        for credentials when opening `/admin` again.
      </p>

      <div className="mt-8 flex gap-3">
        <a
          href="/admin/logout-action"
          className="rounded-[2px] bg-[#F5A623] px-4 py-2 text-[12px] font-semibold uppercase tracking-[0.08em] text-black"
        >
          Confirm logout
        </a>
        <Link
          href="/admin"
          className="border border-[#222222] px-4 py-2 text-[12px] uppercase tracking-[0.08em] text-[#7A7A7A]"
        >
          Back to dashboard
        </Link>
      </div>
    </main>
  );
}
