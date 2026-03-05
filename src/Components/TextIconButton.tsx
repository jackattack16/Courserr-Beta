import Icon from './Icon'
import '../Styles/TextIconButton.css'

type buttonProps = {
  icon: string;
  buttonText: string;
}


function TextIconButton({ icon, buttonText}: buttonProps) {
  return (
    <>
      <button className='text-icon-button'>{buttonText}<Icon name={icon}></Icon></button>
    </>
  )
}

export default TextIconButton;