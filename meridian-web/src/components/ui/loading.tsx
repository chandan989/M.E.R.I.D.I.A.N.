'use client';

import { motion } from 'framer-motion';
import Logo from '../../../../logo.svg';

const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        style={{ width: '100px', height: '100px' }}
      >
        <img src={Logo} alt="Loading..." className="h-full w-full" />
      </motion.div>
    </div>
  );
};

export default Loading;
