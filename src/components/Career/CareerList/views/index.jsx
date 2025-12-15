'use client';

// -- libraries
import { useMemo, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// -- styles
import style from '@components/Career/CareerList/styles/style.module.scss';

// -- elements
import Pagination from '@elements/Pagination/views';
import SystemIcon from '@elements/SystemIcon/views';

const FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'Full Time', label: 'Full-Time' },
  { key: 'Part Time', label: 'Part-Time' },
  { key: 'Contract', label: 'Contract' }
];

const CareerList = ({ data }) => {
  const list = data?.list ?? [];
  const empty = data?.empty ?? {};

  const [filter, setFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const isGlobalEmpty = list.length === 0;

  useEffect(() => {
    const handleResize = () => {
      const isMobile = window.innerWidth < 768;
      setItemsPerPage(isMobile ? 5 : 10);
    };

    handleResize(); // initial check
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // reset page when itemsPerPage changes
  useEffect(() => {
    setCurrentPage(1);
  }, [itemsPerPage]);

  /* =====================
   * FILTER
   * ===================== */
  const filteredList = useMemo(() => {
    if (filter === 'all') return list;
    return list.filter((it) => (it.job_type || '').toLowerCase() === filter.toLowerCase());
  }, [list, filter]);

  const isFilterEmpty = !isGlobalEmpty && filteredList.length === 0;

  const totalPage = Math.max(1, Math.ceil(filteredList.length / itemsPerPage));

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredList.slice(start, start + itemsPerPage);
  }, [filteredList, currentPage, itemsPerPage]);

  /* =====================
   * HANDLERS
   * ===================== */
  const handlePageChange = (page) => {
    setCurrentPage(page);
    if (typeof window !== 'undefined') {
      const el = document.querySelector(`.${style.careerList}`);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleFilterChange = (key) => {
    setFilter(key);
    setCurrentPage(1);
  };

  /* =====================
   * RENDER
   * ===================== */
  return (
    <section className={style.career} aria-labelledby='career-heading'>
      <div className='container'>
        {/* GLOBAL EMPTY */}
        {isGlobalEmpty ? (
          <div className={style.careerEmpty} role='status' aria-live='polite'>
            {empty?.image && (
              <div className={style.emptyImage}>
                <Image src={empty.image} alt={empty.title || 'No Opportunities'} width={200} height={200} />
              </div>
            )}
            <h5 className={style.emptyTitle}>{empty?.title || 'Oops, no job listings available.'}</h5>
            <p className={style.emptyDesc}>{empty?.description || 'Check back soon for new opportunities!'}</p>
          </div>
        ) : (
          <div className={style.careerWrapp}>
            {/* FILTER TABS */}
            <div className={style.careerTabs} role='tablist' aria-label='Job type filter'>
              {FILTERS.map((f) => {
                const isActive = filter === f.key;
                return (
                  <button
                    key={f.key}
                    type='button'
                    role='tab'
                    aria-pressed={isActive}
                    className={`${style.tabButton} ${isActive ? style.active : ''}`}
                    onClick={() => handleFilterChange(f.key)}>
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* EMPTY FILTER */}
            {isFilterEmpty ? (
              <div className={style.careerEmpty}>
                <h3 className={style.emptyTitle}>No results found</h3>
                <p className={style.emptyDesc}>No job opportunities match this filter.</p>
              </div>
            ) : (
              <>
                {/* LIST */}
                <div className={style.careerList}>
                  {pageItems.map((item) => (
                    <div key={item.id || item.title} className={style.careerItem}>
                      <div className={style.careerItemBox}>
                        <div className={style.careerItemHeader}>
                          <h5 className={style.careerItemTitle}>{item.title}</h5>
                          <p className={style.careerItemDesc}>{item.description}</p>
                          <Link href={item.btn?.link || '#'} className={style.careerItemApplyLink} />
                        </div>

                        <div className={style.careerItemFooter}>
                          <div className={style.careerItemMeta}>
                            <div className={style.careerItemJobType}>
                              <SystemIcon name='timer' width={16} height={16} />
                              <span>{item.job_type}</span>
                            </div>
                            <div className={style.careerItemWorkplace}>
                              <SystemIcon name='buildin-fill' width={16} height={16} />
                              <span>{item.workplace}</span>
                            </div>
                          </div>

                          <div className={style.careerItemAction}>
                            <Link
                              href={item.btn?.link || '#'}
                              className={style.detailLink}
                              aria-label={`View details for ${item.title}`}>
                              <span>View Details</span>
                              <SystemIcon name='caret-right' width={14} height={14} />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* PAGINATION */}
                {filteredList.length > itemsPerPage && (
                  <div className={style.careerPagination}>
                    <Pagination
                      currentPage={currentPage}
                      totalPage={totalPage}
                      onPageChange={handlePageChange}
                      siblingCount={1}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

export default CareerList;
