'use client';

// -- libraries
import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// -- assets
import LogoImage from '@assets/image/logo/logo-primary.png';

// -- styles
import style from '@components/Header/styles/style.module.scss';

// -- hooks
import useScrollable from '@hooks/useScrollable';

// -- states
import useStateHeader from '@components/Header/states';

// -- utils
import windowScroll from '@utils/windowScroll';
import LocalStorage from '@utils/localStorage';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';
import Input from '@elements/Input/views';

const Header = (props) => {
  const { data, newArrivals, popularProducts, popularBrands } = props;
  const { enableScroll, disableScroll } = useScrollable();
  const { menu } = useStateHeader();
  const [openMenu, setOpenMenu] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [recentSearch, setRecentSearch] = useState([]);
  const [openContentMenu, setOpenContentMenu] = useState(false);
  const [activeTabMenu, setActiveTabMenu] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [userData, setUserData] = useState(null);
  const headerRef = useRef(null);
  const menuWrapperRef = useRef(null);
  const searchWrapperRef = useRef(null);
  const burgerMenuRef = useRef(null);
  const buttonSearchRef = useRef(null);
  const searchDebounceRef = useRef(null);
  const BREAKPOINT = 992;
  const router = useRouter();
  useEffect(() => {
    const userStore = LocalStorage.get('user');

    if (userStore) {
      setUserData(userStore);
    }
  }, []);

  // Track window width for responsive UI
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < BREAKPOINT);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle scroll for header class changes
  useEffect(() => {
    const $headerHeight = headerRef.current.offsetHeight;

    let $lastScrollTop = 0;
    const $delta = 5;

    const handleScroll = () => {
      const scrollTop = windowScroll.top();

      // --- Scrolled > $headerHeight/4
      if (scrollTop > $headerHeight / 4) {
        if (!document.body.classList.contains('window--scrolled')) {
          document.body.classList.add('window--scrolled');
        }
      } else {
        document.body.classList.remove('window--scrolled');
      }

      // ---
      if (Math.abs($lastScrollTop - scrollTop) <= $delta) {
        return;
      }

      // --- Scroll Down
      if (scrollTop > $lastScrollTop && scrollTop > $headerHeight) {
        document.body.classList.add('window--scroll-down');
      } else {
        // --- Scroll Up
        if (scrollTop + window.innerHeight < document.documentElement.scrollHeight) {
          document.body.classList.remove('window--scroll-down');
        }
      }

      $lastScrollTop = scrollTop;
    };

    windowScroll.run(handleScroll);

    return () => {
      windowScroll.remove(handleScroll);
      document.body.classList.remove('window--scrolled', 'window--scroll-down');
    };
  }, []);

  // Handle show menu class rm-scroll on body for mobile
  useEffect(() => {
    if (openMenu || openSubMenu || openSearch) {
      disableScroll();
    } else {
      enableScroll();
    }
  }, [openMenu, openSubMenu, openSearch, enableScroll, disableScroll]);

  // Close menu if clicking outside menuWrapper
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        openSubMenu &&
        menuWrapperRef.current &&
        !menuWrapperRef.current.contains(event.target) &&
        burgerMenuRef.current &&
        !burgerMenuRef.current.contains(event.target)
      ) {
        setOpenSubMenu(false);
      }

      if (
        openSearch &&
        searchWrapperRef.current &&
        !searchWrapperRef.current.contains(event.target) &&
        buttonSearchRef.current &&
        !buttonSearchRef.current.contains(event.target)
      ) {
        setOpenSearch(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openSubMenu, openSearch]);

  // Close menu with ESC key
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        if (openMenu) {
          setOpenMenu(false);
        }
        if (openSubMenu) {
          setOpenSubMenu(false);
        }
        if (openContentMenu) {
          setOpenContentMenu(false);
        }
        if (openSearch) {
          setOpenSearch(false);
        }
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [openMenu, openSubMenu, openContentMenu, openSearch]);

  // Debounced search effect: call headerModel.search when user types
  useEffect(() => {
    // clear any pending debounce
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
      searchDebounceRef.current = null;
    }

    const keyword = search ? search.trim() : '';

    if (!keyword) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    // debounce 300ms
    searchDebounceRef.current = setTimeout(async () => {
      try {
        // const { data } = await headerModel.search(keyword);
        const found = [];
        setSearchResults(Array.isArray(found) ? found : []);
      } catch (err) {
        // on error clear results
        setSearchResults([]);
        // optionally log: console.error('Search error', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [search]);

  useEffect(() => {
    const store = LocalStorage.get('recentSearch');
    if (Array.isArray(store)) {
      setRecentSearch(store);
    } else {
      setRecentSearch([]);
    }
  }, []);

  // handle add recent search
  const addRecentSearch = (keyword) => {
    if (!keyword || !keyword.trim()) return;
    let updated = [keyword.trim(), ...recentSearch.filter((k) => k !== keyword.trim())];
    updated = updated.slice(0, 8);
    setRecentSearch(updated);
    LocalStorage.set('recentSearch', updated);
  };

  // handle remove recent search item
  const removeRecentItem = (keyword) => {
    const updated = recentSearch.filter((k) => k !== keyword);
    setRecentSearch(updated);
    LocalStorage.set('recentSearch', updated);
  };

  // handle clear all recent search
  const clearAllRecent = () => {
    setRecentSearch([]);
    LocalStorage.set('recentSearch', []);
  };

  // handle search submit
  const handleSearch = (e) => {
    e.preventDefault();
    if (search && search.trim() !== '') {
      addRecentSearch(search.trim());
      router.push(`/search?keyword=${encodeURIComponent(search.trim())}`);
      setSearch('');
      setSearchResults([]);
    }
  };

  const totalCart = 0;
  const displayImage = (data) => {
    if (data.image1) return data.image1;
    if (data.image2) return data.image2;
    if (data.image3) return data.image3;
    if (data.image4) return data.image4;
  };

  return (
    <>
      <div
        className={`${style.header} ${openMenu ? `${style.header} ${style.showMenu}` : ''} ${openSearch ? style.showSearch : ''} ${openSubMenu ? style.showSubMenu : ''}`}
        ref={headerRef}>
        <div className={style.headerWrapper}>
          <div className='container'>
            <div className={style.headerInner}>
              {/* Logo */}
              <div className={style.logo}>
                <Link
                  href='/'
                  className={style.logoLink}
                  onClick={() => {
                    setOpenMenu(false);
                    setActiveTabMenu(0);
                    setOpenContentMenu(false);
                  }}>
                  <Image className={style.logoImg} src={LogoImage} alt='Lune' width={80} height={32} priority />
                </Link>
              </div>

              {/* Header menu */}
              <div className={style.nav}>
                <ul className={style.navList}>
                  <li className={style.navItem}>
                    <Link
                      href='/'
                      className={`${style.navLink} ${menu === 'home' ? style.navLinkActive : ''}`}
                      onClick={() => {
                        setOpenMenu(false);
                        setOpenSubMenu(false);
                        setActiveTabMenu(0);
                        setOpenContentMenu(false);
                      }}
                      onMouseEnter={() => setOpenSubMenu(false)}>
                      Home
                    </Link>
                  </li>
                  {data.map((item, idx) => (
                    <li className={style.navItem} key={`menu-${idx}`}>
                      <Link
                        href={`/shop/${item.slug}`}
                        className={`${style.navLink} ${menu === item.slug ? style.navLinkActive : isMobile && activeTabMenu === idx ? style.navLinkActive : ''} ${item.slug === 'promo' && style.navLinkPromo}`}
                        onMouseEnter={() => {
                          if (item.subcategories.length > 0) {
                            if (!isMobile) {
                              setActiveTabMenu(idx);
                              setOpenSubMenu(true);
                              setTimeout(() => {
                                setOpenContentMenu(true);
                              }, 200);
                            }
                          } else {
                            if (!isMobile) {
                              setOpenSubMenu(false);
                            }
                          }
                        }}
                        onClick={(e) => {
                          if (item.subcategories.length > 0) {
                            if (isMobile) {
                              e.preventDefault();
                              setOpenSubMenu(true);
                              setActiveTabMenu(idx);
                              setTimeout(() => {
                                setOpenContentMenu(true);
                              }, 200);
                            } else {
                              setOpenSubMenu(false);
                            }
                          } else {
                            setOpenMenu(false);
                            setOpenSubMenu(false);
                          }
                        }}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Header Feature */}
              <div className={style.feature}>
                <ul className={style.featureList}>
                  <li className={style.featureItem}>
                    <button
                      className={style.featureLink}
                      type='button'
                      onClick={() => {
                        setOpenSearch(!openSearch);
                        setOpenMenu(false);
                        setActiveTabMenu(0);
                        setOpenContentMenu(false);
                      }}
                      ref={buttonSearchRef}>
                      <SystemIcon name='search' />
                    </button>
                  </li>
                  <li className={style.featureItem}>
                    <Link
                      className={
                        menu === 'wishlist' ? `${style.featureLink} ${style.featureLinkActive}` : style.featureLink
                      }
                      href='/wishlist'
                      onClick={() => {
                        setOpenSearch(false);
                        setOpenMenu(false);
                        setActiveTabMenu(0);
                        setOpenContentMenu(false);
                      }}>
                      <SystemIcon name='heart-off' />
                    </Link>
                  </li>
                  <li className={style.featureItem}>
                    <Link
                      className={
                        menu === 'cart' ? `${style.featureLink} ${style.featureLinkActive}` : style.featureLink
                      }
                      href='/cart'
                      onClick={() => {
                        setOpenSearch(false);
                        setOpenMenu(false);
                        setActiveTabMenu(0);
                        setOpenContentMenu(false);
                      }}>
                      <SystemIcon name='handbag-off' />
                      {totalCart > 0 && <span className={style.featureLinkCount}>{totalCart}</span>}
                    </Link>
                  </li>
                  <li className={style.featureItem}>
                    <Link
                      className={
                        menu === 'account' ? `${style.featureLink} ${style.featureLinkActive}` : style.featureLink
                      }
                      href='/account'
                      onClick={() => {
                        setOpenSearch(false);
                        setOpenMenu(false);
                        setActiveTabMenu(0);
                        setOpenContentMenu(false);
                      }}>
                      <SystemIcon name='user-circle-off' />
                      {totalCart > 0 && <span className={style.featureLinkCount}>{totalCart}</span>}
                    </Link>
                  </li>
                  <li className={style.featureItem}>
                    <button
                      className={style.burgerMenu}
                      type='button'
                      onClick={() => {
                        setOpenSearch(false);
                        setOpenMenu(!openMenu);
                        setOpenSubMenu(false);
                        setOpenContentMenu(false);
                        setActiveTabMenu(0);
                      }}
                      ref={burgerMenuRef}>
                      <span className={style.burgerMenuBar}></span>
                      <span className={style.burgerMenuBar}></span>
                    </button>
                  </li>
                </ul>
              </div>

              {/* Navigation */}
              {data && data.length > 0 && (
                <div className={`${style.menu} ${openContentMenu ? style.showContent : ''}`}>
                  <div
                    className={style.menuWrapper}
                    ref={menuWrapperRef}
                    onMouseLeave={() => {
                      if (!isMobile) setOpenSubMenu(false);
                    }}>
                    <div className='container'>
                      <div className={style.menuInner}>
                        {data.map((item, idx) => (
                          <div
                            key={`pane-${idx}`}
                            className={`${style.menuSub} ${activeTabMenu === idx ? style.menuSubActive : ''}`}>
                            <div className={style.menuSubList}>
                              <div className={`${style.menuSubItem} ${style.menuSubItemClose}`}>
                                <button
                                  type='button'
                                  className={style.menuSubLink}
                                  onClick={() => {
                                    setOpenSubMenu(false);
                                    setOpenContentMenu(false);
                                  }}>
                                  <SystemIcon name='caret-left' />
                                  <span>{item.name}</span>
                                </button>
                              </div>
                              <div className={`${style.menuSubItem} ${style.menuSubItemHead}`}>
                                <Link
                                  href={`/shop/${item.slug}`}
                                  className={
                                    menu === item.slug
                                      ? `${style.menuSubLink} ${style.menuSubLinkActive}`
                                      : style.menuSubLink
                                  }
                                  onClick={() => {
                                    setOpenSubMenu(false);
                                    setOpenContentMenu(false);
                                  }}>
                                  <span>Explore All {item.name}</span>
                                </Link>
                              </div>
                              {item.subcategories.map((child, cidx) => (
                                <div className={style.menuSubItem} key={`subcat-${cidx}`}>
                                  <Link
                                    href={`/shop/${item.slug}/${child.slug}`}
                                    className={style.menuSubLink}
                                    onClick={() => setOpenSubMenu(false)}>
                                    {child.name}
                                  </Link>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Search */}
              <div className={style.search}>
                <div
                  className={style.searchWrapper}
                  ref={searchWrapperRef}
                  onMouseLeave={() => {
                    setOpenSearch(false);
                    setSearch('');
                    setSearchResults([]);
                  }}>
                  <div className={style.searchInner}>
                    {/* Search Input */}
                    <form className={style.searchBar} onSubmit={handleSearch}>
                      <Input
                        type='search'
                        placeholder='Let’s find something cool . . .'
                        value={search}
                        icon='search'
                        onChange={(e) => setSearch(e.target.value)}
                      />
                    </form>
                    {/* Recent Search */}
                    {recentSearch.length > 0 && (
                      <div className={style.searchRecent}>
                        <p className={style.searchRecentLabel}>Recent :</p>
                        <button type='button' className={style.searchRecentClear} onClick={clearAllRecent}>
                          Clear All
                        </button>
                        <ul className={style.searchRecentList}>
                          {recentSearch.map((item, idx) => (
                            <li key={idx} className={style.searchRecentItem}>
                              <div className={style.searchRecentItemInner}>
                                <button type='button' className={style.searchRecentBtn} onClick={() => setSearch(item)}>
                                  <span>{item}</span>
                                </button>
                                <button
                                  type='button'
                                  className={style.searchRecentRemove}
                                  onClick={() => removeRecentItem(item)}
                                  aria-label='Remove item'>
                                  <SystemIcon name='close' />
                                </button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Result Searching */}
                    {search.trim() !== '' && (
                      <div className={style.searchResult}>
                        {isSearching ? (
                          <p className={style.searchResultLabel}>Searching...</p>
                        ) : !isSearching && search.trim() !== '' && searchResults.length > 0 ? (
                          <>
                            <p className={style.searchResultLabel}>Results</p>
                            <div className={style.searchResultList}>
                              {searchResults.slice(0, 4).map((item, idx) => (
                                <div className={style.searchResultItem} key={`result-item-${idx}`}>
                                  <div className={style.searchResultBox}>
                                    <Link
                                      href={`/product/${item.slug}`}
                                      className={style.searchResultLink}
                                      onClick={() => {
                                        setOpenSearch(false);
                                        setSearch('');
                                        setSearchResults([]);
                                      }}>
                                      {item.name}
                                    </Link>
                                    <div className={style.searchResultImg}>
                                      {displayImage(item) && (
                                        <Image
                                          src={displayImage(item)}
                                          alt={item.name}
                                          className={style.searchResultImgEl}
                                          width={228}
                                          height={240}
                                        />
                                      )}
                                    </div>
                                    <div className={style.searchResultText}>
                                      <p className={style.searchResultTitle}>{item.name}</p>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </>
                        ) : (
                          <p className={style.searchResultLabel}>No results found</p>
                        )}
                      </div>
                    )}
                    {/* New Arrivals */}
                    {newArrivals.length > 0 && (
                      <div className={style.searchTag}>
                        <p className={style.searchTagLabel}>New Arrivals :</p>
                        <ul className={style.searchTagList}>
                          {newArrivals.map((item, idx) => (
                            <li key={`new-arrivals-${idx}`} className={style.searchTagItem}>
                              <Link
                                href={`/product/${item.slug}`}
                                className={style.searchTagLink}
                                onClick={() => setOpenSearch(false)}>
                                <span>{item.name}</span>
                                <SystemIcon name='arrow-up-right' />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Popular Products */}
                    {popularProducts.length > 0 && (
                      <div className={style.searchTag}>
                        <p className={style.searchTagLabel}>Popular Products :</p>
                        <ul className={style.searchTagList}>
                          {popularProducts.map((item, idx) => (
                            <li key={`popular-products-${idx}`} className={style.searchTagItem}>
                              <Link
                                href={`/product/${item.slug}`}
                                className={style.searchTagLink}
                                onClick={() => setOpenSearch(false)}>
                                <span>{item.name}</span>
                                <SystemIcon name='arrow-up-right' />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {/* Popular Brand */}
                    {popularBrands.length > 0 && (
                      <div className={style.searchTag}>
                        <p className={style.searchTagLabel}>Popular Brand :</p>
                        <ul className={style.searchTagList}>
                          {popularBrands.map((item, idx) => (
                            <li key={`popular-Brand-${idx}`} className={style.searchTagItem}>
                              <Link
                                href={`/product/${item.slug}`}
                                className={style.searchTagLink}
                                onClick={() => setOpenSearch(false)}>
                                <span>{item.name}</span>
                                <SystemIcon name='arrow-up-right' />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
