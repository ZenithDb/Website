const fs = require('fs');
const path = require('path');

const { glob } = require('glob');
const matter = require('gray-matter');
const jsYaml = require('js-yaml');
const slugify = require('slugify');

const sharedMdxComponents = require('../../content/docs/shared-content');
const { CHANGELOG_DIR_PATH } = require('../constants/docs');

const getExcerpt = require('./get-excerpt');
const parseMDXHeading = require('./parse-mdx-heading');

const DOCS_DIR_PATH = 'content/docs';
const GUIDES_DIR_PATH = 'content/guides';

const getPostSlugs = async (pathname) => {
  const files = await glob.sync(`${pathname}/**/*.md`, {
    ignore: [
      '**/RELEASE_NOTES_TEMPLATE.md',
      '**/README.md',
      '**/unused/**',
      '**/shared-content/**',
      '**/GUIDE_TEMPLATE.md',
    ],
  });
  return files.map((file) => file.replace(pathname, '').replace('.md', ''));
};

const getPostBySlug = (slug, pathname) => {
  try {
    const source = fs.readFileSync(`${pathname}/${slug}.md`);
    const { data, content } = matter(source);
    const excerpt = getExcerpt(content, 200);

    return { data, content, excerpt };
  } catch (e) {
    return null;
  }
};

const getAllPosts = async () => {
  const slugs = await getPostSlugs(DOCS_DIR_PATH);
  return slugs
    .map((slug) => {
      if (!getPostBySlug(slug, DOCS_DIR_PATH)) return;
      const data = getPostBySlug(slug, DOCS_DIR_PATH);

      const slugWithoutFirstSlash = slug.slice(1);
      const {
        data: { title, subtitle, isDraft, redirectFrom },
        content,
      } = data;
      return { slug: slugWithoutFirstSlash, title, subtitle, isDraft, content, redirectFrom };
    })
    .filter((item) => process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' || !item.isDraft);
};

const getSidebar = () =>
  jsYaml.load(fs.readFileSync(path.resolve('content/docs/sidebar.yaml'), 'utf8'));

const getBreadcrumbs = (slug, flatSidebar) => {
  const path = flatSidebar.find((item) => item.slug === slug)?.path;
  const arr = [];
  if (path) {
    path.reduce((prev, cur) => {
      const current = prev[cur] || prev.items[cur];
      arr.push({ title: current.title, slug: current.slug });
      return current;
    }, getSidebar());

    return arr.slice(0, -1);
  }

  return [];
};

const getFlatSidebar = (sidebar, path = []) =>
  sidebar.reduce((acc, item, index) => {
    const current = { title: item.title, slug: item.slug, path: [...path, index] };
    if (item.items) {
      return [...acc, current, ...getFlatSidebar(item.items, current.path)];
    }
    return [...acc, { ...item, path: [...path, index] }];
  }, []);

const getDocPreviousAndNextLinks = (slug, flatSidebar) => {
  const items = flatSidebar.filter((item) => item.slug !== undefined);
  const currentItemIndex = items.findIndex((item) => item.slug === slug);
  const previousItem = items[currentItemIndex - 1];
  const nextItem = items[currentItemIndex + 1];

  return {
    previousLink: { title: previousItem?.title, slug: previousItem?.slug },
    nextLink: { title: nextItem?.title, slug: nextItem?.slug },
  };
};

const getAllChangelogPosts = async () => {
  const slugs = await getPostSlugs(CHANGELOG_DIR_PATH);

  return slugs
    .map((slug) => {
      if (!getPostBySlug(slug, CHANGELOG_DIR_PATH)) return;
      const post = getPostBySlug(slug, CHANGELOG_DIR_PATH);
      const { data, content } = post;

      return {
        slug: slug.replace('/', ''),
        isDraft: data?.isDraft,
        content,
        redirectFrom: data?.redirectFrom,
      };
    })
    .filter((item) => process.env.NEXT_PUBLIC_VERCEL_ENV !== 'production' || !item.isDraft);
};

const buildNestedToc = (headings, currentLevel) => {
  const toc = [];

  while (headings.length > 0) {
    const [depth, title] = parseMDXHeading(headings[0]);
    const titleWithInlineCode = title.replace(/`([^`]+)`/g, '<code>$1</code>');

    if (depth === currentLevel) {
      const tocItem = {
        title: titleWithInlineCode,
        id: slugify(title, { lower: true, strict: true, remove: /[*+~.()'"!:@]/g }),
        level: depth,
      };

      headings.shift(); // remove the current heading

      if (headings.length > 0 && parseMDXHeading(headings[0])[0] > currentLevel) {
        tocItem.items = buildNestedToc(headings, currentLevel + 1);
      }

      toc.push(tocItem);
    } else if (depth < currentLevel) {
      // Return toc if heading is of shallower level
      return toc;
    } else {
      // Skip headings of deeper levels
      headings.shift();
    }
  }

  return toc;
};

const getTableOfContents = (content) => {
  const mdxComponentRegex = /<(\w+)\/>/g;
  let match;
  // check if the content has any mdx shared components
  while ((match = mdxComponentRegex.exec(content)) !== null) {
    const componentName = match[1];

    const fileName = sharedMdxComponents[componentName];
    const mdFilePath = `content/docs/${fileName}.md`;

    // Check if the MD file exists
    if (fs.existsSync(mdFilePath)) {
      const mdContent = fs.readFileSync(mdFilePath, 'utf8');
      content = content.replace(new RegExp(`<${componentName}\/>`, 'g'), mdContent);
    }
  }

  const codeBlockRegex = /```[\s\S]*?```/g;
  const headingRegex = /^(#+)\s(.*)$/gm;

  const contentWithoutCodeBlocks = content.replace(codeBlockRegex, '');
  const headings = contentWithoutCodeBlocks.match(headingRegex) || [];

  const arr = headings.map((item) => item.replace(/(#+)\s/, '$1 '));

  return buildNestedToc(arr, 1);
};

module.exports = {
  getPostSlugs,
  getPostBySlug,
  getSidebar,
  getBreadcrumbs,
  getFlatSidebar,
  getDocPreviousAndNextLinks,
  getAllChangelogPosts,
  getAllPosts,
  getTableOfContents,
  DOCS_DIR_PATH,
  GUIDES_DIR_PATH,
  CHANGELOG_DIR_PATH,
};
