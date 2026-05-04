function PageButton({ children, isActive = false, disabled = false, onClick }) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={
        isActive
          ? 'inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-sm font-semibold text-white'
          : 'inline-flex h-11 w-11 items-center justify-center rounded-full bg-surface text-sm font-semibold text-text transition hover:bg-border disabled:cursor-not-allowed disabled:opacity-50'
      }
    >
      {children}
    </button>
  )
}

export function PropertiesPagination({ currentPage, totalPages, onPageChange }) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  return (
    <div className="flex items-center justify-center gap-3 pt-2">
      <PageButton disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
        Prev
      </PageButton>

      {pages.map((page) => (
        <PageButton
          key={page}
          isActive={page === currentPage}
          onClick={() => onPageChange(page)}
        >
          {page}
        </PageButton>
      ))}

      <PageButton disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
        Next
      </PageButton>
    </div>
  )
}
