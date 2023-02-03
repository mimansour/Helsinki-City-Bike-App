import Navbar from './Navbar'
import Footer from './Footer'
import { PropsWithChildren } from 'react'

export default function Layout(props: PropsWithChildren) {
  return (
    <div className="bg-neutral-50 text-stone-700 font-sans min-h-screen">
      <Navbar />
      <main className="min-h-[75vh] py-10">{props.children}</main>
      <Footer />
    </div>
  )
}
