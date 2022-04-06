export interface User {
  name: string
  picture: string
  email: string
}

export interface AuthCredential{
  token: string
}

export interface AuthProviderState {
  user?: User
  loading: boolean
}

export interface AuthContextAPI extends AuthProviderState {
  login: (credential: AuthCredential) => void
  logout: (redirectTo?: string) => void
}
