import { useState } from 'react';
import axios from 'axios';

function App() {
  const [inputText, setInputText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/process_text', { text: inputText });
      setResult(response.data.message);
    } catch (error) {
      console.error('Error:', error);
      setResult('发生错误，请稍后再试。');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">PodCastLM</h1>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full p-2 border rounded mb-4"
            rows={4}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="请输入文本..."
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            提交
          </button>
        </form>
        {result && (
          <div className="mt-4 p-2 bg-gray-200 rounded">
            <p>{result}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
