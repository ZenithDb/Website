import { redirect } from 'next/navigation';

import { checkCookie } from 'app/actions';
import AiIndex from 'components/pages/home/ai-index';
import Bento from 'components/pages/home/bento';
import GetStarted from 'components/pages/home/get-started';
import Hero from 'components/pages/home/hero/hero';
import Industry from 'components/pages/home/industry';
import InstantProvisioning from 'components/pages/home/instant-provisioning';
import Lightning from 'components/pages/home/lightning';
import Logos from 'components/pages/home/logos';
import Multitenancy from 'components/pages/home/multitenancy';
import Trusted from 'components/pages/home/trusted';
import SEO_DATA from 'constants/seo-data';
import getMetadata from 'utils/get-metadata';

export const metadata = getMetadata({
  ...SEO_DATA.index,
  robotsNoindex: 'noindex',
});

const HomePage = async () => {
  const is_logged_in = await checkCookie('neon_login_indicator');
  if (!is_logged_in) {
    return redirect('/');
  }

  return (
    <>
      <Hero />
      <Logos />
      <InstantProvisioning />
      <Lightning />
      <Bento />
      <AiIndex />
      <Multitenancy />
      <Industry />
      <Trusted />
      <GetStarted />
    </>
  );
};

export default HomePage;

export const revalidate = 60;
