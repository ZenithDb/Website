'use client';

// eslint-disable-next-line import/no-extraneous-dependencies
import clsx from 'clsx';
import Image from 'next/image';
import { MDXRemote } from 'next-mdx-remote';
import PropTypes from 'prop-types';
import React, { Fragment, forwardRef } from 'react';

import Admonition from 'components/pages/doc/admonition';
import CodeTabs from 'components/pages/doc/code-tabs';
import DefinitionList from 'components/pages/doc/definition-list';
import AnchorHeading from 'components/shared/anchor-heading';
import CodeBlock from 'components/shared/code-block';
import Link from 'components/shared/link';

const components = {
  h2: AnchorHeading('h2'),
  h3: AnchorHeading('h3'),
  table: (props) => (
    <div className="table-wrapper">
      <table {...props} />
    </div>
  ),
  // eslint-disable-next-line react/jsx-no-useless-fragment
  undefined: (props) => <Fragment {...props} />,
  code: (props) => {
    if (props?.className?.startsWith('language-')) {
      return <CodeBlock {...props} />;
    }
    return <code {...props} />;
  },
  pre: (props) => <div {...props} />,
  link: (props) => {
    const { href, children, ...otherProps } = props;
    return (
      <Link to={href} {...otherProps}>
        {children}
      </Link>
    );
  },
  img: (props) => (
    <Image
      {...props}
      loading="lazy"
      width={796}
      height={447}
      style={{ width: '100%', height: '100%' }}
    />
  ),
  DefinitionList,
  Admonition,
  CodeTabs,
};

// eslint-disable-next-line no-return-assign
const Content = forwardRef(({ className = null, content, asHTML = false }, ref) => (
  <div
    className={clsx('prose-doc prose dark:prose-invert xs:prose-code:break-words', className)}
    ref={ref}
  >
    {asHTML ? (
      <div dangerouslySetInnerHTML={{ __html: content }} />
    ) : (
      <MDXRemote components={components} {...content} />
    )}{' '}
  </div>
));

Content.propTypes = {
  className: PropTypes.string,
  content: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  asHTML: PropTypes.bool,
};

export default Content;
