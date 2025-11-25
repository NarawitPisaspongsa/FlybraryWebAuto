import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    accessToken?: string
    user: {
      token: string // JWT token
      role: string // User role

      // user data
      id: number
      name: string
      profilePictureUrl: string

      email?: string
      tel?: string
      lineId?: string

    }
  }

  interface JWT {
    accessToken?: string;
  }
}