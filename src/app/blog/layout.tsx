export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {/* Aquí se cargarán tus artículos de forma normal */}
      {children}
    </>
  )
}