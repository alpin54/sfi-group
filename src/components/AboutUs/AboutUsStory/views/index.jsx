'use client';

import React, { useRef, useState, useLayoutEffect, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// -- styles
import style from '@components/AboutUs/AboutUsStory/styles/style.module.scss';

const AboutUsStory = (props) => {
  const { data } = props;
  const list = Array.isArray(data?.list) ? data.list : [];
  const sectionRef = useRef(null);
  const containerRef = useRef(null);
  const scrollRef = useRef(null);
  const ghostRef = useRef(null);
  const itemRefs = useRef([]);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportW, setViewportW] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    setScrollRange(scrollRef.current.scrollWidth || 0);
  }, []);

  useLayoutEffect(() => {
    var updateViewport = function () {
      setViewportW(window.innerWidth || 0);
      if (scrollRef.current) {
        setScrollRange(scrollRef.current.scrollWidth || 0);
      }
    };

    updateViewport();
    window.addEventListener('resize', updateViewport);
    return function () {
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  // Re-measure when items/active state could affect width.
  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    setScrollRange(scrollRef.current.scrollWidth || 0);
  }, [list.length, activeIndex, viewportW]);

  var scrollLength = Math.max(0, scrollRange - viewportW);
  // Sticky container already takes 100vh, so ghost only needs the remaining scroll length.
  var ghostHeight = scrollLength;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
    layoutEffect: false
  });

  const transform = useTransform(scrollYProgress, [0, 1], [0, -scrollLength]);
  const physics = { damping: 15, mass: 0.27, stiffness: 55 };
  const spring = useSpring(transform, physics);

  const updateActiveIndex = useCallback(() => {
    var triggerX = (viewportW || window.innerWidth || 0) * 0.5;

    // Activate the last item whose left edge has crossed 50% viewport.
    var nextIndex = 0;
    for (var i = 0; i < itemRefs.current.length; i++) {
      var el = itemRefs.current[i];
      if (!el) continue;
      var rect = el.getBoundingClientRect();
      if (rect.left <= triggerX) {
        nextIndex = i;
      }
    }

    setActiveIndex(function (prev) {
      return prev === nextIndex ? prev : nextIndex;
    });
  }, [viewportW]);

  useLayoutEffect(() => {
    var rafId = null;

    var scheduleUpdate = function () {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(function () {
        rafId = null;
        updateActiveIndex();
      });
    };

    // Initial
    scheduleUpdate();

    // Update while horizontal motion changes
    var unsubscribe = spring.on('change', scheduleUpdate);

    return function () {
      if (typeof unsubscribe === 'function') unsubscribe();
      if (rafId != null) window.cancelAnimationFrame(rafId);
    };
  }, [spring, updateActiveIndex]);

  const renderItem = (val, idx) => (
    <div className={style.content}>
      <h2
        className={style.year}
        onClick={() => {
          var wrapperEl = itemRefs.current[idx];
          if (!wrapperEl || !sectionRef.current) return;

          if (ghostHeight <= 0 || scrollLength <= 0) return;

          // scroll so this item becomes the left-most visible item
          var xDesired = wrapperEl.offsetLeft || 0;
          xDesired = Math.min(scrollLength, Math.max(0, xDesired));

          var sectionTop = sectionRef.current.getBoundingClientRect().top + window.scrollY;
          window.scrollTo({ top: sectionTop + xDesired, behavior: 'smooth' });
        }}>
        {val?.year}
      </h2>
      <h4 className={style.name}>{val?.title}</h4>
      <div className={style.description} dangerouslySetInnerHTML={{ __html: val?.description }} />
    </div>
  );

  return (
    <section ref={sectionRef} className={style.story}>
      <div ref={containerRef} className={style.storyContainer}>
        <motion.section ref={scrollRef} style={{ x: spring }} className={style.thumbnailsContainer}>
          <div className={style.list}>
            {list.map(function (val, idx) {
              return (
                <div
                  key={`about-us-story-scroll-item-${idx}`}
                  ref={function (el) {
                    itemRefs.current[idx] = el;
                  }}
                  className={`${style.item} ${idx === activeIndex ? `${style.itemActive} active` : ''}`}>
                  {renderItem(val, idx)}
                </div>
              );
            })}
          </div>
        </motion.section>
      </div>
      <div ref={ghostRef} style={{ height: ghostHeight }} className={style.ghost} />
    </section>
  );
};

export default AboutUsStory;
