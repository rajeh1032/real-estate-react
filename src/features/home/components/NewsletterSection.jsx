import { useState } from 'react'

export function NewsletterSection({ content }) {
  const [email, setEmail] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    console.log('Newsletter subscription:', email)
  }

  return (
    <section className="px-4 pt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="relative overflow-hidden rounded-[28px] bg-accent px-6 py-14 text-white shadow-[0_30px_70px_rgba(11,28,48,0.18)] sm:px-10 lg:px-16 lg:py-20">
          <img
            src={content.image}
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 hidden h-full w-[36%] object-cover opacity-20 md:block"
          />

          <div className="relative max-w-2xl space-y-6">
            <h2 className="font-display text-[2.2rem] font-bold leading-tight tracking-[-0.04em] text-white sm:text-5xl sm:leading-[1.02]">
              {content.title}
            </h2>
            <p className="max-w-xl text-lg leading-7 text-white/55">
              {content.description}
            </p>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4 pt-2 sm:flex-row">
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder={content.inputPlaceholder}
                className="min-w-0 flex-1 rounded-xl border border-white/15 bg-white/10 px-6 py-4 text-base text-white outline-none placeholder:text-white/30"
              />
              <button
                type="submit"
                className="rounded-xl bg-primary px-10 py-4 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
              >
                Subscribe Now
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
