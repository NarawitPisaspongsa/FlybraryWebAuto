'use client'

import MenuBar from './MenuBar'

interface ConditionalLayoutProps {
  children: React.ReactNode
}

export default function MainLayout({
  children,
}: ConditionalLayoutProps) {
  return (
    <>
      <MenuBar />
        <div>
            {children}
        </div>
    </>
  )
}