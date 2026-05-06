export function UnauthenticatedState() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-20 text-center sm:px-6 lg:px-8">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        Private Profile
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight text-text">
        Sign in to view your DreamHome profile.
      </h1>
      <p className="mt-4 text-text-muted">
        This page only reads data for the currently authenticated Firebase user.
      </p>
    </section>
  )
}
