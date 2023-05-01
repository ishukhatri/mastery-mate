import React from 'react';
import React, { useState } from 'react';

import './Options.css';

const Options = () => {
  const [baseId, setBaseId] = useState('');
  const [tableName, setTableName] = useState('');
  const [pat, setPat] = useState('');

  const handleBaseIdChange = (event) => {
    setBaseId(event.target.value);
  };

  const handleTableNameChange = (event) => {
    setTableName(event.target.value);
  };

  const handlePatChange = (event) => {
    setPat(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(`Base ID: ${baseId}, Table Name: ${tableName}, PAT: ${pat}`);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="baseId" className="form-label">
              Airtable Base ID:
            </label>
            <input
              type="text"
              className="form-control"
              id="baseId"
              value={baseId}
              onChange={handleBaseIdChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tableName" className="form-label">
              Airtable Table Name:
            </label>
            <input
              type="text"
              className="form-control"
              id="tableName"
              value={tableName}
              onChange={handleTableNameChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="pat" className="form-label">
              Airtable Personal Access Token:
            </label>
            <input
              type="text"
              className="form-control"
              id="pat"
              value={pat}
              onChange={handlePatChange}
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </header>
    </div>
  );
};

export default Options;
