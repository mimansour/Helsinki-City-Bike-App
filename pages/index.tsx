import Link from 'next/link'

const Home = () => (
  <div className="pt-20 flex flex-col justify-center items-center gap-y-6 text-center">
    <h1 className="text-8xl max-w-4xl uppercase font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-500 to-red-400">
      Helsinki City Bike App
    </h1>
    <p className="w-3/5 pt-10 text-xl text-gray-600">
      Helsinki City Bike App displays statistics about the bicycle stations and
      journies in the Helsinki metropolitan area.
    </p>
    <Link
      href="/stations"
      className="border rounded-lg bg-gradient-to-r from-amber-500 to-red-400 text-neutral-50 py-3 px-4 hover:scale-105 transition-all ease-in-out duration-400 uppercase font-medium"
    >
      Get started
    </Link>
  </div>
)

export default Home
