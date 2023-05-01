import { sendToAirtable, getFromAirtable } from './modules/airtable.js';

// Listener for messages from content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log('Received message from content script:', request);
  if (request.type === 'JOB_DATA') {
    const jobData = request.data;

    // Call the sendToAirtable function (defined earlier) to send the job data to Airtable
    sendToAirtable(jobData)
      .then((response) => {
        console.log('Response from airtable for saving data ', response);
        // Send a response back to the sender (if needed)
        console.log('cp1');
        sendResponse({ success: true, response });
        console.log('cp2');
      })
      .catch((error) => {
        console.error('Error sending data to Airtable:', error);
        console.log('ecp1');
        sendResponse({ success: false, error });
        console.log('ecp2');
      })
      .finally(() => {
        console.log('Finally block executed');
        if (chrome.runtime.lastError) {
          console.log('Error sending response:', chrome.runtime.lastError);
        }
      });
  }

  // Return true to indicate that sendResponse will be called asynchronously
  return true;
});


async function extractJobIds() {
  const records = await getFromAirtable();
  const jobIds = records.map((record) => {
    return record.fields.jobId;
  });

  console.log('Job Idss:', jobIds);
  return jobIds;
}

async function yourFunctionToExecute() {
  const jobIds = await extractJobIds();
  console.log('Job ids:', jobIds);

  // Store job URLs in local storage
  chrome.storage.local.set({ jobIds: jobIds }, () => {
    console.log('Job jobIds stored in local storage.');
  });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'buttonLoaded') {
    // Execute your function here
    yourFunctionToExecute().then(() => {
      // Send a response back to the content script
      sendResponse({ taskCompleted: true });
    });

    // This is necessary to indicate that the response will be sent asynchronously
    return true;
  }
});
