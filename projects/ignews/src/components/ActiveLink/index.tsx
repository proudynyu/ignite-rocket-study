import Link, { LinkProps } from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

interface Props extends LinkProps {
  activeClassName: string
}

export const ActiveLink: FC<Props> = ({
  children,
  activeClassName,
  ...props
}) => {
  const { asPath } = useRouter()

  const className = asPath === props.href ? activeClassName : ''
  
  return (
    <Link {...props}>{React.cloneElement(children as any, { className })}</Link>
  )
}
