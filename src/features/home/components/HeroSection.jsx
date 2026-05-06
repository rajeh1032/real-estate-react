import { useState } from 'react'

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-[18px] w-[18px]" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4.25 4.25" strokeLinecap="round" />
    </svg>
  )
}

export function HeroSection({ content, onSearch }) {
  const [searchInput, setSearchInput] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    onSearch(searchInput.trim())
  }

  return (
    <section className="px-4 pb-20 pt-10 sm:px-6 sm:pb-24 sm:pt-14 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(420px,1fr)] lg:gap-16">
        <div className="space-y-6">
          <div className="space-y-5">
            <h1 className="font-display text-5xl font-extrabold leading-[0.98] tracking-[-0.06em] text-text sm:text-[4.5rem]">
              <span className="block">{content.title[0]}</span>
              <span className="mt-1 block text-primary">{content.title[1]}</span>
            </h1>
            <p className="max-w-xl text-base leading-7 text-text-muted">
              {content.description}
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-3 rounded-[24px] bg-card p-2 shadow-[0_20px_25px_-5px_rgba(11,28,48,0.05),0_8px_10px_-6px_rgba(11,28,48,0.05)] sm:flex-row"
          >
            <label className="flex min-w-0 flex-1 items-center gap-3 px-4 py-3 text-text-muted">
              <SearchIcon />
              <input
                value={searchInput}
                onChange={(event) => setSearchInput(event.target.value)}
                placeholder={content.searchPlaceholder}
                className="w-full min-w-0 border-none bg-transparent text-base text-text outline-none placeholder:text-[#c6c6cd]"
              />
            </label>
            <button
              type="submit"
              className="rounded-xl bg-accent px-8 py-4 text-sm font-semibold text-white transition hover:opacity-95"
            >
              Search Listings
            </button>
          </form>
        </div>

        <div className="relative min-h-[320px] lg:min-h-[500px]">
          <div className="absolute bottom-2 left-1 h-40 w-40 -rotate-6 rounded-[24px] bg-[#f7bd48]/55" />
          <div className="absolute inset-x-4 top-0 rotate-[2deg] overflow-hidden rounded-[24px] shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] lg:inset-x-0">
            <img
              src={content.image}
              alt="Modern architectural residence"
              className="h-[320px] w-full object-cover sm:h-[420px] lg:h-[500px]"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
