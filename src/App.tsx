import { useEffect, useState } from 'react';
function App() {

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
  if (!isRunning) {
    return;
  }

  const intervalId = window.setInterval(() => {
    setSeconds((currentSeconds) => currentSeconds + 1);
  }, 1000);

  return () => {
    window.clearInterval(intervalId);
  };
}, [isRunning]);

  return (
    <main>
      <h1>Freelance Time Tracker</h1>

      <p>
        Track working time across clients and projects.
      </p>

      <button
  type="button"
  onClick={() => setIsRunning(true)}
  disabled={isRunning}
>
  Start
</button>

<button
  type="button"
  onClick={() => setIsRunning(false)}
  disabled={!isRunning}
>
  Stop
</button>

<button
  type="button"
  onClick={() => {
    setIsRunning(false);
    setSeconds(0);
  }}
>
  Reset
</button>

<p>Time: {seconds} seconds</p>
<p>Timer status: {isRunning ? 'Running' : 'Stopped'}</p>

    </main>
  );
}

export default App;