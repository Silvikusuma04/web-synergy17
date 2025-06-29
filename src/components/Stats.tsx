"use client";
import { motion } from 'framer-motion';
import Counter from './Counter';

const stats = [
  { value: 1217, suffix: ' Ha', label: 'Total Mangrove Ecosystem Area' },
  { value: 48, suffix: ' Ha', label: 'Area in Poor Condition Requiring Rehabilitation' },
  { value: 8, suffix: '', label: 'Identified Mangrove Species' },
];

export default function Stats() {
  return (
    <motion.section 
      id="impact" 
      className="bg-forest-green text-sand-beige py-20"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.5 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <p className="text-6xl font-bold font-serif">
                <Counter to={stat.value} />
                {stat.suffix}
              </p>
              <p className="text-lg mt-2 text-sand-beige/80">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}