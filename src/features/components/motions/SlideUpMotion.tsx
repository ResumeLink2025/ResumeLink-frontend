import { motion } from 'motion/react';

import type { MotionType } from './types';

const SlideUpMotion = ({ delay = 0, children }: MotionType) => {
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
