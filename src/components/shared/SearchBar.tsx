import React from 'react';

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  ariaLabel?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, placeholder, ariaLabel }) => (
  <input
    type="search"
    value={value}
    onChange={onChange}
    placeholder={placeholder || 'Search...'}
    aria-label={ariaLabel || 'Search'}
    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
  />
);

export default SearchBar;
