import { startTransition, useEffect, useEffectEvent, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import {
  fallbackProjects,
  fallbackProjectSliderSettings,
} from '../lib/defaultProjects';
import { getProjectFallbackImage } from '../lib/projectImage';
import { getProjectSliderSettings, listProjects } from '../lib/projectsApi';
import { siteConfig } from '../lib/siteConfig';

const DRAG_THRESHOLD_PX = 72;
const DRAG_VELOCITY_THRESHOLD = 520;
const DRAG_INTENT_THRESHOLD = 8;

const getCircularDistance = (index, activeIndex, projectCount) => {
  const forwardDistance = (index - activeIndex + projectCount) % projectCount;
  const backwardDistance = (activeIndex - index + projectCount) % projectCount;
  return forwardDistance <= backwardDistance ? forwardDistance : -backwardDistance;
};

const getCarouselMetrics = (viewportWidth) => {
  if (viewportWidth < 640) {
    const cardWidth = Math.min(Math.max(viewportWidth - 52, 248), 320);

    return {
      cardWidth,
      sideOffset: Math.round(cardWidth * 0.76),
      farOffset: Math.round(cardWidth * 1.08),
      sideY: 82,
      farY: 118,
      sideScale: 0.74,
      farScale: 0.6,
      stageHeight: 610,
    };
  }

  if (viewportWidth < 1024) {
    return {
      cardWidth: 340,
      sideOffset: 320,
      farOffset: 500,
      sideY: 54,
      farY: 92,
      sideScale: 0.8,
      farScale: 0.66,
      stageHeight: 640,
    };
  }

  return {
    cardWidth: 380,
    sideOffset: 430,
    farOffset: 650,
    sideY: 38,
    farY: 72,
    sideScale: 0.84,
    farScale: 0.68,
    stageHeight: 650,
  };
};

const getCardMotion = (distance, carouselMetrics) => {
  if (distance === 0) {
    return {
      x: 0,
      y: 0,
      scale: 1,
      opacity: 1,
      rotateY: 0,
      zIndex: 30,
      filter: 'blur(0px)',
    };
  }

  if (distance === -1) {
    return {
      x: -carouselMetrics.sideOffset,
      y: carouselMetrics.sideY,
      scale: carouselMetrics.sideScale,
      opacity: 0.58,
      rotateY: 16,
      zIndex: 20,
      filter: 'blur(0.4px)',
    };
  }

  if (distance === 1) {
    return {
      x: carouselMetrics.sideOffset,
      y: carouselMetrics.sideY,
      scale: carouselMetrics.sideScale,
      opacity: 0.58,
      rotateY: -16,
      zIndex: 20,
      filter: 'blur(0.4px)',
    };
  }

  return {
    x: distance < 0 ? -carouselMetrics.farOffset : carouselMetrics.farOffset,
    y: carouselMetrics.farY,
    scale: carouselMetrics.farScale,
    opacity: 0,
    rotateY: distance < 0 ? 24 : -24,
    zIndex: 10,
    filter: 'blur(2px)',
  };
};

const Portfolio = () => {
  const dragMovedRef = useRef(false);
  const [projects, setProjects] = useState(fallbackProjects);
  const [sliderSettings, setSliderSettings] = useState(fallbackProjectSliderSettings);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(() =>
    typeof window === 'undefined' ? 1280 : window.innerWidth,
  );

  useEffect(() => {
    let isMounted = true;

    const loadPortfolioContent = async () => {
      const [projectsResult, settingsResult] = await Promise.allSettled([
        listProjects(),
        getProjectSliderSettings(),
      ]);

      if (!isMounted) {
        return;
      }

      startTransition(() => {
        if (projectsResult.status === 'fulfilled' && projectsResult.value.length) {
          setProjects(projectsResult.value);
          setActiveIndex(0);
        }

        if (settingsResult.status === 'fulfilled') {
          setSliderSettings({
            autoplayDelayMs:
              settingsResult.value.autoplayDelayMs || fallbackProjectSliderSettings.autoplayDelayMs,
            pauseOnHover:
              typeof settingsResult.value.pauseOnHover === 'boolean'
                ? settingsResult.value.pauseOnHover
                : fallbackProjectSliderSettings.pauseOnHover,
          });
        }
      });

      if (projectsResult.status === 'rejected') {
        console.error('Failed to load projects:', projectsResult.reason);
      }

      if (settingsResult.status === 'rejected') {
        console.error('Failed to load project slider settings:', settingsResult.reason);
      }
    };

    void loadPortfolioContent();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const syncViewportWidth = () => {
      setViewportWidth(window.innerWidth);
    };

    syncViewportWidth();
    window.addEventListener('resize', syncViewportWidth);

    return () => {
      window.removeEventListener('resize', syncViewportWidth);
    };
  }, []);

  useEffect(() => {
    if (!sliderSettings.pauseOnHover) {
      setIsPaused(false);
    }
  }, [sliderSettings.pauseOnHover]);

  const advanceSlide = useEffectEvent(() => {
    if (projects.length < 2) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length);
  });

  useEffect(() => {
    if (isPaused || isDragging || projects.length < 2) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      advanceSlide();
    }, sliderSettings.autoplayDelayMs || fallbackProjectSliderSettings.autoplayDelayMs);

    return () => {
      window.clearInterval(timer);
    };
  }, [
    advanceSlide,
    isDragging,
    isPaused,
    projects.length,
    sliderSettings.autoplayDelayMs,
  ]);

  const moveNext = () => {
    if (projects.length < 2) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex + 1) % projects.length);
  };

  const movePrevious = () => {
    if (projects.length < 2) {
      return;
    }

    setActiveIndex((currentIndex) => (currentIndex - 1 + projects.length) % projects.length);
  };

  const goToProject = (index) => {
    setActiveIndex(index);
  };

  const handleMouseEnter = () => {
    if (sliderSettings.pauseOnHover) {
      setIsPaused(true);
    }
  };

  const handleMouseLeave = () => {
    if (sliderSettings.pauseOnHover) {
      setIsPaused(false);
    }
  };

  const handleDragStart = () => {
    dragMovedRef.current = false;
    setIsDragging(true);
  };

  const handleDrag = (_event, info) => {
    if (Math.abs(info.offset.x) > DRAG_INTENT_THRESHOLD) {
      dragMovedRef.current = true;
    }
  };

  const handleDragEnd = (_event, info) => {
    const shouldMoveNext =
      info.offset.x <= -DRAG_THRESHOLD_PX || info.velocity.x <= -DRAG_VELOCITY_THRESHOLD;
    const shouldMovePrevious =
      info.offset.x >= DRAG_THRESHOLD_PX || info.velocity.x >= DRAG_VELOCITY_THRESHOLD;

    if (shouldMoveNext) {
      moveNext();
    } else if (shouldMovePrevious) {
      movePrevious();
    }

    setIsDragging(false);

    window.setTimeout(() => {
      dragMovedRef.current = false;
    }, 0);
  };

  const handleCardClick = (index, isActiveCard) => {
    if (dragMovedRef.current || isDragging || isActiveCard) {
      return;
    }

    goToProject(index);
  };

  const handleCardLinkClick = (event) => {
    if (dragMovedRef.current || isDragging) {
      event.preventDefault();
    }

    event.stopPropagation();
  };

  const carouselMetrics = getCarouselMetrics(viewportWidth);

  return (
    <section id="portfolio" className="px-4 py-20" aria-labelledby="portfolio-heading">
      <div className="mx-auto max-w-7xl">
        <motion.h2
          id="portfolio-heading"
          className="mb-16 text-center text-4xl font-bold gradient-text md:text-5xl"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Featured Projects
        </motion.h2>

        <motion.div
          className="relative overflow-hidden rounded-[36px] border border-vtc-border bg-vtc-card/40 px-4 py-8 shadow-glow backdrop-blur-xl md:px-8 md:py-10"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            className="pointer-events-none absolute left-1/2 top-16 h-44 w-44 -translate-x-1/2 rounded-full bg-vtc-indigo/30 blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.4, 0.9, 0.4],
            }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="mb-8 flex flex-col items-center text-center">
            <p className="text-sm uppercase tracking-[0.35em] text-vtc-muted">Live portfolio feed</p>
            <p className="mt-3 max-w-2xl text-vtc-muted">
              {siteConfig.portfolioSummary} Swipe or drag the cards left and right to browse the
              current showcase.
            </p>
          </div>

          <motion.div
            className="relative cursor-grab select-none active:cursor-grabbing"
            style={{ height: `${carouselMetrics.stageHeight}px`, touchAction: 'pan-y' }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            dragMomentum={false}
            onDragStart={handleDragStart}
            onDrag={handleDrag}
            onDragEnd={handleDragEnd}
          >
            {projects.map((project, index) => {
              const distance = getCircularDistance(index, activeIndex, projects.length);
              const cardMotion = getCardMotion(distance, carouselMetrics);
              const isActiveCard = distance === 0;
              const isSideCard = Math.abs(distance) === 1;
              const cardWidth = `${carouselMetrics.cardWidth}px`;

              return (
                <div
                  key={project.id}
                  className="pointer-events-none absolute inset-0 flex items-start justify-center px-1 sm:px-4"
                >
                  <motion.article
                    className={`relative overflow-hidden rounded-[32px] border border-vtc-border bg-vtc-bg/88 shadow-glow backdrop-blur-xl ${
                      isActiveCard || isSideCard ? 'pointer-events-auto' : 'pointer-events-none'
                    }`}
                    style={{
                      width: cardWidth,
                      maxWidth: '100%',
                      transformStyle: 'preserve-3d',
                    }}
                    initial={false}
                    animate={cardMotion}
                    transition={{ type: 'spring', stiffness: 160, damping: 24 }}
                    onClick={() => handleCardClick(index, isActiveCard)}
                  >
                    <div className="relative h-56 overflow-hidden border-b border-vtc-border sm:h-72">
                      <motion.img
                        src={project.thumbnailUrl}
                        alt={`${project.title} website project by ${siteConfig.name}`}
                        className="h-full w-full object-cover"
                        draggable={false}
                        loading={isActiveCard ? 'eager' : 'lazy'}
                        decoding="async"
                        whileHover={isActiveCard ? { scale: 1.08 } : undefined}
                        transition={{ duration: 0.45 }}
                        onError={(event) => {
                          event.currentTarget.src = getProjectFallbackImage(project.title);
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-vtc-bg via-vtc-bg/5 to-transparent" />
                      {!isActiveCard && (
                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-vtc-bg/90 via-vtc-bg/55 to-vtc-bg/15" />
                      )}
                      <div className="absolute bottom-4 left-4 flex items-center gap-2">
                        <span className="rounded-full border border-white/15 bg-black/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-vtc-text">
                          {isActiveCard ? 'Now showing' : distance < 0 ? 'Previous' : 'Next'}
                        </span>
                      </div>
                    </div>

                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-bold text-vtc-text">{project.title}</h3>
                          <p className="mt-3 text-sm leading-6 text-vtc-muted">{project.description}</p>
                        </div>
                      </div>

                      <div className="mb-6 flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <motion.span
                            key={`${project.id}-${tech}`}
                            className="rounded-full border border-vtc-border bg-vtc-card/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-vtc-text"
                            whileHover={isActiveCard ? { scale: 1.06, y: -2 } : undefined}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {project.liveUrl && (
                          <motion.a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-vtc-border bg-vtc-card/80 px-4 py-2 text-sm font-semibold text-vtc-indigo"
                            whileHover={isActiveCard ? { scale: 1.04, x: 3 } : undefined}
                            onClick={handleCardLinkClick}
                          >
                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                            Live
                          </motion.a>
                        )}
                        {project.githubUrl && (
                          <motion.a
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full border border-vtc-border bg-vtc-card/80 px-4 py-2 text-sm font-semibold text-vtc-text"
                            whileHover={isActiveCard ? { scale: 1.04, x: 3 } : undefined}
                            onClick={handleCardLinkClick}
                          >
                            <FontAwesomeIcon icon={faGithub} />
                            Code
                          </motion.a>
                        )}
                      </div>
                    </div>
                  </motion.article>
                </div>
              );
            })}
          </motion.div>

          <div className="mt-6 flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={movePrevious}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-vtc-border bg-vtc-bg/80 text-vtc-text transition hover:border-vtc-indigo hover:text-vtc-indigo"
                aria-label="Previous project"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                onClick={moveNext}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-vtc-border bg-vtc-bg/80 text-vtc-text transition hover:border-vtc-indigo hover:text-vtc-indigo"
                aria-label="Next project"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {projects.map((project, index) => (
                <button
                  key={project.id}
                  type="button"
                  onClick={() => goToProject(index)}
                  className={`h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'w-12 bg-gradient-to-r from-vtc-indigo to-vtc-violet'
                      : 'w-3 bg-vtc-border hover:bg-vtc-muted'
                  }`}
                  aria-label={`Show ${project.title}`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Portfolio;
