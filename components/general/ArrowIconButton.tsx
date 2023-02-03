import Image from 'next/image'
import arrowIcon from '../../public/arrow.svg'

const ArrowIconButton = (props: {
  ariaLabel: string
  canSort?: boolean
  onClick: ((event: unknown) => void) | undefined
}) => (
  <button
    aria-label={`order by column ${props.ariaLabel}`}
    className={props.canSort ? 'cursor-pointer select-none' : ''}
    onClick={props.onClick}
  >
    <Image alt="" src={arrowIcon} className="w-3 h-3 min-w-3 min-h-3" />
  </button>
)

export default ArrowIconButton
