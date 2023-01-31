import { ERoles } from '@/enums/roles'

export interface IAuthRequest {
  email: string
  password: string
}

export interface IAuthResponse {
  accessToken: string
  tokenType: string
}


// Auth Me
// {} when api error
export interface IAuthMe {
  id: string
  firstName: string
  lastName: string
  email: string
  avatar?: string | null
  avatarUrl?: string | null
  isActive: number
  role: ERoles

}

export interface IUpdateProfile {
  email: string
  firstName: string
  avatar?: {
    name: string
    content: string
  } | null
  redirectUrl: string
}
