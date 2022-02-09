import { motion } from 'framer-motion';
import { StaticImage } from 'gatsby-plugin-image';
import React, { useRef } from 'react';
import { useInView } from 'react-intersection-observer';

import BlinkingText from 'components/shared/blinking-text';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import useLottie from 'hooks/use-lottie';

import costEfficientAnimationData from './data/advantages-cost-efficient-lottie-data.json';
import easyToUseAnimationData from './data/advantages-easy-to-use-lottie-data.json';
import scalableAnimationData from './data/advantages-scalable-lottie-data.json';
import PlayIcon from './images/advantages-play.inline.svg';

const Advantages = () => {
  const [videoWrapperRef, isVideoWrapperInView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const [contentRef, isContentInView] = useInView({ triggerOnce: true, threshold: 0.5 });
  const titleRef = useRef();

  const {
    animationVisibilityRef: scalableAnimationVisibilityRef,
    animationRef: scalableAnimationRef,
  } = useLottie({
    lottieOptions: {
      animationData: scalableAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationVisibilityRef: costEfficientAnimationVisibilityRef,
    animationRef: costEfficientAnimationRef,
  } = useLottie({
    lottieOptions: {
      animationData: costEfficientAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationVisibilityRef: easyToUseAnimationVisibilityRef,
    animationRef: easyToUseAnimationRef,
  } = useLottie({
    lottieOptions: {
      animationData: easyToUseAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const items = [
    {
      animationVisibilityRef: scalableAnimationVisibilityRef,
      animationRef: scalableAnimationRef,
      title: 'Scalable',
      description:
        'Separation of storage and compute. allows Zenith reconfigure amount of the compute power on the fly.',
    },
    {
      animationVisibilityRef: costEfficientAnimationVisibilityRef,
      animationRef: costEfficientAnimationRef,
      title: 'Cost Efficient',
      description:
        'Being serverless allows using of resources on-demand, which significantly cuts the costs.',
    },
    {
      animationVisibilityRef: easyToUseAnimationVisibilityRef,
      animationRef: easyToUseAnimationRef,
      title: 'Easy to Use',
      description:
        'No complex onboarding needed. Use a single CLI command to create a new Zenith database.',
    },
  ];

  return (
    <section
      id="advantages"
      className="safe-paddings bg-black py-80 3xl:py-72 2xl:py-64 xl:py-52 lg:py-40 md:py-24"
    >
      <Container className="z-20" size="md">
        <div className="flex items-center space-x-[100px] 3xl:space-x-[76px] 2xl:space-x-[64px] xl:space-x-[50px] lg:flex-col lg:items-start lg:space-x-0">
          <div
            id="advantages-video-wrapper"
            className="relative max-w-[800px] overflow-hidden rounded-md 3xl:max-w-[680px] 2xl:max-w-[560px] xl:max-w-[510px] lg:mt-10 lg:max-w-full"
            ref={videoWrapperRef}
          >
            <motion.div
              initial={{ scale: 0.75, opacity: 0 }}
              animate={isVideoWrapperInView && { scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <StaticImage
                className="rounded"
                src="../advantages/images/advantages-cover.jpg"
                alt=""
                aria-hidden
              />
            </motion.div>
            <button
              className="group absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
              type="button"
              style={{ boxShadow: '0px 10px 20px rgba(26, 26, 26, 0.4)' }}
            >
              <PlayIcon className="relative h-24 rounded-full transition-transform duration-200 group-hover:scale-[1.1] 3xl:h-[82px] 2xl:h-[68px] xl:h-[62px] lg:h-[86px] md:h-12" />
            </button>
          </div>
          <div className="lg:order-first" ref={contentRef}>
            <Heading
              id="advantages-title"
              className="max-w-[490px] 2xl:max-w-[385px] xl:max-w-[300px] lg:max-w-[500px]"
              tag="h2"
              size="lg"
              theme="white"
              ref={titleRef}
            >
              <BlinkingText
                text="Distributed Database, Made Simple"
                parentElement={titleRef.current}
                shouldAnimationStart={isContentInView}
              />
            </Heading>
            <p
              id="advantages-description"
              className="t-xl mt-5 max-w-[600px] text-white 2xl:mt-4 2xl:max-w-[520px] lg:max-w-full"
            >
              Go through our 5 minutes tutorials video and start using scalable, cost efficient
              database architecture for your project.
            </p>
          </div>
        </div>
        <ul className="grid-gap-x mt-40 grid grid-cols-12 3xl:mt-36 2xl:mt-32 xl:mt-24 lg:mt-20 lg:gap-y-16 md:grid-cols-1">
          {items.map(({ animationVisibilityRef, animationRef, title, description }, index) => (
            <li
              className="col-span-4 max-w-[410px] 3xl:max-w-[340px] 2xl:max-w-[312px] xl:max-w-[260px] lg:col-span-6 lg:max-w-[300px] md:max-w-none"
              key={index}
              ref={animationVisibilityRef}
            >
              <div
                id={`advantages-item-${index + 1}-icon`}
                className="h-24 w-24 2xl:h-20 2xl:w-20 xl:h-[72px] xl:w-[72px] lg:h-16 lg:w-16"
                ref={animationRef}
                aria-hidden
              />
              <Heading
                id={`advantages-item-${index + 1}-title`}
                className="mt-6 xl:mt-5"
                tag="h3"
                size="sm"
                theme="white"
              >
                {title}
              </Heading>
              <p
                id={`advantages-item-${index + 1}-description`}
                className="t-xl mt-4 text-white xl:mt-3.5"
              >
                {description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
};

export default Advantages;
