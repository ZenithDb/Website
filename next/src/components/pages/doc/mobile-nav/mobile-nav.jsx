'use client';

import clsx from 'clsx';
import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect, useRef, useState } from 'react';
import { useWindowSize } from 'react-use';

import Item from 'components/pages/doc/sidebar/item';
import useBodyLockScroll from 'hooks/use-body-lock-scroll';
import useClickOutside from 'hooks/use-click-outside';
import ChevronRight from 'icons/chevron-right.inline.svg';

const ANIMATION_DURATION = 0.2;

const variants = {
  from: {
    opacity: 0,
    translateY: 10,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  to: {
    zIndex: 20,
    opacity: 1,
    translateY: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const MobileNav = ({ className = null, sidebar, currentSlug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [containerHeight, setContainerHeight] = useState(null);
  const { height } = useWindowSize();
  const wrapperRef = useRef(null);
  const controls = useAnimation();
  const toggleMenu = () => setIsOpen((isOpen) => !isOpen);
  useBodyLockScroll(isOpen);

  const onOutsideClick = () => {
    setIsOpen(false);
  };

  useClickOutside([wrapperRef], onOutsideClick);

  // 146px is the height of top banner + header + button Documentation menu
  useEffect(() => {
    setContainerHeight(`${height - 146}px`);
  }, [height]);

  useEffect(() => {
    if (isOpen) {
      controls.start('to');
    } else {
      controls.start('from');
    }
  }, [controls, isOpen]);
  return (
    <nav
      className={clsx(
        'safe-paddings relative border-b border-gray-7 bg-gray-9 dark:border-gray-2 dark:bg-gray-1',
        className
      )}
      ref={wrapperRef}
    >
      <button
        className="relative z-10 flex w-full cursor-pointer appearance-none justify-start text-ellipsis bg-gray-9 py-2.5 outline-none transition-colors duration-200 hover:bg-gray-8 active:bg-gray-8 dark:bg-gray-1 dark:hover:bg-[rgba(64,64,64,0.6)] dark:active:bg-[rgba(64,64,64,0.6)] lg:px-8 md:px-4"
        type="button"
        onClick={toggleMenu}
      >
        <span>Documentation menu</span>
        <ChevronRight
          className="absolute right-[37px] top-1/2 -translate-y-1/2 rotate-90 md:right-5"
          aria-hidden
        />
      </button>

      <motion.ul
        className={clsx(
          'fixed inset-x-0 top-[146px] bottom-0 z-20 overflow-y-scroll bg-white pl-8 pr-[29px] pt-2 pb-4 dark:bg-gray-1 md:pl-4 md:pr-[13px]'
        )}
        initial="from"
        animate={controls}
        variants={variants}
        style={{ maxHeight: containerHeight }}
      >
        {sidebar.map((item, index) => (
          <Item {...item} currentSlug={currentSlug} key={index} />
        ))}
      </motion.ul>
    </nav>
  );
};

MobileNav.propTypes = {
  className: PropTypes.string,
  sidebar: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      isStandalone: PropTypes.bool,
      slug: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.exact({
          title: PropTypes.string.isRequired,
          slug: PropTypes.string,
          items: PropTypes.arrayOf(
            PropTypes.exact({
              title: PropTypes.string.isRequired,
              slug: PropTypes.string,
              items: PropTypes.arrayOf(
                PropTypes.exact({
                  title: PropTypes.string,
                  slug: PropTypes.string,
                })
              ),
            })
          ),
        })
      ),
    })
  ).isRequired,
  currentSlug: PropTypes.string.isRequired,
};

export default MobileNav;
