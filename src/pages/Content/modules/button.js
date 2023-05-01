function createButtonWithIcon(svgIcon) {
  const newButton = document.createElement('button');
  newButton.type = 'button';
  newButton.classList.add(
    'up-btn',
    'up-btn-default',
    'up-btn-circle',
    'custom-scraper-action-btn'
  );
  newButton.innerHTML = svgIcon;
  //this will require some fix to adapt to different pages
  newButton.style.marginLeft = '5px';
  return newButton;
}
const nonSavedSvgIcon = `
      <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.59375 10.2656L11.0769 12.6857L3 16.5217V7.94203L12 4L21 7.71014V16.5217L12.675 20V11.4203L19 8.85239" stroke="#108a00" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

const savedSvgIcon = `
    <svg fill="#108a00" width="24px" height="24px" viewBox="0 0 24 24" role="img" xmlns="http://www.w3.org/2000/svg"><title>Airtable icon</title><path d="M11.992 1.966c-.434 0-.87.086-1.28.257L1.779 5.917c-.503.208-.49.908.012 1.116l8.982 3.558a3.266 3.266 0 0 0 2.454 0l8.982-3.558c.503-.196.503-.908.012-1.116l-8.957-3.694a3.255 3.255 0 0 0-1.272-.257zM23.4 8.056a.589.589 0 0 0-.222.045l-10.012 3.877a.612.612 0 0 0-.38.564v8.896a.6.6 0 0 0 .821.552L23.62 18.1a.583.583 0 0 0 .38-.551V8.653a.6.6 0 0 0-.6-.596zM.676 8.095a.644.644 0 0 0-.48.19C.086 8.396 0 8.53 0 8.69v8.355c0 .442.515.737.908.54l6.27-3.006.307-.147 2.969-1.436c.466-.22.43-.908-.061-1.092L.883 8.138a.57.57 0 0 0-.207-.044z"/></svg>
`;

export function createNewButtonWithNonSavedIcon() {
  const button = createButtonWithIcon(nonSavedSvgIcon);
  button.classList.add('non-saved');
  button.setAttribute('saved', 'false');
  return button;
}

export function createNewButtonWithSavedIcon() {
  const button = createButtonWithIcon(savedSvgIcon);
  button.classList.add('saved');
  button.setAttribute('saved', 'true');
  return button;
}

export function changeIcon(button, state) {
  if (state === 'non-saved') {
    button.innerHTML = nonSavedSvgIcon;
    button.setAttribute('saved', 'false');
  } else if (state === 'saved') {
    button.innerHTML = savedSvgIcon;
    button.setAttribute('saved', 'true');
  }
}

export function createScraperActionAdderButton() {
  const button = document.createElement('button');
  button.className = 'btn btn-primary custom-scraper-action-adder-btn';
  button.textContent = 'Add Scraper Action';

  return button;
}

export function getNewButton(jobId, savedJobIds) {
  const isNewJob = !savedJobIds.includes(jobId);
  console.log('isNewJob', isNewJob, jobId);
  const newButton = isNewJob
    ? createNewButtonWithNonSavedIcon()
    : createNewButtonWithSavedIcon();
  return newButton;
}

// move this to util script
export async function getJobIdsFromStorage() {
  return new Promise((resolve) => {
    chrome.storage.local.get('jobIds', (data) => {
      resolve(data.jobIds || []);
    });
  });
}
