import type { SingleValue, StylesConfig } from 'react-select';
import Select from 'react-select';

interface OptionType {
  label: string;
  value: string;
}

type SelectBoxProps = {
  options: OptionType[];
  value?: string;
  onChange?: (value: string) => void;
  isDisabled?: boolean;
  size?: 'small' | 'medium' | 'large';
};

export default function CustomSelectBox({
  options,
  value,
  onChange,
  isDisabled = false,
  size = 'medium',
}: SelectBoxProps) {
  const selectedOption = options.find((option) => option.value === value) ?? null;

  const handleChange = (isSelected: SingleValue<OptionType>) => {
    if (isSelected) {
      onChange?.(isSelected.value);
    } else {
      onChange?.('');
    }
  };

  const sizeHeightMap = {
    small: '40px',
    medium: '45px',
    large: '50px',
  };
  const customStyles: StylesConfig<OptionType, false> = {
    control: (base, state) => ({
      ...base,
      padding: '0 4px',
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
      borderRadius: '10px',
    }),
    option: (base, state) => ({
      ...base,
      backgroundColor: state.isFocused ? 'var(--color-gray-50)' : 'white',
      borderRadius: '4px',
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
