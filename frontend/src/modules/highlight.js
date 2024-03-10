import 'highlight.js/styles/stackoverflow-light.css';
import hljs from 'highlight.js/lib/core';
import javascript from 'highlight.js/lib/languages/javascript';
import hljsVuePlugin from '@highlightjs/vue-plugin';

export default (app) => {
  hljs.registerLanguage('javascript', javascript);
  app.use(hljsVuePlugin);
};
