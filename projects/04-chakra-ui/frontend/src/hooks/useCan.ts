import { useAuthContext } from "../context/AuthContext";
import { validateUserPermissions } from "../utils/validadeUserPermissions";

interface UserCanProps {
  permissions?: string[];
  roles?: string[]
}

export function useCan({ permissions = [], roles }: UserCanProps) {
  const { user, isAuth } = useAuthContext()

  if (!isAuth) {
    return false
  }

  return validateUserPermissions({ user, permissions, roles })
}