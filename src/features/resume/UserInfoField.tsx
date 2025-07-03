import { Typography } from '@/components/common';
import { cn } from '@/utils/styleMerge';

interface UserInfoFieldProps {
  label: string;
  value?: string;
  children?: React.ReactNode;
}

const UserInfoField = ({ label, value, children }: UserInfoFieldProps) => {
  return (
    <div className={cn('flex flex-col gap-2', children && 'col-span-2')}>
      <Typography type="body2">{label}</Typography>
      {value && (
        <Typography type="body2" className="text-gray-50">
          {value}
        </Typography>
      )}
      {children}
    </div>
  );
};

export default UserInfoField;
