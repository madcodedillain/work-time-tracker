import { useEffect, useState } from 'react';

function formatTime(totalSeconds: number) {
  const minutes = Math.floor(totalSeconds / 60);
  const remainingSeconds = totalSeconds % 60;

  return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
}

function App() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<Date | null>(null);

  const [sessions, setSessions] = useState<
  {
    id: string;
    startTime: Date;
    endTime: Date;
    duration: number;
  }[]
>(() => {
  const savedSessions = localStorage.getItem('sessions');

  if (savedSessions === null) {
    return [];
  }

  const parsedSessions = JSON.parse(savedSessions);

  return parsedSessions.map((session: {
    id: string;
    startTime: string;
    endTime: string;
    duration: number;
  }) => ({
    ...session,
    startTime: new Date(session.startTime),
    endTime: new Date(session.endTime),
  }));
});

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

  useEffect(() => {
  localStorage.setItem('sessions', JSON.stringify(sessions));
}, [sessions]);

  return (
    <main>
      <h1>Freelance Time Tracker</h1>

      <p>Time: {formatTime(seconds)}</p>

      <button
        type="button"
        onClick={() => {
          if (seconds === 0) {
            setStartTime(new Date());
          }

          setIsRunning(true);
        }}
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
          setStartTime(null);
        }}
      >
        Reset
      </button>

      <button
        type="button"
        disabled={startTime === null || seconds === 0}
        onClick={() => {
          if (startTime === null || seconds === 0) {
            return;
          }

          setSessions((currentSessions) => [
            ...currentSessions,
            {
              id: crypto.randomUUID(),
              startTime,
              endTime: new Date(),
              duration: seconds,
            },
          ]);

          setIsRunning(false);
          setSeconds(0);
          setStartTime(null);
        }}
      >
        Finish Session
      </button>

      <p>Timer status: {isRunning ? 'Running' : 'Stopped'}</p>

      {startTime && (
        <p>
          Started at{' '}
          {startTime.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          })}
        </p>
      )}

      <h2>Session History</h2>

      {sessions.length === 0 ? (
        <p>No sessions yet.</p>
      ) : (
        <ul>
          {sessions.map((session) => (
            <li key={session.id}>
              {session.startTime.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
              {' — '}
              {formatTime(session.duration)}

              <button
  type="button"
  onClick={() => {
    setSessions((currentSessions) =>
      currentSessions.filter(
        (currentSession) => currentSession.id !== session.id
      )
    );
  }}
>
  Delete
</button>

            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

export default App;