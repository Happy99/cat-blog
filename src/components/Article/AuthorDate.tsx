const AuthorDate = ({ date, className }: { date: string; className?: string }) => {
  function formatDate(dateStr: string) {
    const date = new Date(dateStr)
    const month = String(date.getMonth() + 1).padStart(2, '0') // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0')
    const year = date.getFullYear()

    return `${month}/${day}/${year}`
  }

  return (
    <div
      className={`d-flex flex-column flex-lg-row gap-0 gap-lg-2 align-items-lg-center text-secondary ${className}`}
    >
      <address className="mb-0">Petr Stastny</address>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="currentColor"
        className="bi bi-dot d-none d-lg-block"
        viewBox="0 0 16 16"
      >
        <path d="M8 9.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3" />
      </svg>
      <time>{formatDate(date)}</time>
    </div>
  )
}

export default AuthorDate
