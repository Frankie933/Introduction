//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

document.addEventListener('DOMContentLoaded', (event) => {
  appHeader.textContent = sessionStorage.getItem('imageCaption');
  appFooter.textContent = pageFooterContent.textContent;

  let imgToView = document.querySelector('#imgToView');
  imgToView.src = sessionStorage.getItem('imageToView');
});
