import { Tag, Typography } from '@/components/common';
import { DEVELOPER_CATEGORY } from '@/constants/resume';

interface CategoryFieldProps {
  selectedCategories: string[];
  isSubmitted: boolean;
  errorMessage?: string;
  onClickCategory: (category: string) => void;
}

const CategoryField = ({
  selectedCategories,
  isSubmitted,
  errorMessage,
  onClickCategory,
}: CategoryFieldProps) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-2">
        <Typography type="heading2">개발자 카테고리</Typography>
        <Tag size="small">필수</Tag>
      </div>
      <Typography type="body2" className="text-gray-50 mt-2">
        나를 가장 잘 표현할 수 있는 카테고리를 선택해 주세요. (최대 5개까지 선택 가능)
      </Typography>
      <div className="flex flex-wrap gap-2 mt-5">
        {DEVELOPER_CATEGORY.map((category) => (
          <Tag
            key={category}
            onClick={() => onClickCategory(category)}
            isSelected={selectedCategories.includes(category)}
            styleType="outline"
            size="large"
          >
            {category}
          </Tag>
        ))}
      </div>
      {isSubmitted && errorMessage && <Typography className="text-red-600 mt-4">{errorMessage}</Typography>}
    </div>
  );
};

export default CategoryField;
