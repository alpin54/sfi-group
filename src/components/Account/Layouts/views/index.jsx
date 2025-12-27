'use client';

// -- libaries
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// -- assets
import accountImage from '@assets/image/illustration/account.png';

// -- styles
import style from '@components/Account/Layouts/styles/style.module.scss';

// -- states
import useStateUser from '@components/Account/MyProfile/states';

// -- utils
import LocalStorage from '@utils/localStorage';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

// -- tabs
import tabs from '@components/Account/Layouts/data';

const LayoutsView = (props) => {
  const { children } = props;
  const { user } = useStateUser();
  const pathname = usePathname();
  const [userData, setUserData] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    const user = LocalStorage.get('user');
    if (user) {
      setUserData(user);
    }
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file');
        return;
      }

      // Validasi ukuran file (contoh: max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Buat preview URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Tentukan source image yang akan ditampilkan
  const getImageSrc = () => {
    if (previewImage) return previewImage;
    if (user?.avatar) return user.avatar;
    if (userData?.avatar) return userData.avatar;
    return accountImage.src;
  };

  const getImageAlt = () => {
    if (user?.name) return user.name;
    if (userData?.name) return userData.name;
    return 'Jhon Doe';
  };

  return (
    <div className={style.layout}>
      <div className='container'>
        <div className={style.header}>
          <div className={style.headerImage}>
            <Image src={getImageSrc()} alt={getImageAlt()} width={88} height={88} className={style.headerImageEl} />
          </div>
          <div className={style.headerText}>
            <h2 className={style.headerTitle}>{user?.name || userData?.name || 'Jhon Doe'}</h2>
            <button type='button' className={style.headerUpload}>
              <input
                type='file'
                name='image'
                accept='image/*'
                className={style.headerUploadInput}
                onChange={handleImageChange}
              />
              <SystemIcon name='cloud-arrow-up' />
              <span>Replace Image</span>
            </button>
          </div>
        </div>
        <div className={style.wrapp}>
          <aside className={style.sidebar}>
            <ul className={style.tablist}>
              {tabs.map((tab) => {
                const isActive = pathname === tab.href;
                return (
                  <li key={tab.key} className={`${style.tabitem} ${tab.key === 'logout' ? style.tabitemLogout : ''}`}>
                    {tab.href ? (
                      <Link
                        href={tab.href}
                        className={`${style.tabLink} ${isActive ? style.tabLinkActive : ''}`}
                        aria-current={isActive ? 'page' : undefined}>
                        <span className={style.icon}>
                          <SystemIcon name={tab.icon} />
                        </span>
                        <span className={style.label}>{tab.label}</span>
                      </Link>
                    ) : (
                      <button type='button' className={`${style.tabLink} ${isActive ? style.tabLinkActive : ''}`}>
                        <span className={style.icon}>
                          <SystemIcon name={tab.icon} />
                        </span>
                        <span className={style.label}>{tab.label}</span>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </aside>
          <main className={style.main}>
            <div className={style.content}>{children}</div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default LayoutsView;
