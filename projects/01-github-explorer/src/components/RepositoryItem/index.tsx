import { FC } from 'react'

interface RepositoyItemProps {
  name: string
  description: string
  link: string
}

export const RepositoryItem: FC<RepositoyItemProps> = ({
  name = 'unform',
  description = 'Forms in React',
  link = '#',
}) => {
  return (
    <li>
      <strong>{name}</strong>
      <p>{description}</p>
      <a href={link}>Access Repository</a>
    </li>
  )
}
