const DOCS_BASE_PATH = '/docs/';
const RELEASE_NOTES_PER_PAGE = 40;
const RELEASE_NOTES_SLUG = 'release-notes';
const RELEASE_NOTES_BASE_PATH = `${DOCS_BASE_PATH}${RELEASE_NOTES_SLUG}/`;

// We are using ES modules here in order to be able to import variables from this file in gatsby-node.js
module.exports = {
  DOCS_BASE_PATH,
  RELEASE_NOTES_SLUG,
  RELEASE_NOTES_PER_PAGE,
  RELEASE_NOTES_BASE_PATH,
};
