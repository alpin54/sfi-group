'use client';

import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';

// styles
import 'swiper/css';
import 'swiper/css/navigation';
import style from '@components/VideoSection/styles/style.module.scss';

// elements
import Button from '@elements/Button/views';

const VideoSection = ({ data }) => {
  const players = useRef({});
  const activeOverlay = useRef({});
  const youtubePlayers = useRef({});
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [playingVideos, setPlayingVideos] = useState({});

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

    // Reset all playing states
    setPlayingVideos({});

    // Resume autoplay when all videos stopped
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const handlePlay = (item) => {
    const { id } = item;
    const player = players.current[id];
    const overlay = activeOverlay.current[id];

    if (!player) return;

    // Stop swiper autoplay when video is playing
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }

    // hide overlay
    if (overlay) overlay.classList.add(style.isPlaying);

    if (item.type === 'file') {
      player.muted = false;
      player.play();
      // Mark this video as playing to show controls
      setPlayingVideos((prev) => ({ ...prev, [id]: true }));
    }

    if (item.type === 'iframe') {
      player.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'playVideo' }), '*');
    }
  };

  const togglePlay = (player, overlay, videoId) => {
    if (!player) return;

    if (player.paused) {
      // Stop autoplay when playing video
      if (swiperRef.current?.autoplay) {
        swiperRef.current.autoplay.stop();
      }
      player.play();
      setPlayingVideos((prev) => ({ ...prev, [videoId]: true }));
    } else {
      player.pause();
      // Resume autoplay when video paused
      if (swiperRef.current?.autoplay) {
        swiperRef.current.autoplay.start();
      }
    }
  };

  const handleVideoPlay = (videoId) => {
    setPlayingVideos((prev) => ({ ...prev, [videoId]: true }));
    // Stop autoplay when video starts playing
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.stop();
    }
  };

  const handleVideoPause = () => {
    // Resume autoplay when video paused
    if (swiperRef.current?.autoplay) {
      swiperRef.current.autoplay.start();
    }
  };

  const isEnoughSlide = data.length >= 4;

  return (
    <section className={style.section}>
      <div className='container'>
        <div className={style.swiperWrapper}>
          <Swiper
            modules={[Navigation, Autoplay]}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            navigation={{
              prevEl: `.${style.videoPrev}`,
              nextEl: `.${style.videoNext}`
            }}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            loop={true}
            speed={1500}
            grabCursor={true}
            resistance={true}
            resistanceRatio={0.85}
            slidesPerView={isEnoughSlide ? 1.2 : 1}
            centeredSlides={isEnoughSlide}
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
                          controls={playingVideos[item.id] || false}
                          onPlay={() => handleVideoPlay(item.id)}
                          onPause={handleVideoPause}
                          onClick={() => togglePlay(players.current[item.id], activeOverlay.current[item.id], item.id)}>
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
                        <Button variant='transparent' rounded icon='play' onClick={() => handlePlay(item)}>
                          Play
                        </Button>

                        <Button variant='transparent' rounded href={item.learnMore}>
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
