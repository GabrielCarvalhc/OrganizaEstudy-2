// components/Timer.js
import { useState, useEffect } from 'react'

export default function Timer({ onSave }) {
    const [isActive, setIsActive] = useState(false)
    const [isPaused, setIsPaused] = useState(false)
    const [time, setTime] = useState(0)

  useEffect(() => {
    let interval = null

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTime((time) => time + 1)
      }, 1000)
    } else {
      clearInterval(interval)
    }

    return () => {
      clearInterval(interval)
    }
  }, [isActive, isPaused])

  const handleStart = () => {
    setIsActive(true)
    setIsPaused(false)
  }

  const handlePause = () => {
    setIsPaused(true)
  }

  const handleResume = () => {
    setIsPaused(false)
  }

  const handleReset = () => {
    setIsActive(false)
    setTime(0)
  }

  const handleSave = () => {
    if (time === 0) return
    onSave(time) // Envia o tempo para o Dashboard
    handleReset()
  }

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60

    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="timer-container">
      <h3 style={{color: '#7f8c8d'}}>Cronômetro de Estudo</h3>
      <div className="timer-display">{formatTime(time)}</div>
      <div className="timer-controls">
        {!isActive ? (
          <button onClick={handleStart}>Iniciar</button>
        ) : isPaused ? (
          <button onClick={handleResume}>Continuar</button>
        ) : (
          <button onClick={handlePause}>Pausar</button>
        )}
        {isActive && (
          <>
            <button onClick={handleReset}>Resetar</button>
            <button onClick={handleSave}>Salvar Sessão</button>
          </>
        )}
      </div>
      <style jsx>{`
        .timer-container {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(255, 255, 255, 0.1);
          max-width: 400px;
          margin: 2rem auto;
          text-align: center;
          color: 7f8c8d;
        }
          
        .timer-display {
          font-size: 2.5rem;
          font-family: monospace;
          margin: 1rem 0;
          color:rgb(3, 3, 3);
        }
        .timer-controls {
          display: flex;
          justify-content: center;
          gap: 0.5rem;
          flex-wrap: wrap;
        }
        .timer-controls button {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        .timer-controls button:nth-child(1) {
          background: #2ecc71;
          color: white;
        }
        .timer-controls button:nth-child(1):hover {
          background: #27ae60;
        }
        .timer-controls button:nth-child(2) {
          background: #3498db;
          color: white;
        }
        .timer-controls button:nth-child(2):hover {
          background: #2980b9;
        }
        .timer-controls button:nth-child(3) {
          background: #e74c3c;
          color: white;
        }
        .timer-controls button:nth-child(3):hover {
          background: #c0392b;
        }
        @media (max-width: 500px) {
          .timer-display {
            font-size: 2rem;
          }
        }
      `}</style>
    </div>
  )
}