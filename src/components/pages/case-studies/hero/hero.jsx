import Image from 'next/image';
import PropTypes from 'prop-types';

import Container from 'components/shared/container';
import GradientCard from 'components/shared/gradient-card';
import Link from 'components/shared/link/link';
import LINKS from 'constants/links';
import ArrowIcon from 'icons/arrow-sm.inline.svg';

const CardItem = ({
  title,
  description,
  externalUrl = '',
  isInternal,
  post = null,
  logo,
  index,
}) => {
  const linkUrl = isInternal && post?.slug ? `${LINKS.blog}/${post.slug}` : externalUrl;
  const linkProps = linkUrl
    ? {
        to: linkUrl,
        as: Link,
        target: isInternal ? undefined : '_blank',
        rel: isInternal ? undefined : 'noopener noreferrer',
      }
    : {};

  return (
    <li>
      <GradientCard className="p-8 md:p-7 md:pb-8" {...linkProps}>
        <div className="flex h-full flex-col">
          <Image
            className="h-10 w-fit"
            src={logo.mediaItemUrl}
            alt={title}
            width={logo.mediaDetails.width}
            height={logo.mediaDetails.height}
            priority={index < 6}
          />
          <p className="mb-4 mt-[60px] line-clamp-3 font-light leading-snug text-gray-new-60 xl:mt-10 lg:mt-8 md:mt-6">
            <span className="font-normal text-white">{title}</span>. {description}
          </p>
          {!!linkUrl && (
            <div className="mt-auto inline-flex items-baseline text-[15px] leading-none tracking-extra-tight text-green-45 transition-colors duration-200 group-hover:text-[#00FFAA]">
              Read case study
              <ArrowIcon className="ml-1" />
            </div>
          )}
        </div>
      </GradientCard>
    </li>
  );
};

CardItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  logo: PropTypes.shape({
    mediaItemUrl: PropTypes.string.isRequired,
    mediaDetails: PropTypes.shape({
      width: PropTypes.number.isRequired,
      height: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  isInternal: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
  externalUrl: PropTypes.string,
  post: PropTypes.shape({
    slug: PropTypes.string.isRequired,
  }),
  index: PropTypes.number.isRequired,
};

const Hero = ({ items }) => (
  <section className="hero safe-paddings pt-36 xl:pt-[120px] lg:pt-11 md:pt-8">
    <Container className="flex flex-col items-center" size="medium">
      <h1 className="text-center font-title text-[72px] font-medium leading-none tracking-extra-tight 2xl:text-6xl xl:text-[56px] lg:text-[44px]">
        Explore <span className="text-green-45">success stories</span>
      </h1>
      <p className="mx-auto mt-5 max-w-[664px] text-center text-xl font-light leading-snug lg:text-lg md:text-base">
        Discover how other companies are using Neon.
      </p>
      <div className="grid-gap-x grid grid-cols-12 gap-x-[34px]">
        <ul className="col-span-10 col-start-2 mt-20 grid grid-cols-3 gap-x-8 gap-y-9 xl:col-span-full xl:col-start-1 xl:mt-16 lg:mt-12 lg:grid-cols-2 md:mt-10 md:gap-6 sm:grid-cols-1">
          {items.map(({ title, caseStudyPost }, index) => (
            <CardItem {...caseStudyPost} title={title} key={index} index={index} />
          ))}
        </ul>
      </div>
    </Container>
  </section>
);

Hero.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      caseStudyPost: PropTypes.shape({
        description: PropTypes.string.isRequired,
        logo: PropTypes.shape({
          mediaItemUrl: PropTypes.string.isRequired,
          mediaDetails: PropTypes.shape({
            width: PropTypes.number.isRequired,
            height: PropTypes.number.isRequired,
          }).isRequired,
        }).isRequired,
        isInternal: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf([null])]),
        externalUrl: PropTypes.string,
        post: PropTypes.shape({
          slug: PropTypes.string.isRequired,
        }),
      }).isRequired,
    })
  ).isRequired,
};

export default Hero;
