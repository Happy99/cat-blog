import Image from 'next/image'
import Link from 'next/link'

const Article = () => {
  return (
    <div className="row">
      {/* // TODO: I dont like this, but wireframe does not have full container width for the article */}
      <div className="col-md-8 col-12">
        <article className="d-flex flex-row gap-4">
          <Image src={'/cat.jpg'} alt="article image" width={272} height={244} />
          <div className="d-flex flex-column gap-2">
            <h2>Article title</h2>
            <div className="d-flex flex-column flex-lg-row gap-0 gap-lg-2 align-items-center text-secondary">
              <address className="mb-0">John Doe</address>
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
              <time>2024/01/01</time>
            </div>
            <p>Article description</p>
            <div className="d-flex flex-column flex-lg-row gap-2">
              <Link className="text-primary" href="/articles/1">
                Read whole article
              </Link>
              <span className="text-secondary">0 comments</span>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Article
