interface PageHeadingProps {
  title: string
}

const PageHeading = ({ title }: PageHeadingProps) => {
  return <h1>{title}</h1>
}

export default PageHeading
