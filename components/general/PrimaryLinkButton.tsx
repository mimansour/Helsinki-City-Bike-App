import Link from 'next/link'

export const buttonStyle =
  'border rounded-lg bg-gradient-to-r from-amber-500 to-red-400 text-neutral-50 py-3 px-4 hover:scale-105 transition-all ease-in-out duration-400 uppercase font-medium'

const PrimaryLinkButton = (props: { title: string; href: string }) => (
  <Link href={props.href} className={buttonStyle}>
    {props.title}
  </Link>
)

export default PrimaryLinkButton
