import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: any) {
  return (
    <div className="bg-neutral-50 text-stone-700 font-sans min-h-screen">
      <Navbar />
      <main className="min-h-[75vh] py-10">{children}</main>
      <Footer />
    </div>
  )
}
