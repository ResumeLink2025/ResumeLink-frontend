import { cva } from 'class-variance-authority';

type LoaderProps = {
  size?: 'small' | 'medium' | 'large';
};

const loaderVariants = cva('animate-spin rounded-full border-solid border-gray-30 border-t-primaryHover', {
  variants: {
    size: {
      small: 'size-7 border-2',
      medium: 'size-10 border-3',
      large: 'size-12 border-4',
    },
  },
});

const Loader = ({ size = 'medium' }: LoaderProps) => {
  return (
    <div className="flex items-center justify-center">
      <span className={loaderVariants({ size })} />
    </div>
  );
};

export default Loader;
