const fs = require('fs');

const slugify = require('slugify');

/**
 * Get a glossary item preview by heading ID.
 * @param {string} href - The href of the glossary item.
 * @returns {Object} - The glossary item preview.
 */
const getGlossaryItem = (href) => {
  const glossaryFilePath = 'content/docs/reference/glossary.md';

  if (!fs.existsSync(glossaryFilePath)) {
    return null;
  }

  const glossaryContent = fs.readFileSync(glossaryFilePath, 'utf8');
  const id = href.split('#')[1];

  // Split the glossary content into sections
  const sections = glossaryContent.split('## ').slice(1);

  // Find the matching section by heading ID and return title and preview
  let result = null;
  sections.some((section) => {
    const lines = section.split('\n');
    const title = lines[0].trim();
    const titleId = slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    }).replace(/_/g, '');

    if (titleId === id) {
      const text = lines.slice(1).join('\n').trim();

      // Remove markdown formatting
      const formattedText = text
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') // Handle links
        .replace(/(\*\*|__|\*|_)(.*?)\1/g, '$2') // Handle bold and italic
        .replace(/^[-*+]\s+/gm, '') // Handle list items
        .replace(/```[\s\S]*?```/g, '') // Remove code blocks
        .replace(/`([^`]+)`/g, '$1') // Handle inline code
        .replace(/\|[^\n]*\|/g, '') // Remove tables
        .replace(/\n+/g, ' ') // Replace line breaks
        .replace(/\s{2,}/g, ' ') // Remove multiple spaces
        .trim(); // Clean up whitespace

      // Add ellipsis at the end if the text is longer than 64 chars
      const preview = formattedText.slice(0, 64) + (formattedText.length > 64 ? '…' : '');
      result = { title, preview };
      return true;
    }
    return false;
  });

  return result;
};

export default getGlossaryItem;
