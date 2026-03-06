import { useState } from 'react';
import '../Styles/Searchbar.css'
import Icon from './Icon';

function Searchbar() {
  const [value, setValue] = useState('');
  return (
    <>
    <div className='searchbar-holder grainy-bg-blur'>
      <Icon name='search'/>
      <input
        className="searchbar"
        placeholder='Type something...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && <kbd>Enter</kbd>}
    </div>
    </>
  )
}

export default Searchbar;