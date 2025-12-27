'use client';

// -- libraries
import { useRef, useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

const ScrollReveal = ({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  amount = 0.2,
  once = false,
  className = '',
  blur = true,
  colorFade = true
}) => {
  const directions = {
    up: { y: 24, x: 0 },
    down: { y: -24, x: 0 },
    left: { x: 40, y: 0 },
    right: { x: -40, y: 0 },
    fade: { x: 0, y: 0 }
  };

  const initial = {
    opacity: 0,
    ...directions[direction],
    ...(blur && { filter: 'blur(8px)' }),
    ...(colorFade && { color: '#757575' })
  };

  const animate = {
    opacity: 1,
    x: 0,
    y: 0,
    ...(blur && { filter: 'blur(0px)' }),
    ...(colorFade && { color: '#212121' })
  };

  const controls = useAnimation();
  const ref = useRef();
  const hasAnimated = useRef(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    let observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > amount) {
          setInView(true);
        } else {
          setInView(false);
        }
      },
      {
        threshold: amount
      }
    );
    observer.observe(node);

    return () => {
      if (observer && node) observer.unobserve(node);
    };
  }, [amount]);

  useEffect(() => {
    if (inView) {
      if (once) {
        if (!hasAnimated.current) {
          controls.start(animate);
          hasAnimated.current = true;
        }
      } else {
        controls.start(animate);
      }
    } else {
      if (!once) {
        controls.start(initial);
        hasAnimated.current = false;
      }
    }
  }, [inView, once]);

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={controls}
      transition={{
        duration,
        delay,
        ease: [0.22, 0.45, 0.15, 1],
        opacity: { duration: duration * 0.7 },
        filter: blur ? { duration: duration * 1.1 } : undefined,
        color: colorFade ? { duration: duration * 0.8 } : undefined
      }}
      className={className}>
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
