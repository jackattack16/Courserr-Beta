import { useState, useCallback, useEffect } from 'react';
import '../Styles/Searchbar.css'
import Icon from './Icon';

type searchbarProps = {
  updateSearchQuery: (query: string) => void;
  clearTrigger?: number;
}

function Searchbar({ updateSearchQuery, clearTrigger }: searchbarProps) {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (clearTrigger !== undefined) {
      setValue('');
    }
  }, [clearTrigger]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      updateSearchQuery(value);
    }
  }, [value, updateSearchQuery]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (newValue === '') {
      updateSearchQuery('');
    }
  }, [updateSearchQuery]);


  return (
    <>
    <div className='searchbar-holder grainy-bg-blur'>
      <Icon name='search'/>
      <input
        className="searchbar"
        placeholder='Type something...'
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {value && <kbd>Enter</kbd>}
    </div>
    </>
  )
}

export default Searchbar;