'use client';

// -- libraries
import { useMemo, useEffect, useState } from 'react';

// -- styles
import style from '@elements/Pagination/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const DOTS = '...';

// -- helper functions
const range = (start, end) => {
  let length = end - start + 1;
  return Array.from({ length }, (_, idx) => idx + start);
};

// -- pagination hook
const usePagination = ({ currentPage, totalPage, siblingCount, isMobile }) => {
  return useMemo(() => {
    /* =====================
     * MOBILE MODE (FORCE COMPACT)
     * ===================== */
    if (isMobile) {
      if (totalPage <= 3) {
        return range(1, totalPage);
      }

      // Always show: 1 ... current / last
      if (currentPage === 1) {
        return [1, DOTS, totalPage];
      }

      if (currentPage === totalPage) {
        return [1, DOTS, totalPage];
      }

      return [1, DOTS, currentPage];
    }

    /* =====================
     * DESKTOP MODE (DEFAULT)
     * ===================== */
    const totalPageNumbers = siblingCount * 2 + 5;

    if (totalPageNumbers >= totalPage) {
      return range(1, totalPage);
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPage);

    const showLeftDots = leftSiblingIndex > 2;
    const showRightDots = rightSiblingIndex < totalPage - 1;

    if (!showLeftDots && showRightDots) {
      let leftItemCount = 3 + 2 * siblingCount;
      let leftRange = range(1, leftItemCount);
      return [...leftRange, DOTS, totalPage];
    }

    if (showLeftDots && !showRightDots) {
      let rightItemCount = 3 + 2 * siblingCount;
      let rightRange = range(totalPage - rightItemCount + 1, totalPage);
      return [1, DOTS, ...rightRange];
    }

    if (showLeftDots && showRightDots) {
      let middleRange = range(leftSiblingIndex, rightSiblingIndex);
      return [1, DOTS, ...middleRange, DOTS, totalPage];
    }

    return [];
  }, [currentPage, totalPage, siblingCount, isMobile]);
};

const Pagination = ({ currentPage, totalPage, onPageChange, siblingCount = 1 }) => {
  const [isMobile, setIsMobile] = useState(false);

  /* =====================
   * RESPONSIVE CHECK
   * ===================== */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const paginationRange = usePagination({
    currentPage,
    totalPage,
    siblingCount,
    isMobile
  });

  if (!paginationRange || paginationRange.length < 2) return null;

  const onPrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const onNext = () => {
    if (currentPage < totalPage) onPageChange(currentPage + 1);
  };

  return (
    <div className={style.pagination}>
      <ul className={style.paginationList}>
        {/* PREV */}
        <li className={style.paginationItem}>
          <button
            className={currentPage === 1 ? `${style.paginationLink} ${style.disabled}` : style.paginationLink}
            onClick={onPrev}
            aria-label='Previous'>
            <SystemIcon name='caret-left' />
          </button>
        </li>

        {/* PAGES */}
        {paginationRange.map((page, idx) =>
          page === DOTS ? (
            <li key={idx} className={style.paginationItem}>
              <span className={`${style.paginationLink} ${style.dots}`}>{DOTS}</span>
            </li>
          ) : (
            <li key={page} className={style.paginationItem}>
              <button
                className={currentPage === page ? `${style.paginationLink} ${style.active}` : style.paginationLink}
                onClick={() => onPageChange(page)}>
                {page}
              </button>
            </li>
          )
        )}

        {/* NEXT */}
        <li className={style.paginationItem}>
          <button
            className={currentPage === totalPage ? `${style.paginationLink} ${style.disabled}` : style.paginationLink}
            onClick={onNext}
            aria-label='Next'>
            <SystemIcon name='caret-right' />
          </button>
        </li>
      </ul>

      {/* COUNTER */}
      <ul className={style.paginationCounter}>
        <li className={style.paginationCounterItem}>{currentPage.toString().padStart(2)}</li>
        <li className={style.paginationCounterItem}>{totalPage.toString().padStart(2)}</li>
      </ul>
    </div>
  );
};

export default Pagination;
