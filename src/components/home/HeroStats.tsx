'use client';
import { motion } from 'framer-motion';

interface HeroStatsProps {
  stats: {
    posts: number;
    categories: number;
    tags: number;
    authors: number;
  };
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

export function HeroStats(_props: HeroStatsProps) {
  return (
    <section className="px-6 py-8">
      <div className="max-w-320 mx-auto">
        <motion.div
          className="flex flex-col md:flex-row md:items-end justify-between gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <h1 className="text-2xl md:text-4xl font-bold text-ds-on-surface mb-2 tracking-tight">
              Developer Resources,{' '}
              <span className="text-ds-primary">Curated.</span>
            </h1>
            <p className="text-ds-on-surface-variant text-base md:text-lg max-w-xl">
              Hand-picked tutorials, tools, and references for the modern
              developer ecosystem.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
