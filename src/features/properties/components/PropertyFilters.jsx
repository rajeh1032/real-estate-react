const PROPERTY_TYPES = ['All', 'Villa', 'Penthouse', 'Loft', 'Apartment']

export function PropertyFilters({ filters, onChange, onApply }) {
  return (
    <aside className="h-fit rounded-[32px] bg-surface px-7 py-8 shadow-soft sm:px-8 sm:py-9">
      <div className="space-y-10">
        <h2 className="whitespace-nowrap text-[2rem] font-semibold tracking-tight text-text">
          Refine Search
        </h2>

        <label className="block space-y-16">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
            Location (City)
          </span>
          <div className="relative  mt-3" >
            <input
              type="text"
              value={filters.city}
              onChange={(event) =>
                onChange((current) => ({
                  ...current,
                  city: event.target.value,
                }))
              }
              placeholder="e.g. Cairo, Giza"
              className="h-14 w-full rounded-[22px] border border-border bg-card px-5 pr-16 text-base text-text outline-none transition placeholder:text-text-muted/80 focus:border-primary"
            />
            <span className="pointer-events-none absolute inset-y-0 right-5 flex items-center text-[11px] font-semibold uppercase tracking-[0.28em] text-text-muted">
              GPS
            </span>
          </div>
        </label>

        <div className="space-y-5">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
            Property Type
          </span>
          <div className="flex flex-wrap gap-3 mt-3">
            {PROPERTY_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() =>
                  onChange((current) => ({
                    ...current,
                    type,
                  }))
                }
                className={
                  filters.type === type
                    ? 'min-w-[3.75rem] rounded-full bg-primary px-5 py-3 text-base font-medium leading-none text-primary-foreground'
                    : 'min-w-[3.75rem] rounded-full bg-card px-5 py-3 text-base font-medium leading-none text-text-muted transition hover:text-text'
                }
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <label className="block space-y-5">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-text-muted">
            Price Range
          </span>
          <input
            type="range"
            min="0"
            max="10000000"
            step="500000"
            value={filters.minPrice}
            onChange={(event) =>
              onChange((current) => ({
                ...current,
                minPrice: Number(event.target.value),
              }))
            }
            className="w-full accent-primary"
          />
          <div className="flex items-center justify-between pt-1 text-sm font-semibold text-text-muted ">
            <span>$0</span>
            <span>${(filters.minPrice / 1000000).toFixed(filters.minPrice ? 1 : 0)}M+</span>
          </div>
        </label>

        <button
          type="button"
          onClick={onApply}
          className="mt-2 h-14 w-full rounded-[22px] bg-accent px-6 text-lg font-semibold text-white transition hover:opacity-90"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  )
}
