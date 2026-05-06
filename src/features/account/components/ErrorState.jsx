export function ErrorState({ message }) {
  return (
    <section className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="rounded-lg border border-danger/30 bg-danger/10 px-6 py-8 text-danger">
        {message}
      </div>
    </section>
  )
}
