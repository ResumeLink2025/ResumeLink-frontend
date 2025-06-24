import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../assets/pretendard/Pretendard-Light.woff',
      weight: '300',
    },
    {
      path: '../assets/pretendard/Pretendard-Regular.woff',
      weight: '400',
    },
    {
      path: '../assets/pretendard/Pretendard-Medium.woff',
      weight: '500',
    },
    {
      path: '../assets/pretendard/Pretendard-SemiBold.woff',
      weight: '600',
    },
    {
      path: '../assets/pretendard/Pretendard-Bold.woff',
      weight: '700',
    },
  ],
  variable: '--font-pretendard',
});
