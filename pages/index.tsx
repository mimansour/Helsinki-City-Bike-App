import Link from 'next/link'

export default function Home() {
  const linkStyle = 'px-3 hover:text-amber-500'

  return (
    <div className="pt-20 flex flex-col justify-center items-center gap-y-6 text-center">
      <h1 className="text-2xl font-bold">Welcome to Helsinki City Bike App!</h1>
      <p className="w-3/5">
        Helsinki City Bike App contains statistics about the bicycle stations
        and journies in the Helsinki metropolitan area.
      </p>
      <strong>Get started here:</strong>
      <div>
        <Link href="/stations" className={linkStyle}>
          Stations
        </Link>{' '}
        -{' '}
        <Link href="/journies" className={linkStyle}>
          Journies
        </Link>
      </div>
    </div>
  )
}
