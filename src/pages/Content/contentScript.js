import { main } from './modules/jobTilesPage.js';

console.log('[UJP] Content script loaded!');

function hasJobTileActions() {
  return document.querySelector('.job-tile-actions');
}

if (hasJobTileActions()) {
  main();
}