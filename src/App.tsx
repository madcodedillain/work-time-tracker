import { useEffect, useState } from 'react';

function formatTime(totalSeconds: number) 
{
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function App() {

  const [seconds, setSeconds] = useState(58);
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

<p>Time: {formatTime(seconds)}</p>
<p>Timer status: {isRunning ? 'Running' : 'Stopped'}</p>

    </main>
  );
}

export default App;