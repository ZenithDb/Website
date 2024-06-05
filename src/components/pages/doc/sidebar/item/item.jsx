'use client';

import clsx from 'clsx';
import { AnimatePresence, LazyMotion, domAnimation, m } from 'framer-motion';
import { usePathname } from 'next/navigation';
import PropTypes from 'prop-types';
import { useState } from 'react';

import Link from 'components/shared/link';

import Tag from '../../tag';

const isActiveItem = (items, currentSlug) =>
  items?.some(
    ({ slug, items }) => slug === currentSlug || (items && isActiveItem(items, currentSlug))
  );

const Item = ({
  basePath,
  title,
  slug = null,
  tag = null,
  ariaLabel = null,
  isStandalone = false,
  items = null,
  closeMenu = null,
  isChildren = false,
}) => {
  const pathname = usePathname();
  const currentSlug = pathname.replace(basePath, '');

  const hasActiveChild = isActiveItem(items, currentSlug);
  const [isOpen, setIsOpen] = useState(() => hasActiveChild);

  const handleClick = () => {
    if (closeMenu && slug) {
      closeMenu();
    }
    setIsOpen((prev) => !prev);
  };

  const externalSlug = slug && slug.startsWith('http') ? slug : null;
  const docSlug = isStandalone ? `/${slug}` : `${basePath}${slug}/`;

  const LinkTag = slug ? Link : 'button';

  return (
    <li className="group/item flex flex-col">
      <LinkTag
        className={clsx(
          'group flex w-full items-start justify-between py-2 text-left text-sm tracking-extra-tight transition-colors duration-200',
          { 'group-first/item:pt-0': !isChildren },
          currentSlug === slug
            ? 'font-medium text-black-new dark:text-white'
            : 'font-normal text-gray-new-40 hover:text-black-new dark:text-gray-new-90 dark:hover:text-white'
        )}
        type={slug ? undefined : 'button'}
        to={slug ? externalSlug || docSlug : undefined}
        target={externalSlug ? '_blank' : '_self'}
        onClick={handleClick}
      >
        {ariaLabel && <span className="sr-only">{ariaLabel}</span>}
        <span
          className="leading-snug [&_code]:rounded-sm [&_code]:bg-gray-new-94 [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:font-normal [&_code]:leading-none dark:[&_code]:bg-gray-new-15"
          aria-hidden={!!ariaLabel}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        {tag && <Tag className="ml-2 mt-0.5" label={tag} size="sm" />}
        <span
          className={clsx(
            'arrow-mask block h-4 w-4 transition-[transform,background-color] duration-200',
            currentSlug === slug
              ? 'bg-black-new dark:bg-white'
              : 'bg-gray-new-40 group-hover:bg-black-new dark:bg-gray-new-90 dark:group-hover:bg-white',
            items?.length ? 'block' : 'hidden',
            isOpen ? 'rotate-90' : 'rotate-0'
          )}
        />
      </LinkTag>
      {!!items?.length && (
        <LazyMotion features={domAnimation}>
          <AnimatePresence initial={false}>
            {isOpen ? (
              <m.ul
                className="relative overflow-hidden pl-5 before:absolute before:left-[3px] before:h-full before:w-px before:bg-gray-new-90 dark:before:bg-gray-new-20"
                initial="from"
                animate="to"
                exit="from"
                variants={{
                  from: { opacity: 0, height: 0 },
                  to: { opacity: 1, height: 'auto' },
                }}
              >
                {items.map((item, index) => (
                  <Item
                    {...item}
                    key={index}
                    closeMenu={closeMenu}
                    basePath={basePath}
                    isChildren
                  />
                ))}
              </m.ul>
            ) : null}
          </AnimatePresence>
        </LazyMotion>
      )}
    </li>
  );
};

Item.propTypes = {
  basePath: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isStandalone: PropTypes.bool,
  slug: PropTypes.string,
  tag: PropTypes.string,
  ariaLabel: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.exact({
      title: PropTypes.string.isRequired,
      slug: PropTypes.string,
      tag: PropTypes.string,
      items: PropTypes.arrayOf(PropTypes.any),
      ariaLabel: PropTypes.string,
    })
  ),
  closeMenu: PropTypes.func,
  isChildren: PropTypes.bool,
};

export default Item;
