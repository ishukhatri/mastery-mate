function parseBudgetAndDuration(element, jobType) {
  let budget = '';
  let duration = '';

  if (jobType.toLowerCase().includes('fixed')) {
    budget = element.querySelector('[data-test="budget"]').innerText.trim();
  } else {
    const durationElement = element.querySelector('[data-test="duration"]');
    if (durationElement) {
      duration = durationElement.innerText.trim();
    }
  }

  return { budget, duration };
}

function parseSkills(element) {
  const skillElements = element.querySelectorAll('.up-skill-badge');
  return Array.from(skillElements).map((skillElement) =>
    skillElement.innerText.trim()
  );
}

export function parseJobData(element) {
  console.log('parseJobData', element);

  const parsedData = {};

  try {
    parsedData.Name = element.querySelector('.job-tile-title').innerText.trim();
  } catch (error) {
    console.error('Error parsing name:', error);
    parsedData.Name = '';
  }

  try {
    parsedData.description = element
      .querySelector('[data-test="job-description-text"]')
      .innerText.trim();
  } catch (error) {
    console.error('Error parsing description:', error);
    parsedData.description = '';
  }

  try {
    parsedData.tier = element
      .querySelector('[data-test="contractor-tier"]')
      .innerText.trim();
  } catch (error) {
    console.error('Error parsing tier:', error);
    parsedData.tier = '';
  }

  try {
    parsedData.type = element
      .querySelector('[data-test="job-type"]')
      .innerText.trim();
  } catch (error) {
    console.error('Error parsing type:', error);
    parsedData.type = '';
  }

  const jobLink = element.querySelector(
    '.up-card-section .job-tile-title a[href]'
  );
  parsedData.url = jobLink ? jobLink.href : null;
  console.log('parsedData.url', parsedData.url);
  parsedData.jobId = parsedData.url.match(/~([\w\d]+)\//)[1];

  const { budget, duration } = parseBudgetAndDuration(element, parsedData.type);
  parsedData.budget = budget;
  parsedData.duration = duration;

  // try {
  //   parsedData.skills = parseSkills(element);
  // } catch (error) {
  //   console.error('Error parsing skills:', error);
  //   parsedData.skills = [];
  // }

  return parsedData;
}
