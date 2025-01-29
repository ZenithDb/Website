import PropTypes from 'prop-types';

import BlogNavLink from 'components/pages/blog/blog-nav-link';
import SearchInput from 'components/shared/algolia-search/search-input';
import RssButton from 'components/shared/rss-button';
import Socials from 'components/shared/socials/index';
import { BLOG_BASE_PATH } from 'constants/blog';

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
        <nav className="sticky top-24 flex flex-col gap-5 lg:max-w-5xl lg:flex-row-reverse lg:items-end lg:justify-between lg:gap-6 md:block">
          <div className="flex gap-1.5 overflow-hidden md:w-full">
            <SearchInput className="w-full lg:w-[192px] md:w-full" isBlog />
            <RssButton basePath={BLOG_BASE_PATH} title="Blog" />
          </div>
          <div className="lg:no-scrollbars lg:-ml-8 lg:overflow-auto lg:pl-8 md:-mx-4 md:mt-6 md:px-4">
            <ul className="flex flex-col gap-y-2.5 lg:flex-row lg:gap-x-5 lg:after:shrink-0 lg:after:grow-0 lg:after:basis-px lg:after:content-['']">
              {allCategories.map(({ name, slug }, index) => (
                <li className="flex" key={index}>
                  <BlogNavLink name={name} slug={slug} />
                </li>
              ))}
            </ul>
          </div>
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
