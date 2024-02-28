import clsx from 'clsx';
import PropTypes from 'prop-types';

import Link from 'components/shared/link';

const styles = {
  base: 'inline-flex items-center justify-center font-bold !leading-none text-center whitespace-nowrap rounded-full transition-colors duration-200 outline-none',
  size: {
    md: 't-2xl py-7 px-11 2xl:py-[26px] xl:py-[21px] xl:px-9 md:py-5 md:px-8',
    sm: 't-xl py-[26px] px-11 2xl:py-[21px] 2xl:px-9 xl:py-5 xl:px-8',
    'new-md': 't-base py-[11px] px-[26px]',
    xs: 't-base py-[14px] px-[26px]',
    xxs: 'px-3 py-1.5 text-xs uppercase tracking-wider',
  },
  theme: {
    primary: 'bg-primary-1 text-black hover:bg-[#00e5bf]',
    secondary: 'bg-black text-white hover:bg-[#292929] disabled:bg-[#292929]',
    tertiary: 'bg-transparent text-white border border-white hover:border-primary-2',
    quaternary: 'bg-white text-black border border-black hover:border-primary-2',
    'white-filled': 'bg-white text-black hover:bg-gray-6',
    'white-outline': 'bg-transparent text-white border border-white hover:border-primary-2',
    'gray-2-outline': 'bg-gray-2 border border-gray-3 text-white hover:border-white',
    'gray-outline':
      'text-black border-gray-new-90 bg-gray-new-98 dark:bg-transparent dark:text-white border dark:border-gray-new-30 dark:hover:border-white hover:border-gray-new-70',
    'gray-dark-outline': 'bg-gray-new-10 text-white border border-[#37393D] hover:border-white',
    'gray-dark-outline-black':
      'text-black border border-gray-new-90 bg-gray-new-98 hover:border-gray-new-70 dark:text-white dark:bg-gray-new-10 dark:border-[#37393D] dark:hover:border-white',
    'green-outline': 'bg-transparent text-white border border-green-45 hover:border-white',
    'green-underlined':
      'underline decoration-green-45/40 hover:decoration-green-45/100 text-green-45 transition-colors duration-500',
    blue: 'bg-blue-80 text-black hover:bg-[#C6EAF1]',
    'gray-10': 'bg-gray-new-10 text-white hover:bg-gray-new-20',
    'gray-15': 'bg-gray-new-15 text-white hover:bg-gray-new-20',
  },
};

const Button = ({
  className: additionalClassName = null,
  to = null,
  size = null,
  theme = null,
  children,
  ...otherProps
}) => {
  const className = clsx(styles.base, styles.size[size], styles.theme[theme], additionalClassName);

  const Tag = to ? Link : 'button';

  return (
    <Tag className={className} to={to} {...otherProps}>
      {children}
    </Tag>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  to: PropTypes.string,
  size: PropTypes.oneOf(Object.keys(styles.size)),
  theme: PropTypes.oneOf(Object.keys(styles.theme)),
  children: PropTypes.node.isRequired,
};

export default Button;
