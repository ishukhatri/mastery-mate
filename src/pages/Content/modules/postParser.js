export function postParsingCallback(data, successCallback, errorCallback) {
  console.log('post parsing callback >>>', data);
  chrome.runtime.sendMessage({ type: 'JOB_DATA', data: data }, (response) => {
    console.log('Response from background script:', response);
    if (chrome.runtime.lastError) {
      console.log(
        'last error - post parsing callback >>>',
        chrome.runtime.lastError
      );
      errorCallback(chrome.runtime.lastError);
    } else {
      console.log('Message sent to background script.');
      successCallback();
    }
    return true;
  }
  );
}
