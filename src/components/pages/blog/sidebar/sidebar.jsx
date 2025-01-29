import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';

import BlogNavLink from 'components/pages/blog/blog-nav-link';
import RssButton from 'components/shared/rss-button';
import Socials from 'components/shared/socials/index';
import { BLOG_BASE_PATH } from 'constants/blog';

const AlgoliaSearch = dynamic(() => import('components/shared/algolia-search'));

const Sidebar = ({ categories }) => {
  const allCategories = [
    {
      name: 'All posts',
      slug: 'all',
    },
    ...categories,
  ];
  return (
    <aside className="relative flex w-[192px] shrink-0 flex-col gap-y-10 lg:mb-10 lg:min-h-fit lg:w-full lg:pb-0 md:mb-8">
      <div className="flex-1">
        <nav className="no-scrollbars sticky top-24  lg:-mx-8 lg:flex lg:max-w-5xl lg:items-end lg:justify-between lg:overflow-auto lg:px-8 md:-mx-4 md:px-4">
          <div className="flex gap-1.5">
            <AlgoliaSearch
              className="w-full lg:hidden"
              indexName={process.env.NEXT_PUBLIC_ALGOLIA_BLOG_INDEX_NAME}
              isBlog
            />
            <RssButton basePath={BLOG_BASE_PATH} title="Blog" />
          </div>
          <ul className="mt-5 flex flex-col gap-y-2.5 lg:mt-0 lg:flex-row lg:gap-x-5 lg:after:shrink-0 lg:after:grow-0 lg:after:basis-px lg:after:content-['']">
            {allCategories.map(({ name, slug }, index) => (
              <li className="flex" key={index}>
                <BlogNavLink name={name} slug={slug} />
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="sticky bottom-0 -mb-10 mt-auto shrink-0 bg-black-pure pb-10 pt-5 leading-none lg:hidden">
        <Socials />
      </div>
    </aside>
  );
};

export default Sidebar;

Sidebar.propTypes = {
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      slug: PropTypes.string,
    })
  ).isRequired,
};
