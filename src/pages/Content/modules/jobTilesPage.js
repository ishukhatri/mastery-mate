import { parseJobData } from './jobParser.js';
import {
  createScraperActionAdderButton,
  changeIcon,
  getNewButton,
  getJobIdsFromStorage,
} from './button.js';
import { postParsingCallback as postParsingActivity } from './postParser.js';

async function addNewButtonToJobTileActions() {
  const jobTileActionsList = document.querySelectorAll('.job-tile-actions');
  const savedJobIds = await getJobIdsFromStorage();
  console.log('savedJobIds on local >>', savedJobIds);
  jobTileActionsList.forEach((jobTileActions) => {
    const existingButton = jobTileActions.querySelector(
      '.custom-scraper-action-btn'
    );
    if (!existingButton) {
      const jobLink = jobTileActions
        .closest('.up-card-section')
        .querySelector('.job-tile-title a[href]');
      const jobUrl = jobLink ? jobLink.href : null;
      const newButton = getNewButton(
        jobUrl.match(/~([\w\d]+)\//)[1],
        savedJobIds
      );

      // Attach the event listener to the new button
      newButton.addEventListener('click', async () => {
        // todo : add loading state
        const jobCard = newButton.closest('.up-card-section');

        if (jobCard) {
          const jobData = parseJobData(jobCard);
          // todo: add job url to job data
          postParsingActivity(jobData, () => {
            console.log('Saved job data to Airtable');
            changeIcon(newButton, 'saved');
          }, (error) => {
            console.error('Error sending job data to Airtable:', error);
            // todo: add error state
          });
        } else {
          console.log('No job card found');
          // todo : add error state
        }
      });

      jobTileActions.appendChild(newButton);
    }
  });
}

export async function main() {
  const scraperActionAdderButton = createScraperActionAdderButton();
  document.body.appendChild(scraperActionAdderButton);

  scraperActionAdderButton.addEventListener('click', async () => {
    // Send a message to the background script and wait for its response
    chrome.runtime.sendMessage({ action: 'buttonLoaded' }, async (response) => {
      if (response && response.taskCompleted) {
        await addNewButtonToJobTileActions();
      }
    });
  });
}
