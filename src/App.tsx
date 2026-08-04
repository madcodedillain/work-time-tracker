import { useState } from 'react';
function App() {
  const [seconds, setSeconds] = useState(0);
  return (
    <main>
      <h1>Freelance Time Tracker</h1>

      <p>
        Track working time across clients and projects.
      </p>

      <button type="button">
        Start timer
      </button>
      <p>
        Time: {seconds} seconds
      </p>
      <button 
      type="button"
      onClick={() => setSeconds(0)}>
        Reset
      </button>
      <button type="button"
      onClick={() => setSeconds((currentSeconds) => currentSeconds + 1)}>
        Add 1 second
      </button>
    </main>
  );
}

export default App;