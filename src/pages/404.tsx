import Link from 'next/link'

const Custom404 = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="text-center p-4 bg-white rounded-3 shadow" style={{ maxWidth: '500px' }}>
        <h1 className="display-1 fw-bold text-danger">404</h1>
        <p className="fs-3 text-dark">Oops! Page Not Found</p>
        <p className="text-muted">
          It looks like you&apos;re lost. The page you&apos;re looking for doesn&apos;t exist or has
          been moved.
        </p>
        <Link href="/" className="btn btn-primary btn-lg mt-3 px-4">
          Back to Home
        </Link>
      </div>
    </div>
  )
}

export default Custom404
