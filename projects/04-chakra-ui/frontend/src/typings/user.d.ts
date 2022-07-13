interface CreateUserProps {
  name: string
  email: string
  password: string
  password_confirmation: string
}

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

interface GetUserResponse {
  totalCount: number
  users: User[]
}