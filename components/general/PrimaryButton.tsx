import { buttonStyle } from './PrimaryLinkButton'

const PrimaryButton = (props: { title: string; onClick: () => void }) => (
  <button className={buttonStyle} onClick={() => props.onClick()}>
    {props.title}
  </button>
)

export default PrimaryButton
