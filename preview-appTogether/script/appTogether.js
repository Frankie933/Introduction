
var pageHeaderContent = document.querySelector('content-header');
var pageFooterContent = document.querySelector('content-footer');
var appHeader = document.querySelector('.GridItemHeader');
var appFooter = document.querySelector('.GridItemFooter');

document.addEventListener('DOMContentLoaded', (event) => {
  appHeader.textContent = pageHeaderContent.textContent;
  appFooter.textContent = pageFooterContent.textContent;
});