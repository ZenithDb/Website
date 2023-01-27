import clsx from 'clsx';
import PropTypes from 'prop-types';
import React from 'react';

import useLottie from 'hooks/use-lottie';

import animationData from './data/saas-illustration-lottie-data.json';

const SaasIllustration = ({ isInView }) => {
  const { animationRef, isAnimationReady } = useLottie({
    lottieOptions: {
      animationData,
    },
    isInView,
  });

  return (
    <div
      className={clsx(
        'absolute top-0 right-0 w-full opacity-0 transition-opacity duration-500 ease-linear',
        isAnimationReady && 'opacity-100'
      )}
      ref={animationRef}
    />
  );
};

SaasIllustration.propTypes = {
  isInView: PropTypes.bool.isRequired,
};

export default SaasIllustration;
