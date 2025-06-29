import { motion } from 'motion/react';

type SlideUpMotionProps = {
  delay?: number;
  children: React.ReactNode;
};

const SlideUpMotion = ({ delay = 0, children }: SlideUpMotionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
};

export default SlideUpMotion;
