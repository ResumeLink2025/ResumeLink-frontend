import { Typography } from '@/components/common';
import { formatDate } from '@/utils/date';

interface CertificateProps {
  name?: string;
  date?: string;
  issuer?: string;
  grade?: string;
  isThemeBlack: boolean;
}

const Certificate = ({ name, date, issuer, grade, isThemeBlack }: CertificateProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography type="title1" className="text-current-mode">
        {name}
      </Typography>
      <Typography className={isThemeBlack ? 'text-gray-40' : 'text-gray-50'}>
        {date && formatDate(date)}
      </Typography>
      <Typography className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
        {[issuer, grade].filter(Boolean).join(' | ')}
      </Typography>
    </div>
  );
};

export default Certificate;
