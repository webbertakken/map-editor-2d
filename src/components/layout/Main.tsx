import React from 'react'

interface Props {
  children: React.ReactNode
}

const Main = ({ children }: Props): JSX.Element => {
  return <div className="main">{children}</div>
}

export default Main
