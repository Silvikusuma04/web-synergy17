"use client";
import { useEffect, useRef } from 'react';
import { animate, useInView } from 'framer-motion';

type CounterProps = {
  from?: number;
  to: number;
  duration?: number;
};

export default function Counter({ from = 0, to, duration = 2 }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (inView && ref.current) {
      const controls = animate(from, to, {
        duration,
        onUpdate(value) {
          if (ref.current) {
            ref.current.textContent = value.toFixed(0);
          }
        },
      });
      return () => controls.stop();
    }
  }, [inView, from, to, duration]);

  return <span ref={ref} />;
}