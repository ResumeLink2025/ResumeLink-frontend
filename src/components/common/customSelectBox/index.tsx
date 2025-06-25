import type { SingleValue, StylesConfig } from 'react-select';
import Select from 'react-select';

interface Option {
  label: string;
  value: string;
}

type SelectSize = 'sm' | 'md' | 'lg';

interface SelectBoxProps {
  options: Option[];
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  size?: SelectSize;
}

export default function SelectBox({
  options,
  value,
  onChange,
  isDisabled = false,
  size = 'md',
}: SelectBoxProps) {
  const selectedOption = options.find((opt) => opt.value === value) ?? null;

  const handleChange = (selected: SingleValue<Option>) => {
    if (selected) {
      onChange?.(selected.value);
    } else {
      onChange?.('');
    }
  };

  const sizeHeightMap = {
    sm: '35px',
    md: '40px',
    lg: '45px',
  };

  const customStyles: StylesConfig<Option, false> = {
    control: (base, state) => ({
      ...base,
      backgroundColor: isDisabled ? 'var(--color-gray-10)' : 'white',
      borderColor: isDisabled
        ? 'var(--color-gray-30)'
        : state.isFocused
        ? 'var(--color-gray-50)'
        : 'var(--color-gray-40)',
      boxShadow: state.isFocused && !isDisabled ? '0 0 0 1px var(--color-gray-50)' : 'none',
      '&:hover': {
        borderColor: isDisabled ? 'var(--color-gray-30)' : 'var(--color-gray-30)',
      },
      minHeight: sizeHeightMap[size],
      cursor: isDisabled ? 'not-allowed' : 'pointer',
    }),
    singleValue: (base) => ({
      ...base,
      color: 'black',
    }),
    menu: (base) => ({
      ...base,
      backgroundColor: 'white',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'var(--color-gray-50)' : 'white',
      color: state.isFocused ? 'white' : 'black',
      '&:hover': {
        backgroundColor: 'var(--color-gray-30)',
        color: 'white',
      },
      '&:active': {
        backgroundColor: 'black',
      },
    }),
    placeholder: (base) => ({
      ...base,
      color: isDisabled ? 'var(--color-gray-30)' : 'var(--color-gray-40)',
    }),
    indicatorsContainer: () => ({
      display: 'none',
    }),
  };

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={handleChange}
      isDisabled={isDisabled}
      styles={customStyles}
    />
  );
}
