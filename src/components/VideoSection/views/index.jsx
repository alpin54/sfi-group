'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';

// styles
import style from '@components/VideoSection/styles/style.module.scss';
import 'swiper/css';
import 'swiper/css/navigation';

// elements
import Button from '@elements/Button/views';

const VideoSection = ({ data }) => {
  const players = useRef({});
  const activeOverlay = useRef({});
  const youtubePlayers = useRef({});
  const [activeIndex, setActiveIndex] = useState(0);

  const stopAllVideos = () => {
    Object.values(players.current).forEach((player) => {
      if (!player) return;

      if (player.tagName === 'VIDEO') {
        player.pause();
        player.currentTime = 0;
        player.muted = true;
      }
    });

    Object.values(youtubePlayers.current).forEach((yt) => {
      if (!yt) return;
      yt.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'stopVideo' }), '*');
    });

    Object.values(activeOverlay.current).forEach((overlay) => {
      if (!overlay) return;
      overlay.classList.remove(style.isPlaying);
    });
  };

  const handlePlay = (item) => {
    const { id } = item;
    const player = players.current[id];
    const overlay = activeOverlay.current[id];

    if (!player) return;

    // hide overlay — cara yang pakai class (lebih rapi)
    if (overlay) overlay.classList.add(style.isPlaying);

    if (item.type === 'file') {
      player.muted = false;
      player.play();
    }

    if (item.type === 'iframe') {
      player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
    }
  };

  const togglePlay = (player, overlay) => {
    if (!player) return;

    if (player.paused) {
      player.play();
      // overlay tetap hidden, tidak kita ubah lagi
    } else {
      player.pause();
      // overlay tidak dimunculkan lagi
    }
  };

  return (
    <section className={style.section}>
      <div className='container'>
        <div className={style.swiperWrapper}>
          <Swiper
            modules={[Navigation]}
            navigation={{
              prevEl: `.${style.videoPrev}`,
              nextEl: `.${style.videoNext}`
            }}
            loop={false}
            slidesPerView={1.2}
            centeredSlides
            spaceBetween={20}
            onSlideChange={(swiper) => {
              stopAllVideos();
              setActiveIndex(swiper.realIndex);
            }}
            className={style.slider}>
            {data?.map((item) => {
              const youtubeSrc =
                item.type === 'iframe'
                  ? `${item.video}?enablejsapi=1&controls=0&modestbranding=1&rel=0&loop=1&playlist=${item.video
                      .split('/')
                      .pop()}`
                  : item.video;

              return (
                <SwiperSlide key={item.id}>
                  <div className={style.wrapper}>
                    <div className={style.video}>
                      {item.type === 'file' ? (
                        <video
                          ref={(el) => (players.current[item.id] = el)}
                          muted
                          playsInline
                          loop
                          onClick={() => togglePlay(players.current[item.id], activeOverlay.current[item.id])}>
                          <source src={item.video} type='video/mp4' />
                        </video>
                      ) : (
                        <iframe
                          ref={(el) => ((players.current[item.id] = el), (youtubePlayers.current[item.id] = el))}
                          src={youtubeSrc}
                          title='YouTube Video'
                          frameBorder='0'
                          allow='autoplay; encrypted-media'
                          allowFullScreen
                        />
                      )}
                    </div>

                    <div className={style.overlay} ref={(el) => (activeOverlay.current[item.id] = el)}>
                      <h4 className={style.title}>{item.title}</h4>
                      <div className={style.btnVideo}>
                        <Button variant='transparent' icon='play' onClick={() => handlePlay(item)}>
                          Play
                        </Button>

                        <Button variant='transparent' href={item.learnMore}>
                          Learn more
                        </Button>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>

          <div className={style.videoPrev}></div>
          <div className={style.videoNext}></div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;
