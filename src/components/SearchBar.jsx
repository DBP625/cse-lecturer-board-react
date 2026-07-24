export default function SearchBar({ value, onChange }) {
  return (
    <label className="input input-bordered flex items-center gap-2 flex-1 min-w-48 bg-base-200">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-4 w-4 opacity-50">
        <path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" />
      </svg>
      <input
        id="q"
        type="search"
        className="grow bg-transparent text-sm"
        placeholder="Search universities…  (press /)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {value && (
        <button onClick={() => onChange('')} className="btn btn-ghost btn-xs btn-circle text-base-content/40">✕</button>
      )}
    </label>
  );
}
