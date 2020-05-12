const fs = require('fs');
const { mdToPdf } = require('md-to-pdf');
 
(async () => {
  await mdToPdf({
    path: './00_HTML_CSS_Vorkurs/was-ist-html.md'
  }, {
    dest: './00_HTML_CSS_Vorkurs/dist/was-ist-html.pdf'
  }).catch(console.error);

  await mdToPdf({
    path: './00_HTML_CSS_Vorkurs/was-ist-css.md'
  }, {
    dest: './00_HTML_CSS_Vorkurs/dist/was-ist-css.pdf'
  }).catch(console.error);
})();
 
(async () => {
  await mdToPdf({
    path: './01_HTML_CSS_Basics/html-fortgeschrittene-basics.md'
  }, {
    dest: './01_HTML_CSS_Basics/dist/html-fortgeschrittene-basics.pdf'
  }).catch(console.error);

  await mdToPdf({
    path: './01_HTML_CSS_Basics/css-fortgeschrittene-basics.md'
  }, {
    dest: './01_HTML_CSS_Basics/dist/css-fortgeschrittene-basics.pdf'
  }).catch(console.error);
})();
