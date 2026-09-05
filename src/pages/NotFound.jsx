import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center gap-4 px-6 text-center">
      <p className="font-display text-3xl text-ink">Page not found.</p>
      <p className="max-w-sm text-sm text-mist">
        This page doesn't exist yet — it might still be in the works.
      </p>
      <Link
        to="/"
        className="mt-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-void"
      >
        Back to home
      </Link>
    </div>
  );
}
