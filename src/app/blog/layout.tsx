import { GoogleAnalytics } from '@next/third-parties/google'

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Aquí se cargarán tus artículos de forma normal */}
      {children}
      
      {/* El radar invisible de Google Analytics */}
      <GoogleAnalytics gaId="G-6831ECDTJ7" />
    </>
  )
}