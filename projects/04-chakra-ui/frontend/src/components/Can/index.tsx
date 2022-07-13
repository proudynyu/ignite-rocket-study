import { FC } from 'react'
import { useCan } from '../../hooks/useCan'

interface CanProps {
  permissions?: string[]
  roles?: string[]
}

export const Can: FC<CanProps> = ({ children, permissions, roles }) => {
  const userCanSeeComponent = useCan({ permissions, roles })

  if (!userCanSeeComponent) return null
  return <>{children}</>
}
