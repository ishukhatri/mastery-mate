// Airtable configuration
const AIRTABLE_PAT =
  '<PUT_PAT_HERE>';
const AIRTABLE_BASE_ID = '<PUT_AIRTABLE_BASE_HERE>';
const AIRTABLE_TABLE_NAME = '<PUT_TABLE_NAME_HERE>';

export async function sendToAirtable(data) {
  console.log('sendToAirtable', data);
  const apiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;
  const headers = {
    Authorization: `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json',
  };
  const body = JSON.stringify({
    records: [
      {
        fields: data,
      },
    ],
  });

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: headers,
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Error sending data to Airtable: ${response.statusText}`);
    }

    console.log('Data sent to Airtable:', response);
    const responseData = await response.json();
    console.log('Airtable API response:', responseData);
    return responseData;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}

export async function getFromAirtable() {
  // Create the API endpoint URL using the base ID and table name
  const apiUrl = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${AIRTABLE_TABLE_NAME}`;

  // Create the request headers with the PAT
  const headers = {
    Authorization: `Bearer ${AIRTABLE_PAT}`,
    'Content-Type': 'application/json',
  };

  // Fetch data from Airtable
  try {
    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: headers,
    });

    if (response.ok) {
      const data = await response.json();
      return data.records;
    } else {
      console.error('Error fetching data from Airtable:', response.statusText);
      return [];
    }
  } catch (error) {
    console.error('Fetch error:', error);
    return [];
  }
}
