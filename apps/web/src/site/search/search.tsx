'use client';

import React, { useRef, useState } from 'react';
import { SearchForm } from './Form';
import { SearchView } from './SearchView';
import { AnimalInfoRequestType } from '@animal-project/shared-types';
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'framer-motion';
import { FaChevronUp } from 'react-icons/fa';

export const SearchPage = () => {
  const [animalInfoRequest, setAnimalInfoRequest] =
    useState<AnimalInfoRequestType | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress, scrollY } = useScroll({ container: scrollRef });

  useMotionValueEvent(scrollY, 'change', (v) => {
    setShowScrollTop(v > 200);
  });

  return (
    <div className="flex flex-col gap-3">
      <SearchForm submitHandler={(data) => setAnimalInfoRequest(data)} />

      {/* Scroll progress indicator */}
      <motion.div
        className="h-0.5 origin-left rounded-full bg-accent"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Results */}
      <div
        className="h-[calc(100dvh-200px)] overflow-y-auto scrollbar-hide"
        ref={scrollRef}
      >
        <SearchView animalInfoRequest={animalInfoRequest} />
      </div>

      {/* Scroll to top FAB */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            key="scroll-top"
            initial={{ opacity: 0, scale: 0.7, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.7, y: 8 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            whileTap={{ scale: 0.88 }}
            className="fixed right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            style={{ bottom: 'calc(49px + env(safe-area-inset-bottom, 0px) + 14px)' }}
            onClick={() => scrollRef.current?.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label="맨 위로"
          >
            <FaChevronUp className="text-sm" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};
