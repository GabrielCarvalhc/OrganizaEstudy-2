// components/MateriaList.js
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function MateriaList() {
  const [materias, setMaterias] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchMaterias()
  }, [])

  const fetchMaterias = async () => {
    try {
      setLoading(true)
      let query = supabase.from('materias').select('*')

      if (search) {
        query = query.ilike('nome', `%${search}%`)
      }

      const { data, error } = await query.order('created_at', { ascending: false })

      if (error) throw error
      setMaterias(data || [])
    } catch (error) {
      console.error('Error fetching materias:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta matéria?')) return
    
    try {
      const { error } = await supabase.from('materias').delete().eq('id', id)
      if (error) throw error
      setMaterias(materias.filter(materia => materia.id !== id))
    } catch (error) {
      console.error('Error deleting materia:', error)
    }
  }

  return (
    <div className="materia-list">
      <div className="search-container">
        <input
          type="text"
          placeholder="Buscar matérias..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyUp={(e) => e.key === 'Enter' && fetchMaterias()}
        />
        <button onClick={fetchMaterias}>Buscar</button>
      </div>
      
      {loading ? (
        <p>Carregando matérias...</p>
      ) : materias.length === 0 ? (
        <p>Nenhuma matéria encontrada.</p>
      ) : (
        <ul>
          {materias.map((materia) => (
            <li key={materia.id} className="materia-item">
              <div className="materia-info">
                <h3>{materia.nome}</h3>
                {materia.categoria && <span className="categoria">{materia.categoria}</span>}
              </div>
              <button 
                onClick={() => handleDelete(materia.id)}
                className="delete-btn"
              >
                Excluir
              </button>
            </li>
          ))}
        </ul>
      )}
      <style jsx>{`
        .materia-list {
          max-width: 800px;
          margin: 2rem auto;
          
          padding: 0 1rem;
        }
        .search-container {
          display: flex;
          margin-bottom: 1rem;
          gap: 0.5rem;
        }
        .search-container input {
          flex: 1;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          background: rgb(255, 255, 255);
        }
        .search-container button {
          padding: 0.5rem 1rem;
          background: #3498db;
          color: white;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        ul {
          list-style: none;
          padding: 0;
        }
        .materia-item {
          background: white;
          padding: 1rem;
          margin-bottom: 0.5rem;
          border-radius: 4px;
          box-shadow: 0 1px 3px rgba(0,0,0,0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .materia-info h3 {
          margin: 0;
          color: #2c3e50;
        }
        .categoria {
          display: inline-block;
          background: #ecf0f1;
          color: #7f8c8d;
          padding: 0.2rem 0.5rem;
          border-radius: 12px;
          font-size: 0.8rem;
          margin-top: 0.3rem;
        }
        .delete-btn {
          background: #e74c3c;
          color: white;
          border: none;
          padding: 0.3rem 0.8rem;
          border-radius: 4px;
          cursor: pointer;
          transition: background 0.3s;
        }
        .delete-btn:hover {
          background: #c0392b;
        }
        @media (max-width: 600px) {
          .materia-item {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
          
        }
      `}</style>
    </div>
  )
}