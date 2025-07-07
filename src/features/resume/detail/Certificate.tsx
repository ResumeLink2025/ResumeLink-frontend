import { Typography } from '@/components/common';

interface CertificateProps {
  title: string;
  date?: string;
  issuer?: string;
  grade?: number;
  isThemeBlack: boolean;
}

const Certificate = ({ title, date, issuer, grade, isThemeBlack }: CertificateProps) => {
  return (
    <div className="flex flex-col gap-2">
      <Typography type="title1" className="text-current-mode">
        {title}
      </Typography>
      <Typography className={isThemeBlack ? 'text-gray-40' : 'text-gray-50'}>{date}</Typography>
      <Typography className={isThemeBlack ? 'text-gray-30' : 'text-gray-60'}>
        {[issuer, grade].filter(Boolean).join(' | ')}
      </Typography>
    </div>
  );
};

export default Certificate;
