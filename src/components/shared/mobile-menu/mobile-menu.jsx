import { motion, useAnimation } from 'framer-motion';
import PropTypes from 'prop-types';
import React, { useEffect } from 'react';

import Button from 'components/shared/button';
import Link from 'components/shared/link';

const ANIMATION_DURATION = 0.2;

const variants = {
  from: {
    opacity: 0,
    translateY: 30,
    transition: {
      duration: ANIMATION_DURATION,
    },
    transitionEnd: {
      zIndex: -1,
    },
  },
  to: {
    zIndex: 999,
    opacity: 1,
    translateY: 0,
    transition: {
      duration: ANIMATION_DURATION,
    },
  },
};

const links = [
  {
    text: 'Pricing',
    to: '/',
  },
  {
    text: 'Pricing',
    to: '/',
  },
  {
    text: 'Team',
    to: '/team',
  },
  {
    text: 'Changelog',
    to: '/',
  },
  {
    text: 'Docs',
    to: '/',
  },
  {
    text: 'Jobs',
    to: '/jobs',
  },
];

const MobileMenu = ({ isOpen }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (isOpen) {
      controls.start('to');
    } else {
      controls.start('from');
    }
  }, [isOpen, controls]);

  return (
    <motion.nav
      className="absolute top-20 right-8 left-8 z-[-1] hidden rounded-md bg-white px-8 pt-4 pb-7 lg:block md:right-4 md:left-4"
      initial="from"
      animate={controls}
      variants={variants}
      style={{ boxShadow: '0px 10px 20px rgba(26, 26, 26, 0.4)' }}
    >
      <ul className="flex flex-col text-center">
        {links.map(({ text, to }, index) => (
          <li key={index}>
            <Link className="block py-4" to={to} size="sm" theme="black">
              {text}
            </Link>
          </li>
        ))}
      </ul>
      <Button className="mt-4 w-full" to="/" size="sm" theme="secondary">
        Sign Up
      </Button>
    </motion.nav>
  );
};

MobileMenu.propTypes = {
  isOpen: PropTypes.bool,
};

MobileMenu.defaultProps = {
  isOpen: false,
};

export default MobileMenu;
