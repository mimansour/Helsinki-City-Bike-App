import Link from 'next/link'
import Image from 'next/image'
import logo from '../public/bike_logo.svg'

export default function Navbar() {
  const linkStyle = 'px-3 hover:text-amber-500'

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
        <Link className={linkStyle} href="/">
          Home
        </Link>
        <Link href="/stations" className={linkStyle}>
          Stations
        </Link>
        <Link href="/journies" className={linkStyle}>
          Journies
        </Link>
      </nav>
    </div>
  )
}
