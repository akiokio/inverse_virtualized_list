# Inverse virtualized list

[![Netlify Status](https://api.netlify.com/api/v1/badges/a87095ce-b244-4534-ad89-a1ee77517265/deploy-status)](https://app.netlify.com/sites/Inverselist/deploys)
[![Build Status](https://travis-ci.com/akiokio/inverse_virtualized_list.svg?token=kkCs5gbVzxyoWQcXqQKs&branch=master)](https://travis-ci.com/akiokio/inverse_virtualized_list)

Author: Guilherme Akio Sakae

Github: https://github.com/akiokio/inverse_virtualized_list

Url: https://inverselist.akio.dev/

### Requirements:

1. [x] Scrollbar should be at the bottom on first draw
2. [x] There should be a text-field for entering number of items to generate.
3. [x] Each item should have a dynamic height based on the content inside (random lorem ipsum)
4. [x] Scrollbar should perform smoothly no matter the # of items (which could be thousands). Some method of virtualization should be used.
5. [x] Last item generated must be at bottom not top
6. [x] Back to bottom button if scrolled up
7. [x] Reset button to clear the list and start over
8. [x] If list is populated, any further generated items should be added to the bottom of the list. Scrollbar should jump to end.
9. [x] Ability to delete individual items
10. [x] Ability to drag and reorder items
11. [x] Ability to save state on local storage and reload on refresh

### Assumptions and observations

- Test coverage is limited due to time restraints
  Example:

```
  ----------|----------|----------|----------|----------|-------------------|
  File | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s |
  ----------|----------|----------|----------|----------|-------------------|
  All files | 100 | 100 | 100 | 100 | |
  App.js | 100 | 100 | 100 | 100 | |
  ----------|----------|----------|----------|----------|-------------------|
  Test Suites: 1 passed, 1 total
  Tests: 14 passed, 14 total
  Snapshots: 0 total
  Time: 3.39s

```

- Continous deploy done via netlify when the master branch is updated
- PWA enabled via service workers
