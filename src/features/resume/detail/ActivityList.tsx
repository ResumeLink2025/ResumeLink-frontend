import { Typography } from '@/components/common';
import { formatDate } from '@/utils/date';
import { cn } from '@/utils/styleMerge';

type ActivitiesType = {
  title?: string;
  startDate?: string;
  endDate?: string;
  description?: string;
};

interface ActivityListProps {
  activities?: ActivitiesType[];
  isThemeBlack?: boolean;
}

const ActivityList = ({ activities, isThemeBlack }: ActivityListProps) => {
  return (
    <div className="flex flex-col gap-3">
      <Typography type="heading2" className="text-current-mode">
        개발 경험
      </Typography>
      <div className="flex flex-col gap-6">
        {activities?.map((activity, idx) => (
          <div key={idx} className="py-3 px-4 flex flex-col gap-1">
            <Typography type="title1" className="text-current-mode">
              {activity.title}
            </Typography>
            {activity.startDate && (
              <Typography className={isThemeBlack ? 'text-gray-40' : 'text-gray-50'}>
                {formatDate(activity.startDate)}
                {activity.endDate && ` ~ ${formatDate(activity.endDate)}`}
              </Typography>
            )}
            <Typography type="body1" className={cn('mt-3', isThemeBlack ? 'text-gray-30' : 'text-gray-60')}>
              {activity.description}
            </Typography>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityList;
