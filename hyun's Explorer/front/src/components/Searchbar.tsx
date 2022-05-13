import { useState, MouseEventHandler } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Input from '@mui/material/Input';

function Search() {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {};
  return (
    <Input
      sx={{ pl: '1rem', mr: '3rem', width: '20vw', minWidth: '20rem' }}
      id="input-with-icon-adornment"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      placeholder="Search account address"
      endAdornment={
        <InputAdornment position="end">
          <IconButton onClick={handleSearch}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      }
    />
  );
}

export default Search;
