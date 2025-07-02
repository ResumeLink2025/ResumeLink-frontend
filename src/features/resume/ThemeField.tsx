import { SelectBox, Typography } from '@/components/common';
import { THEME_OPTIONS } from '@/constants/resume';

interface ThemeFieldProps {
  selectedThemeOption: string;
  onChangeThemeOption: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const ThemeField = ({ selectedThemeOption, onChangeThemeOption }: ThemeFieldProps) => {
  return (
    <div className="flex flex-col gap-4">
      <Typography type="heading2">이력서 양식 선택</Typography>
      <SelectBox value={selectedThemeOption} onChange={onChangeThemeOption} options={THEME_OPTIONS} />
    </div>
  );
};

export default ThemeField;
