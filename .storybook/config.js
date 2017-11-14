import { configure } from '@storybook/react';

function loadStories() {
  require('../src/index.stories.js');
}

configure(loadStories, module);
