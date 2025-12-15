let callbacks = [];
let didScroll = false;
let intervalId = null;
let scrollHandler = null;

const handleScrollTop = () => window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

const handleScroll = (callback) => {
  if (typeof callback === 'function') callbacks.push(callback);

  // Register global scroll event only once
  if (!intervalId) {
    scrollHandler = () => {
      didScroll = true;
    };
    window.addEventListener('scroll', scrollHandler);

    intervalId = setInterval(() => {
      if (didScroll) {
        callbacks.forEach((cb) => {
          if (typeof cb === 'function') cb();
        });
        didScroll = false;
      }
    }, 200);
  }
};

const run = (callback) => {
  handleScroll(callback);
};

const remove = (callback) => {
  callbacks = callbacks.filter((cb) => cb !== callback);

  // Clean up event listener and interval if no callbacks left
  if (callbacks.length === 0) {
    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
      scrollHandler = null;
    }
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }
};

const windowScroll = {
  run,
  top: handleScrollTop,
  remove
};

export default windowScroll;
