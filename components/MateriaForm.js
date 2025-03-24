// components/MateriaForm.js
import { useState } from 'react'
import { supabase } from '../lib/supabase'

export default function MateriaForm({ onAdd }) {
  const [nome, setNome] = useState('')
  const [categoria, setCategoria] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    // Validação simples
    if (!nome.trim()) {
      setError('O nome da matéria é obrigatório')
      setLoading(false)
      return
    }

    try {
      const { data, error: insertError } = await supabase
        .from('materias')
        .insert([{ nome, categoria }])
        .select()

      if (insertError) throw insertError

      onAdd(data[0])
      setNome('')
      setCategoria('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="materia-form">
      <h2>Adicionar Nova Matéria</h2>
      {error && <p className="error">{error}</p>}
      <div className="form-group">
        <label htmlFor="nome">Nome da Matéria:</label>
        <input
          type="text"
          id="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="categoria">Categoria (opcional):</label>
        <input
          type="text"
          id="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        />
      </div>
      <button type="submit" disabled={loading}>
        {loading ? 'Adicionando...' : 'Adicionar Matéria'}
      </button>
      <style jsx>{`
        .materia-form {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgb(255, 255, 255);
          max-width: 500px;
          margin: 2rem auto;
        
        }
        .materia-form h2 {
          margin-top: 0;
          color:rgb(0, 0, 0);
          
        }
        .form-group {
          margin-bottom: 1rem;
        }
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
          color:rgb(3, 3, 3);
          
        }
        input {
          width: 100%;
          padding: 0.5rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          background: rgb(255, 255, 255);
        }
        button {
          background: #3498db;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          cursor: pointer;
          font-size: 1rem;
          transition: background 0.3s;
        }
        button:hover {
          background: #2980b9;
        }
        button:disabled {
          background: #95a5a6;
          cursor: not-allowed;
        }
        .error {
          color: #e74c3c;
          margin-bottom: 1rem;
        }
      `}</style>
    </form>
  )
}