import React from 'react';

import CardItemsList from 'components/shared/card-items-list';
import Container from 'components/shared/container';
import GradientLabel from 'components/shared/gradient-label';
import Heading from 'components/shared/heading';

import chatbotIcon from './images/chatbot.svg';
import imageSearchIcon from './images/image-search.svg';
import semanticSearchIcon from './images/semantic-search.svg';

// TODO: add app links and real descriptions
const exampleApps = [
  {
    icon: chatbotIcon,
    title: 'Chatbot',
    description:
      'Give LLM-based chatbots long-term memory and provide relevant context from your data.',
    url: '/docs/guides/oauth-integration',
  },
  {
    icon: imageSearchIcon,
    title: 'Image search',
    description: 'Retrieve similar images based on user queries.',
    url: 'https://neon-experimental.vercel.app/',
  },
  {
    icon: semanticSearchIcon,
    title: 'Semantic search',
    description:
      'Build next-level search experiences for your users where you understand the true meaning of their queries.',
    url: '/blog/api-cf-drizzle-neon',
  },
];

const Examples = () => (
  <section className="safe-paddings mt-40 bg-black-new xl:mt-[120px] lg:mt-28 md:mt-20">
    <Container size="medium" className="grid grid-cols-12 gap-x-10 xl:gap-x-6 md:gap-x-4">
      <div className="col-span-10 col-start-2 flex flex-col items-center xl:col-span-full xl:col-start-1">
        <GradientLabel>Example apps</GradientLabel>
        <Heading
          className="flat-breaks md:flat-none mt-3 text-center text-[52px] font-medium leading-none tracking-extra-tight xl:mt-4 xl:text-[44px] lg:text-4xl md:mt-3 md:max-w-xs md:text-[32px]"
          tag="h2"
        >
          Start building
          <br /> AI apps on Neon
        </Heading>
        <p className="mt-3 text-center text-lg font-light leading-snug xl:text-base md:max-w-xs">
          Check out the following example LLM and AI apps and start building in minutes
        </p>
        <CardItemsList
          className="mt-14 gap-x-7 xl:mt-10 xl:gap-x-6 lg:gap-x-4 md:mt-8 md:gap-y-4"
          items={exampleApps}
          size="lg"
        />
      </div>
    </Container>
  </section>
);

export default Examples;
