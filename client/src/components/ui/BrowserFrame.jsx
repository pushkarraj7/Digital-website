// src/components/ui/BrowserFrame.jsx
//
// Frames a screenshot inside a realistic browser chrome (traffic-light
// dots + URL pill). Used in the hero and the work showcase so project
// previews read as actual sites, not generic thumbnails.

export function BrowserFrame({
  src,
  alt = "",
  url = "yoursite.com",
  tone = "default", // "default" | "wordpress" | "custom"
  className = "",
}) {
  const ringTone =
    tone === "wordpress"
      ? "ring-[#4C6E8A]/30"
      : tone === "custom"
        ? "ring-ion/30"
        : "ring-white/10";

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-white/10 bg-[#0D0E13] shadow-[0_30px_80px_-30px_rgba(0,0,0,0.6)] ring-1 ${ringTone} ${className}`}
    >
      {/* chrome bar */}
      <div className="flex items-center gap-3 border-b border-white/10 bg-white/[0.03] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="ml-2 flex-1 truncate rounded-full bg-white/5 px-3 py-1 text-[11px] text-mist">
          {url}
        </div>
      </div>

      {/* screenshot */}
      <div className="aspect-[16/10] w-full overflow-hidden">
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover object-top"
            loading="lazy"
          />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-white/[0.04] to-transparent" />
        )}
      </div>
    </div>
  );
}