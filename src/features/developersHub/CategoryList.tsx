import { Typography } from '@/components/common';
import type { DevelopOccupationType, DevelopSkillType } from '@/constants/developersHub';
import { cn } from '@/utils/styleMerge';

type CategoryType = DevelopSkillType | DevelopOccupationType;

interface CategoryListProps<T extends CategoryType> {
  title: string;
  categories: T[];
  checkedList: T[];
  onClickCategory: (category: T) => void;
}

const CategoryList = <T extends CategoryType>({
  title,
  categories,
  checkedList,
  onClickCategory,
}: CategoryListProps<T>) => {
  const isChecked = (category: CategoryType) => {
    return checkedList.some((checkedList) => checkedList.id == category.id);
  };

  return (
    <div className="flex flex-col items-center gap-1 w-full">
      <Typography type="body1" className="mb-2">
        {title}
      </Typography>
      {categories.map((category) => (
        <div
          key={category.id}
          onClick={() => onClickCategory(category)}
          className={cn(
            'w-full flex items-center justify-center p-2 rounded-[10px] cursor-pointer transition',
            isChecked(category) ? 'bg-primary hover:bg-primaryHover' : 'bg-gray-10 hover:bg-gray-25',
          )}
        >
          {'occupation' in category ? category.occupation : category.skill}
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
