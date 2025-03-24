// components/Dashboard.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import StatsChart from './StatsChart'
import Timer from './Timer'

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import Timer from './Timer'

export default function Dashboard() {
  const [totalStudyTime, setTotalStudyTime] = useState(0)
  const [materias, setMaterias] = useState([])
  const [selectedMateria, setSelectedMateria] = useState(null)
  const [showMateriaModal, setShowMateriaModal] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
    fetchMaterias()
  }, [])

  const fetchDashboardData = async () => {
    try {
      setLoading(true)
      const { data: total } = await supabase
        .from('study_sessions')
        .select('sum(duration)')
      
      setTotalStudyTime(total?.[0]?.sum || 0)
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchMaterias = async () => {
    const { data } = await supabase
      .from('materias')
      .select('*')
    setMaterias(data || [])
  }

  const handleSaveSession = (duration) => {
    setShowMateriaModal(true)
  }

  const confirmSaveSession = async (materiaId) => {
    if (!materiaId || !duration) return
    
    try {
      const { error } = await supabase
        .from('study_sessions')
        .insert([{ 
          materia_id: materiaId,
          duration: duration,
          date: new Date().toISOString()
        }])

      if (error) throw error
      
      alert('Sessão salva com sucesso!')
      setShowMateriaModal(false)
      fetchDashboardData()
    } catch (error) {
      console.error('Error saving session:', error)
    }
  }

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600)
    const mins = Math.floor((seconds % 3600) / 60)
    return `${hrs}h ${mins}m`
  }

  return (
    <div className="dashboard">
      <h1>Dashboard de Estudos</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Tempo Total de Estudo</h3>
          <p className="stat-value">{formatTime(totalStudyTime)}</p>
        </div>
      </div>
      
      <Timer onSave={handleSaveSession} />
      
      {/* Modal de seleção de matéria */}
      {showMateriaModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Selecione a Matéria</h3>
            <ul className="materia-list">
              {materias.map(materia => (
                <li 
                  key={materia.id}
                  onClick={() => confirmSaveSession(materia.id)}
                >
                  {materia.nome}
                  {materia.categoria && <span>{materia.categoria}</span>}
                </li>
              ))}
            </ul>
            <button onClick={() => setShowMateriaModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
      
      <style jsx>{`
        .dashboard {
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          
        }
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin: 2rem 0;
        }
        .stat-card {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          text-align: center;
        }
        .stat-card h3 {
          margin-top: 0;
          color: #7f8c8d;
          font-size: 1.1rem;
        }
        .stat-value {
          font-size: 2rem;
          font-weight: bold;
          color: #2c3e50;
          margin: 0.5rem 0 0;
        }
      `}</style>
    </div>
  )
}