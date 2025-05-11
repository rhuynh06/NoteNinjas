import React, { useState } from 'react';
import { API } from 'aws-amplify';

const NoteInput = () => {
  const [notes, setNotes] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const modelId = 'https://flx8imwbb7.execute-api.us-west-2.amazonaws.com/dev'; // Define your modelId here or fetch it dynamically

  const handleInputChange = (event) => {
    setNotes(event.target.value);
  };

  const callApi = async (notes) => {
    try {
      const response = await API.post('StudyGuideAPI', '/generate', {
        body: {
          notes,
          modelId // Send the modelId along with notes to the Lambda function
        }
      });
      console.log('API Response:', response);
      setResponse(response);  // Store the API response
    } catch (error) {
      console.error('Error calling API:', error);
      setError(error);  // Store the error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (notes.trim()) {
      callApi(notes);  // Trigger the API call when the user submits the notes
    }
  };

  return (
    <div>
      <h2>Enter Your Notes</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={notes}
          onChange={handleInputChange}
          placeholder="Type your notes here..."
          rows="5"
          cols="40"
        />
        <button type="submit">Generate Study Guide</button>
      </form>

      {response && (
        <div>
          <h3>Study Guide:</h3>
          {/* Render the response (terms and definitions, etc.) */}
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}

      {error && <p style={{ color: 'red' }}>Error: {error.message}</p>}
    </div>
  );
};

export default NoteInput;
