import React from 'react';

interface AppSearchProps {
  value: string;
  onChange: (value: string) => void;
  handleClickSearch: () => void;
  handleReset?: () => void;
}

const Search: React.FC<AppSearchProps> = ({ value, onChange, handleClickSearch, handleReset }) => {
  return (
    <div className="m-search">
      <input
        type="text"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
        onKeyUp={(event) => {
          if (event.keyCode === 13 && handleClickSearch) {
            event.preventDefault();
            handleClickSearch();
          }
        }}
        placeholder="search..."
      />
      <button onClick={handleClickSearch}>Search</button>
      {handleReset &&
        <button onClick={handleReset}>Reset</button>
      }
    </div>
  );
}

Search.defaultProps = {
};

export default Search;
