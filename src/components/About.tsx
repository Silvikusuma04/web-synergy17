"use client";
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const tabs = [
  { id: 'challenge', label: 'The Challenge' },
  { id: 'solution', label: 'Our Solution' },
  { id: 'process', label: 'Our Process' },
];

export default function About() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);

  return (
    <motion.section 
      id="about" 
      className="py-24 bg-sand-beige"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }} 
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-4xl lg:text-5xl font-bold font-serif mb-10 text-forest-green">
          From Problem to Prototype
        </h2>

        <div className="flex justify-center border-b border-gray-300 mb-12 relative">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative py-4 px-6 text-lg font-medium focus:outline-none transition-all duration-300 rounded-t-md ${
                activeTab === tab.id 
                  ? 'text-forest-green bg-white shadow-sm' 
                  : 'text-gray-500 hover:text-forest-green/80'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-forest-green rounded-full"
                  layoutId="underline"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-left"
          >
            {activeTab === 'challenge' && <ChallengeContent />}
            {activeTab === 'solution' && <SolutionContent />}
            {activeTab === 'process' && <ProcessContent />}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.section>
  );
}

const ChallengeContent = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="prose lg:prose-lg max-w-none text-deep-sea-blue/80">
      <h3>A Threatened Ecosystem</h3>
      <p>
        Komodo National Park is home to a vital 1,217 hectare mangrove ecosystem. While generally in moderate to good condition, recent analysis has identified <strong>47.64 hectares of mangroves in poor health</strong>, primarily around settlement areas. This degradation threatens not only biodiversity but also the natural coastal barrier that protects communities from abrasion and erosion, especially during extreme weather events like cyclones and tsunamis. The mangroves also play a crucial role in carbon sequestration, making their health vital for climate resilience and local livelihoods.
      </p>
    </div>
    <div className="flex justify-center">
      <motion.img 
        src="/kerusakan.png" 
        alt="Degraded Mangrove" 
        className="rounded-lg shadow-xl object-cover w-full h-80"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </div>
  </div>
);

const SolutionContent = () => (
  <div className="grid md:grid-cols-2 gap-12 items-center">
    <div className="flex justify-center">
      <motion.img 
        src="/lab.png" 
        alt="Mangrove Booster Products" 
        className="rounded-lg max-h-96"
        whileHover={{ scale: 1.03 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </div>
    <div className="prose lg:prose-lg max-w-none text-deep-sea-blue/80">
      <h3>Mangrove Booster: A Nature Based Innovation</h3>
      <p>
        To address this threat, our project introduces &apos;Mangrove Booster,&apos; a nature based solution to enhance growth and resilience. This innovation, available in <strong>Granule and Liquid Form</strong>, works by:
      </p>
      <ul>
        <li>Promoting healthier, more resilient mangrove ecosystems.</li>
        <li>Boosting microbial diversity for efficient nutrient cycling.</li>
        <li>Enhancing adaptation to environmental challenges, including invasive species.</li>
        <li>Improving mangrove growth and enhancing gene regulation against environmental stress.</li>
      </ul>
    </div>
  </div>
);

const ProcessContent = () => (
  <div className="text-center">
    <h3 className="text-2xl font-bold font-serif text-deep-sea-blue/90 mb-6">From Lab Research to Prototype</h3>
    <p className="max-w-3xl mx-auto text-deep-sea-blue/80 mb-8">
      Our innovation is born from a rigorous scientific journey. We began by sourcing beneficial microbes directly from mangrove roots, cultivating them in the lab, and then screening for the most effective bacteria for mangrove rehabilitation.
    </p>
    <div className="flex justify-center">
      <motion.img 
        src="/final.png" 
        alt="Research Journey" 
        className="rounded-lg shadow-xl w-full max-w-4xl"
        whileHover={{ scale: 1.02 }}
        transition={{ type: "spring", stiffness: 200 }}
      />
    </div>
  </div>
);