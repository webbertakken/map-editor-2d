import React from 'react'

interface Props {
  title: string
  href: string
}

const ExternalLink = ({ title, href }: Props): JSX.Element => {
  return (
    <a
      target="_blank"
      referrerPolicy="no-referrer"
      href="https://en.wikipedia.org/wiki/Version_control"
    >
      {title}
    </a>
  )
}

export default ExternalLink
