import React, { useState } from 'react';
import MonacoEditor from 'react-monaco-editor';
import axios from 'axios';

function App() {
  const [code, setCode] = useState('// Write your code here');
  const [analysis, setAnalysis] = useState('');
  const [debug, setDebug] = useState('');
  const [exercise, setExercise] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleCodeChange = (newCode) => {
    setCode(newCode);
  };

  const analyzeCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/analyze', { code });
      setAnalysis(response.data.explanation);
    } catch (error) {
      setAnalysis('Error analyzing code.');
    }
  };

  const debugCode = async () => {
    try {
      const response = await axios.post('http://localhost:5000/debug', { code });
      setDebug(response.data.issues.join('\n'));
    } catch (error) {
      setDebug('Error debugging code.');
    }
  };

  const generateExercise = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/generate-exercise?level=${difficulty}`);
      setExercise(response.data.exercise);
    } catch (error) {
      setExercise('Error generating exercise.');
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>AI-Powered Code Learning and Debugging Assistant</h1>
      <MonacoEditor
        width="800"
        height="400"
        language="javascript"
        theme="vs-dark"
        value={code}
        onChange={handleCodeChange}
      />
      <div style={{ marginTop: 10 }}>
        <button onClick={analyzeCode}>Analyze Code</button>
        <button onClick={debugCode} style={{ marginLeft: 10 }}>Debug Code</button>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          style={{ marginLeft: 10 }}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
        <button onClick={generateExercise} style={{ marginLeft: 10 }}>Generate Exercise</button>
      </div>
      <div style={{ marginTop: 20 }}>
        <h2>Analysis</h2>
        <pre>{analysis}</pre>
      </div>
      <div style={{ marginTop: 20 }}>
        <h2>Debugging</h2>
        <pre>{debug}</pre>
      </div>
      <div style={{ marginTop: 20 }}>
        <h2>Exercise</h2>
        <pre>{exercise}</pre>
      </div>
    </div>
  );
}

export default App;
