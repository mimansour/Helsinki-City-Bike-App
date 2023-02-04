import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/bike-logo.svg'
import { useRouter } from 'next/router'

export default function Navbar() {
  const router = useRouter()

  const linkStyle = (url: string) => {
    return `px-3 font-medium uppercase hover:text-gray-900 hover:underline underline-offset-8 decoration-amber-500 ${
      router.asPath === url ? 'text-gray-900 underline' : 'text-gray-500'
    }`
  }

  return (
    <header className="flex flex-col justify-center md:flex-row md:justify-between items-center md:px-4">
      <Link href="/">
        <Image
          className="w-60 my-4"
          src={logo}
          alt="Helsinki city bike -logo"
          data-test-id="logo"
        />
      </Link>
      <nav className="flex justify-center py-2">
        <Link className={linkStyle('/')} href="/">
          Home
        </Link>
        <Link href="/stations" className={linkStyle('/stations')}>
          Stations
        </Link>
        <Link href="/journeys" className={linkStyle('/journeys')}>
          Journeys
        </Link>
      </nav>
    </header>
  )
}
