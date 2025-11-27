import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    idToken?: string
    userId?: string
    user: {
      token: string // JWT token
      role: string // User role

      // user data
      id: number
      name: string
      image: string

      email?: string
      tel?: string
      lineId?: string
    }
  }

  interface JWT {
    accessToken?: string;
  }
}