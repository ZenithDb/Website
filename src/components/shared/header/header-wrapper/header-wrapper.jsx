'use client';

import clsx from 'clsx';
import PropTypes from 'prop-types';
import { useEffect, useRef, useState } from 'react';

const themes = {
  light: 'bg-white',
  dark: 'bg-black-pure',
  default: 'bg-white dark:bg-black-pure',
};

const HeaderWrapper = ({
  className = null,
  children,
  isSticky = false,
  isStickyOverlay = false,
  theme = null,
  withBorder = false,
}) => {
  const headerRef = useRef(null);
  const [isStickied, setIsStickied] = useState(false);
  const bg = themes?.[theme] || themes.default;

  const handleScroll = () => {
    if (headerRef.current) {
      setIsStickied(headerRef.current.offsetTop > 0);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        'left-0 right-0 top-0 z-40 w-full lg:relative lg:h-16',
        isSticky ? 'sticky transition-[padding,background-color] duration-200' : 'absolute',
        isStickyOverlay ? '-mb-16' : bg,
        isSticky && isStickied ? `py-[13px] ${bg}` : 'py-4',
        withBorder && 'border-b border-gray-new-94 dark:border-gray-new-10',
        className
      )}
      ref={headerRef}
    >
      {children}
    </header>
  );
};

HeaderWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  theme: PropTypes.oneOf(['light', 'dark']),
  className: PropTypes.string,
  isSticky: PropTypes.bool,
  isStickyOverlay: PropTypes.bool,
  withBorder: PropTypes.bool,
};

export default HeaderWrapper;
