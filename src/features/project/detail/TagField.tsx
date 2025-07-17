import { Tag, Typography } from '@/components/common';

interface TagFieldProps {
  title: string;
  tags: string[];
}

const TagField = ({ title, tags }: TagFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography type="title2">{title}</Typography>
      <div className="flex flex-wrap gap-2">
        {tags.length > 0 ? (
          tags.map((name) => (
            <Tag key={name} styleType="outline" size="large">
              {name}
            </Tag>
          ))
        ) : (
          <Typography>프로젝트 관련 태그가 없습니다.</Typography>
        )}
      </div>
    </div>
  );
};

export default TagField;
