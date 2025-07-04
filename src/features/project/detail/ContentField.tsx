import { Typography } from '@/components/common';

interface ContentFieldProps {
  title: string;
  content: string;
}

const ContentField = ({ title, content }: ContentFieldProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography type="title2">{title}</Typography>
      <div className="border border-gray-40 px-[18px] py-3 rounded-[10px]">
        <Typography type="body1" className="text-gray-60">
          {content}
        </Typography>
      </div>
    </div>
  );
};

export default ContentField;
