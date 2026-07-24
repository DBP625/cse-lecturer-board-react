export default function FilterChips({ options, active, onToggle, label }) {
  return (
    <div className="flex flex-wrap gap-1.5 items-center">
      {label && <span className="text-xs font-semibold text-base-content/40 mr-1">{label}</span>}
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => onToggle(opt.value)}
          aria-pressed={active === opt.value}
          className={`btn btn-xs rounded-full font-semibold tracking-wide transition-all ${
            active === opt.value
              ? 'btn-primary shadow-md shadow-primary/25'
              : 'btn-ghost border border-base-300 hover:border-primary hover:text-primary'
          }`}
        >
          {opt.label}
          {opt.count !== undefined && (
            <span className="badge badge-xs badge-ghost ml-0.5">{opt.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}
