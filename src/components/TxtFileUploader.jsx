import React from 'react';

function TxtFileUploader({ setInput }) {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInput(e.target.result);
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid .txt file');
    }
  };

  return (
    <div className="upload-wrapper">
      <label className="upload-btn">
        Upload File
        <input type="file" accept=".txt" onChange={handleFileChange} />
      </label>
    </div>
  );
}

export default TxtFileUploader;