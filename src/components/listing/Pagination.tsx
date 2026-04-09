export function Pagination({
  page, total, perPage, onChange,
}: { page: number; total: number; perPage: number; onChange: (p: number) => void }) {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (Math.abs(i - page) === 2) {
      if (pages[pages.length - 1] !== "...") pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1.5 mt-10 flex-wrap">
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="flex items-center gap-1 px-3.5 h-9 rounded-xl border border-cream-300 bg-white text-sm font-dm font-semibold text-gray-500 hover:border-forest-400 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        ← Prev
      </button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span key={i} className="w-9 h-9 flex items-center justify-center text-gray-400 text-sm">…</span>
        ) : (
          <button
            key={p}
            onClick={() => onChange(p as number)}
            className={`w-9 h-9 rounded-xl border text-sm font-dm font-bold transition-all ${
              page === p
                ? "bg-forest-500 border-forest-500 text-white shadow-md shadow-forest-500/20"
                : "border-cream-500 bg-white text-gray-500 hover:border-forest-400"
            }`}
          >
            {p}
          </button>
        )
      )}
      <button
        disabled={page === totalPages}
        onClick={() => onChange(page + 1)}
        className="flex items-center gap-1 px-3.5 h-9 rounded-xl border border-cream-300 bg-white text-sm font-dm font-semibold text-gray-500 hover:border-forest-400 disabled:opacity-40 disabled:pointer-events-none transition-colors"
      >
        Next →
      </button>
    </div>
  );
}