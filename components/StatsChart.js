// components/StatsChart.js
import { useState, useEffect, useRef } from 'react'
import { supabase } from '../lib/supabase'

export default function StatsChart() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const canvasRef = useRef(null)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      setLoading(true);
      
      // Consulta CORRETA para agrupamento no Supabase
      const { data, error } = await supabase
        .from('study_sessions')
        .select(`
          materia_id,
          materias(nome),
          duration
        `)
        .order('duration', { ascending: false })
        .limit(5);
  
      if (error) throw error;
  
      // Processamento manual dos dados
      const groupedData = data.reduce((acc, session) => {
        const existing = acc.find(item => item.materia_id === session.materia_id);
        if (existing) {
          existing.sum += session.duration;
        } else {
          acc.push({
            materia_id: session.materia_id,
            materias: session.materias,
            sum: session.duration
          });
        }
        return acc;
      }, []);
  
      setData(groupedData);
      
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!data.length || !canvasRef.current) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    
    // Configurações do gráfico
    const margin = 20
    const maxBarHeight = canvas.height - 2 * margin
    const barWidth = 40
    const gap = 30
    const maxValue = Math.max(...data.map(item => item.sum))
    
    // Desenhar gráfico
    data.forEach((item, index) => {
      const x = margin + index * (barWidth + gap)
      const barHeight = (item.sum / maxValue) * maxBarHeight
      
      ctx.fillStyle = `hsl(${index * 70}, 70%, 50%)`
      ctx.fillRect(x, canvas.height - margin - barHeight, barWidth, barHeight)
      
      // Rótulos
      ctx.fillStyle = '#2c3e50'
      ctx.font = '12px Arial'
      ctx.textAlign = 'center'
      ctx.fillText(
        item.materias.nome.substring(0, 10) + (item.materias.nome.length > 10 ? '...' : ''),
        x + barWidth / 2,
        canvas.height - margin + 15
      )
      
      const hours = Math.floor(item.sum / 3600)
      const mins = Math.floor((item.sum % 3600) / 60)
      ctx.fillText(
        `${hours}h ${mins}m`,
        x + barWidth / 2,
        canvas.height - margin - barHeight - 5
      )
    })
  }, [data])

  return (
    <div className="stats-container">
      <h2 style={{ color: '#7f8c8d' }}>Matérias Mais Estudadas</h2>
      {loading ? (
        <p>Carregando estatísticas...</p>
      ) : data.length === 0 ? (
        <p style={{ color: '#7f8c8d' }}>Nenhum dado de estudo disponível</p>
      ) : (
        <>
          <canvas 
            ref={canvasRef} 
            width={Math.min(800, data.length * 70 + 40)} 
            height={300}
            className="chart-canvas"
          />
          <button onClick={fetchStats} className="refresh-btn">
            Atualizar Gráfico
          </button>
        </>
      )}
      <style jsx>{`
        .stats-container {
          background: white;
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(3, 3, 3, 0.1);
          margin: 2rem auto;
          max-width: 800px;
          text-align: center;
        }
        .chart-canvas {
          display: block;
          margin: 1rem auto;
          max-width: 100%;
        }
        .refresh-btn {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 1rem;
        }
        .refresh-btn:hover {
          background: #2980b9;
        }
      `}</style>
    </div>
  )
}