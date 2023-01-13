import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children }: any) {
  return (
    <div className="bg-slate-100 min-h-screen text-slate-900 font-sans">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
