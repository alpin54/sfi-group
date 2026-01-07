// -- libraries
import { useRef, useEffect } from 'react';
import Image from 'next/image';

// -- styles
import style from '@elements/UploadFile/styles/style.module.scss';

// -- elements
import SystemIcon from '@elements/SystemIcon/views';

const UploadFile = ({ value = null, accept = 'image/*', placeholderLabel = 'Photo', onChange, ariaLabel }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    return () => {
      if (value && value.previewUrl) {
        try {
          URL.revokeObjectURL(value.previewUrl);
        } catch (e) {}
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value && value.previewUrl]);

  const handleClick = () => {
    if (inputRef.current) inputRef.current.click();
  };

  const handleFile = (e) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const type = file.type.startsWith('video') ? 'video' : 'image';
    const previewUrl = type === 'image' ? URL.createObjectURL(file) : '';
    const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const fileObj = { id, file, previewUrl, type };
    if (typeof onChange === 'function') onChange(fileObj);
    e.target.value = '';
  };

  const handleRemove = (e) => {
    e.stopPropagation();
    if (value && value.previewUrl) {
      try {
        URL.revokeObjectURL(value.previewUrl);
      } catch (err) {}
    }
    if (typeof onChange === 'function') onChange(null);
  };

  return (
    <div className={style.upload}>
      <input
        ref={inputRef}
        type='file'
        accept={accept}
        onChange={handleFile}
        style={{ display: 'none' }}
        aria-label={ariaLabel || 'Upload file'}
      />
      <button
        type='button'
        className={`${style.uploadButton} ${value ? style.filled : ''}`}
        onClick={handleClick}
        aria-pressed={!!value}
        aria-label={ariaLabel || placeholderLabel}>
        <div className={style.uploadInner}>
          {value ? (
            value.type === 'image' && value.previewUrl ? (
              <Image
                src={value.previewUrl}
                alt={value.file.name || 'preview'}
                className={style.previewImg}
                width={88}
                height={88}
              />
            ) : (
              <div className={style.uploadPlaceholder}>
                <SystemIcon name='video-camera' />
                <span className={style.filename}>{value.file.name}</span>
              </div>
            )
          ) : (
            <div className={style.uploadPlaceholder}>
              <SystemIcon name={accept.includes('video') && !accept.includes('image') ? 'video-camera' : 'image'} />
              <span>{placeholderLabel}</span>
            </div>
          )}
        </div>

        {value && (
          <button type='button' className={style.removeBtn} aria-label='Remove file' onClick={handleRemove}>
            <SystemIcon name='edit' />
          </button>
        )}
      </button>
    </div>
  );
};

export default UploadFile;
