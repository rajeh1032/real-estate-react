export function AlertMessage({ type = 'error', message, onAction, actionLabel }) {
  const styles = {
    error: 'border-red-200 bg-red-50 text-red-600',
    success: 'border-green-200 bg-green-50 text-green-600',
    info: 'border-blue-200 bg-blue-50 text-blue-600',
  }

  return (
    <div className={`rounded-lg border px-4 py-3 text-sm ${styles[type]}`}>
      {message}
      {onAction && actionLabel && (
        <button onClick={onAction} className="mt-2 block font-semibold underline">
          {actionLabel}
        </button>
      )}
    </div>
  )
}
