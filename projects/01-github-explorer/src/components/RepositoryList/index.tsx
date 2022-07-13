import { useEffect, useState, FC } from 'react'
import { RepositoryItem } from '../RepositoryItem'

import './styles.scss'

interface Repository {
  name: string
  description: string
  html_url: string
}

export const RepositoryList: FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([])

  useEffect(() => {
    fetch('https://api.github.com/users/proudynyu/repos')
      .then((response) => response.json())
      .then((data: Repository[]) => setRepositories(data))
      .catch((e: Error) => {
        throw new Error(e.message)
      })
  }, [])

  return (
    <section className='repository-list'>
      <h1>Repository List</h1>
      <ul>
        {repositories.map(({ name, description, html_url }, index: number) => (
          <RepositoryItem
            key={index}
            name={name}
            description={description}
            link={html_url}
          />
        ))}
      </ul>
    </section>
  )
}
