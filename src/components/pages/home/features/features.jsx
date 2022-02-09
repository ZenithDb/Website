import clsx from 'clsx';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import BlinkingText from 'components/shared/blinking-text';
import Container from 'components/shared/container';
import Heading from 'components/shared/heading';
import Link from 'components/shared/link';
import useLottie from 'hooks/use-lottie';

import autoBackupAnimationData from './data/features-auto-backup-lottie-data.json';
import autoScalingAnimationData from './data/features-auto-scaling-lottie-data.json';
import edgeDeploymentAnimationData from './data/features-edge-deployment-lottie-data.json';
import highAvailabilityAnimationData from './data/features-high-availability-lottie-data.json';
import openSourceAnimationData from './data/features-open-source-lottie-data.json';
import payAsYouGoAnimationData from './data/features-pay-as-you-go-lottie-data.json';

const Features = () => {
  const [titleRef, isTitleInView, titleEntry] = useInView({ triggerOnce: true, threshold: 0.5 });

  const {
    animationRef: payAsYouGoAnimationRef,
    animationVisibilityRef: payAsYouGoAnimationVisibilityRef,
  } = useLottie({
    lottieOptions: {
      animationData: payAsYouGoAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationRef: highAvailabilityAnimationRef,
    animationVisibilityRef: highAvailabilityAnimationVisibilityRef,
  } = useLottie({
    lottieOptions: {
      animationData: highAvailabilityAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationRef: autoBackupAnimationRef,
    animationVisibilityRef: autoBackupAnimationVisibilityRef,
  } = useLottie({
    lottieOptions: {
      animationData: autoBackupAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationRef: autoScalingAnimationRef,
    animationVisibilityRef: autoScalingAnimationVisibilityRef,
  } = useLottie({
    lottieOptions: {
      animationData: autoScalingAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationRef: edgeDeploymentAnimationRef,
    animationVisibilityRef: edgeDeploymentAnimationVisibilityRef,
  } = useLottie({
    lottieOptions: {
      animationData: edgeDeploymentAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const {
    animationRef: openSourceAnimationRef,
    animationVisibilityRef: openSourceAnimationVisibilityRef,
  } = useLottie({
    lottieOptions: {
      animationData: openSourceAnimationData,
    },
    useInViewOptions: { threshold: 0.5 },
  });

  const items = [
    {
      animationVisibilityRef: payAsYouGoAnimationVisibilityRef,
      animationRef: payAsYouGoAnimationRef,
      title: 'Pay as You Go',
      description:
        'Being serverless allows using of resources on-demand, which significantly cuts the costs and brings pay as you go solution.',
    },
    {
      animationVisibilityRef: highAvailabilityAnimationVisibilityRef,
      animationRef: highAvailabilityAnimationRef,
      title: 'High Availability',
      description: `Zenith's architecture guarantees high availability even under peak load and 99.9999% uptime for Cloud users.`,
    },
    {
      animationVisibilityRef: autoBackupAnimationVisibilityRef,
      animationRef: autoBackupAnimationRef,
      title: 'Auto-Backup',
      description:
        'Cost efficient incremental auto backup functionality keeps your database save 24/7.',
    },
    {
      animationVisibilityRef: autoScalingAnimationVisibilityRef,
      animationRef: autoScalingAnimationRef,
      title: 'Auto Scaling',
      description:
        'Handle peak time requests, with a flexible auto scale deployment solution, and pay for the actual usage.',
      tag: {
        className: 'text-secondary-4 border-secondary-4',
        text: 'Coming Soon',
      },
    },
    {
      animationVisibilityRef: edgeDeploymentAnimationVisibilityRef,
      animationRef: edgeDeploymentAnimationRef,
      title: 'Edge Deployment',
      description:
        'Have a database close to your users. Zenith is a perfect for serverless functions.',
      tag: {
        className: 'text-secondary-2 border-secondary-2',
        text: 'Coming Soon',
      },
    },
    {
      animationVisibilityRef: openSourceAnimationVisibilityRef,
      animationRef: openSourceAnimationRef,
      title: 'Open Source',
      description: (
        <>
          Check{' '}
          <Link to="/" theme="underline-primary-1">
            our repository
          </Link>{' '}
          to learn more about technologies which make Zenith great.
        </>
      ),
    },
  ];

  return (
    <section
      id="features"
      className="safe-paddings bg-black pt-40 3xl:pt-36 2xl:pt-32 xl:pt-28 lg:pt-20 md:pt-16"
    >
      <Container className="z-20" size="md">
        <Heading
          id="features-title"
          className="text-center lg:mx-auto lg:max-w-[460px]"
          tag="h2"
          size="md"
          theme="white"
          ref={titleRef}
        >
          <BlinkingText
            text="Not an ordinary PostgreSQL as a service"
            parentElement={titleEntry?.target}
            shouldAnimationStart={isTitleInView}
          />
        </Heading>
        <p className="t-3xl mx-auto mt-5 max-w-[940px] text-center text-white 2xl:mt-4 2xl:max-w-[800px] xl:mt-3.5 xl:max-w-[610px] lg:max-w-[580px]">
          The way Zenith extends PostgreSQL brings many essential features needed for modern
          projects development.
        </p>
        <ul className="grid-gap-x mt-[92px] grid grid-cols-12 gap-y-[92px] 2xl:mt-[76px] 2xl:gap-y-[76px] xl:mt-16 xl:gap-y-16 md:grid-cols-1">
          {items.map(({ animationVisibilityRef, animationRef, title, description, tag }, index) => (
            <li
              className="col-span-4 max-w-[410px] 3xl:max-w-[340px] 2xl:max-w-[312px] xl:max-w-[261px] lg:col-span-6 lg:max-w-[300px] md:max-w-none"
              key={index}
              ref={animationVisibilityRef}
            >
              <div className="flex items-end space-x-4 xl:space-x-3.5">
                <div
                  id={`features-item-${index + 1}-icon`}
                  className="h-24 w-24 2xl:h-20 2xl:w-20 xl:h-[72px] xl:w-[72px] lg:h-16 lg:w-16"
                  ref={animationRef}
                  aria-hidden
                />
                {tag?.text && (
                  <span
                    className={clsx(
                      't-sm mr-3 inline-block rounded-full border-2 px-2.5 py-1 font-mono',
                      tag.className
                    )}
                  >
                    {tag.text}
                  </span>
                )}
              </div>
              <Heading
                id={`features-item-${index + 1}-title`}
                className="mt-6 xl:mt-5"
                tag="h3"
                size="sm"
                theme="white"
              >
                {title}
              </Heading>
              <p
                id={`features-item-${index + 1}-description`}
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

export default Features;
