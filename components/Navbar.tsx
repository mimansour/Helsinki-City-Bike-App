import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/bike-logo.svg'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const linkStyle = (url: string) => {
    return `px-3 font-medium hover:text-gray-900 hover:underline underline-offset-8 decoration-amber-500 ${
      router.asPath === url ? 'text-gray-900 underline' : 'text-gray-500'
    }`
  }

  return (
    <div className="flex flex-col justify-center md:flex-row md:justify-between items-center md:px-4">
      <Link href="/">
        <Image
          className="w-60 my-4"
          src={logo}
          alt="Helsinki city bike -logo"
        />
      </Link>
      <nav className="flex justify-center py-2">
        <Link className={linkStyle('/')} href="/">
          HOME
        </Link>
        <Link href="/stations" className={linkStyle('/stations')}>
          STATIONS
        </Link>
        <Link href="/journies" className={linkStyle('/journies')}>
          JOURNIES
        </Link>
      </nav>
    </div>
  )
}
