// pages/api/materias.js
import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase
        .from('materias')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      res.status(200).json(data)
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === 'POST') {
    try {
      const { nome, categoria } = req.body
      
      if (!nome) {
        return res.status(400).json({ error: 'Nome da matéria é obrigatório' })
      }

      const { data, error } = await supabase
        .from('materias')
        .insert([{ nome, categoria }])
        .select()

      if (error) throw error
      res.status(201).json(data[0])
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else if (req.method === 'DELETE') {
    try {
      const { id } = req.query
      
      if (!id) {
        return res.status(400).json({ error: 'ID da matéria é obrigatório' })
      }

      const { error } = await supabase
        .from('materias')
        .delete()
        .eq('id', id)

      if (error) throw error
      res.status(200).json({ success: true })
    } catch (error) {
      res.status(500).json({ error: error.message })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}