import { motion } from 'framer-motion';

import type { MotionType } from './types';

const FadeInOutMotion = ({ delay = 0, motionKey, children }: MotionType) => {
  return (
    <motion.div
      key={motionKey}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
};

export default FadeInOutMotion;
