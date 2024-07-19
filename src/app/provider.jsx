'use client';

import { usePathname } from 'next/navigation';
import { ThemeProvider as PreferredProvider } from 'next-themes';
import PropTypes from 'prop-types';

// eslint-disable-next-line react/prop-types
const whiteThemePages = [
  '/careers',
  '/thank-you',
  '/privacy-policy',
  '/terms-of-service',
  '/dpa',
  '/subprocessors',
  '/privacy-guide',
  '/cookie-policy',
  '/business-info',
];
const ThemeProvider = ({ children }) => {
  const pathname = usePathname();
  const isWhiteThemePage = whiteThemePages.some((page) => pathname.startsWith(page));
  const isDocPage =
    pathname.startsWith('/docs') || pathname.startsWith('/guides') || pathname.startsWith('/flow');
  const forcedTheme = isWhiteThemePage ? 'light' : 'dark';

  return (
    <PreferredProvider
      attribute="class"
      forcedTheme={isDocPage ? null : forcedTheme}
      storageKey="neon-theme"
      disableTransitionOnChange
    >
      {children}
    </PreferredProvider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ThemeProvider;
