import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-bg p-6 text-center">
      <p className="font-display text-[88px] font-bold leading-none tracking-tight text-ink-200">404</p>
      <h1 className="mt-2 font-display text-[22px] font-bold tracking-tight text-txt">
        This capital has already been reclaimed
      </h1>
      <p className="mt-2 max-w-sm text-[13.5px] leading-relaxed text-mut">
        The page you're looking for doesn't exist — but there's plenty of working capital waiting back home.
      </p>
      <Link
        href="/"
        className="mt-7 flex h-11 items-center rounded-full bg-ink-950 px-6 text-[13.5px] font-bold text-bg transition-opacity hover:opacity-90"
      >
        Back to Overview
      </Link>
    </div>
  );
}
