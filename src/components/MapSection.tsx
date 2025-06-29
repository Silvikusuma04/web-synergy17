"use client";
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

const MapWithNoSSR = dynamic(() => import("./Map"), {
  ssr: false
});

export default function MapSection() {
  return (
    <motion.section 
      id="map" 
      className="py-24 bg-sand-beige"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 font-serif text-forest-green">Monitoring Map</h2>
        <p className="text-center max-w-4xl mx-auto text-deep-sea-blue/80 mb-12">
          This map displays the health status of mangroves at various monitoring points, with the Mangrove Health Index (MHI) ranging from 55 to 83. Although the general condition is 'moderate' to 'good,' this map helps us identify and prioritize areas requiring rehabilitation. Click on any point to view its MHI data.
        </p>
        <div className="w-full h-[80vh] rounded-lg shadow-2xl overflow-hidden border-4 border-white">
          <MapWithNoSSR />
        </div>
      </div>
    </motion.section>
  );
}