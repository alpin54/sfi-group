'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// icons & assets
import SystemIcon from '@components/Elements/SystemIcon/views';
import ShopeImg from '@assets/image/logo/shopee.svg';
import TokopediaImg from '@assets/image/logo/tokopedia.svg';
import Youtube from '@assets/image/logo/youtube.svg';
import Facebook from '@assets/image/logo/facebook.svg';
import Instagram from '@assets/image/logo/instagram.svg';
import Xlogo from '@assets/image/logo/x-logo.svg';
import LogoId from '@assets/image/logo/logo-id.svg';
import LogoEn from '@assets/image/logo/logo-en.svg';

import style from '@components/Footer/styles/style.module.scss';

const Footer = ({ data }) => {
  const menu = data?.menu || [];
  const footerRef = useRef(null);
  const BREAKPOINT = 992;

  // accordion open/close state
  const [openIndex, setOpenIndex] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const updateMode = () => setIsMobile(window.innerWidth < BREAKPOINT);
    updateMode();
    window.addEventListener('resize', updateMode);
    return () => window.removeEventListener('resize', updateMode);
  }, []);

  // memberikan padding-bottom pada .main-site agar footer tidak menutup konten
  useEffect(() => {
    const main = document.querySelector('.main-site');
    const setMainPadding = () => {
      if (!main || !footerRef.current) return;
      if (window.innerWidth >= BREAKPOINT) {
        main.style.paddingBottom = `${footerRef.current.offsetHeight}px`;
      } else {
        main.style.paddingBottom = '';
      }
    };
    setMainPadding();
    window.addEventListener('resize', setMainPadding);
    return () => window.removeEventListener('resize', setMainPadding);
  }, []);

  // ROW grouping
  const row1 = menu.filter((_, i) => i === 0);
  const row2 = menu.filter((_, i) => i === 1 || i === 2);
  const row3 = menu.filter((_, i) => i === 3 || i === 4);

  const row4 = menu.filter((item) => item.type === 'contact' || item.type === 'social' || item.type === 'marketplace');

  // ACCORDION toggle
  const toggleAccordion = (index) => {
    if (!isMobile) return; // desktop no accordion
    setOpenIndex(openIndex === index ? null : index);
  };

  // helper social icon
  const getSocialIcon = (name) => {
    switch (name.toLowerCase()) {
      case 'youtube':
        return Youtube;
      case 'facebook':
        return Facebook;
      case 'instagram':
        return Instagram;
      case 'twitter':
      case 'tiktok':
        return Xlogo;
      default:
        return '';
    }
  };

  // ========= BLOCK RENDER: MENU=========
  const MenuBlock = ({ block, idx }) => {
    const isOpen = openIndex === idx;
    const contentRef = useRef(null);
    const [maxH, setMaxH] = useState('0px');

    useEffect(() => {
      // recalc height saat open/close atau saat konten berubah
      const el = contentRef.current;
      if (!el) return;
      // small timeout help when fonts/images load (optional)
      const update = () => {
        if (isOpen) {
          setMaxH(`${el.scrollHeight}px`);
        } else {
          setMaxH('0px');
        }
      };
      update();

      // jika ada resize, recalc ketika open
      const ro = new ResizeObserver(() => {
        if (isOpen && el) {
          setMaxH(`${el.scrollHeight}px`);
        }
      });
      ro.observe(el);

      return () => ro.disconnect();
    }, [isOpen, block.links]);

    return (
      <div className={`${style.menuBlock} ${isOpen ? style.open : ''}`} key={idx}>
        <h6
          className={style.menuTitle}
          onClick={() => toggleAccordion(idx)}
          role='button'
          aria-expanded={isOpen}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') toggleAccordion(idx);
          }}>
          {block.title}
        </h6>

        <ul
          ref={contentRef}
          className={style.menuList}
          style={{
            maxHeight: isMobile ? maxH : 'none',
            overflow: isMobile ? 'hidden' : 'visible',
            transition: isMobile ? 'max-height 0.32s ease' : 'none'
          }}>
          {block.links?.map((item, i) => (
            <li className={style.menuItem} key={item?.url ?? `${i}-${item?.name}`}>
              <Link href={item?.url ?? '#'} className={style.menuLink}>
                {item?.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  // ========= BLOCK: CONTACT =========
  const ContactBlock = ({ block }) => (
    <div className={style.contactBlock}>
      <h6 className={style.menuTitleContact}>{block.title}</h6>

      {block.links?.map((item, i) => (
        <div key={i} className={style.contactItem}>
          <SystemIcon name={item.icon} size={20} className={style.contactIcon} />
          <Link href={item.url} className={style.contactLink}>
            {item.name}
          </Link>
        </div>
      ))}
    </div>
  );

  // ========= BLOCK: SOCIAL =========
  const SocialBlock = ({ block }) => (
    <div className={style.socialBlock}>
      <h6 className={style.menuTitleSocial}>{block.title}</h6>

      <div className={style.socialIcons}>
        {block.links?.map((item, i) => (
          <Link key={i} href={item.url} target='_blank' className={style.socialLink}>
            <Image
              src={getSocialIcon(item.name)}
              width={20}
              height={20}
              alt={item.name}
              className={style.socialImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );

  // ========= BLOCK: MARKETPLACE =========
  const MarketplaceBlock = ({ block }) => (
    <div className={style.marketplaceBlock}>
      <h6 className={style.menuTitleMarket}>{block.title}</h6>

      <div className={style.marketplaceIcons}>
        {block.links?.map((item, i) => (
          <Link key={i} href={item.url} target='_blank' className={style.marketplaceLink}>
            <Image
              src={item.name === 'Shopee' ? ShopeImg : TokopediaImg}
              width={85}
              height={20}
              alt={item.name}
              className={style.marketplaceImage}
            />
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <section className={style.footerSection} ref={footerRef}>
      <div className='container'>
        <div className={style.footerGrid}>
          <div className={style.menuGroup}>
            {row1.map((block, idx) => (
              <MenuBlock block={block} idx={idx} key={idx} />
            ))}
          </div>

          <div className={style.rowTwo}>
            {row2.map((block, idx) => (
              <MenuBlock block={block} idx={idx + 10} key={idx} />
            ))}
          </div>

          <div className={style.rowThree}>
            {row3.map((block, idx) => (
              <MenuBlock block={block} idx={idx + 20} key={idx} />
            ))}
          </div>

          <div className={style.footerExtra}>
            {row4.map((block, idx) => {
              if (block.type === 'contact') return <ContactBlock key={idx} block={block} />;
              if (block.type === 'social') return <SocialBlock key={idx} block={block} />;
              if (block.type === 'marketplace') return <MarketplaceBlock key={idx} block={block} />;
            })}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className={style.bottomFooter}>
          <p className={style.copyright}>{data?.copyright}</p>

          <div className={style.language}>
            {/* EN */}
            <button className={style.languageBtn}>
              <Image src={LogoEn} width={24} height={24} alt='EN' className={style.languageIcon} />
              <span>EN</span>
            </button>

            {/* ID */}
            <button className={style.languageBtn}>
              <Image src={LogoId} width={24} height={24} alt='ID' className={style.languageIcon} />
              <span>ID</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
