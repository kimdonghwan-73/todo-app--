import { useState, useEffect } from 'react'
import axios from 'axios'

const API = 'http://localhost:5000/api/todos'

function App() {
  const [todos, setTodos] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    axios.get(API).then(res => setTodos(res.data))
  }, [])

  const addTodo = async () => {
    if (!input.trim()) return
    const res = await axios.post(API, { title: input })
    setTodos([...todos, res.data])
    setInput('')
  }

  const toggleTodo = async (todo) => {
    const res = await axios.put(`${API}/${todo._id}`, { completed: !todo.completed })
    setTodos(todos.map(t => t._id === todo._id ? res.data : t))
  }

  const deleteTodo = async (id) => {
    await axios.delete(`${API}/${id}`)
    setTodos(todos.filter(t => t._id !== id))
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', fontFamily: 'sans-serif' }}>
      <h1>📝 Todo List</h1>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && addTodo()}
          placeholder="할 일 입력..."
          style={{ flex: 1, padding: '8px', fontSize: '16px' }}
        />
        <button onClick={addTodo} style={{ padding: '8px 16px', fontSize: '16px' }}>추가</button>
      </div>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {todos.map(todo => (
          <li key={todo._id} style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input type="checkbox" checked={todo.completed} onChange={() => toggleTodo(todo)} />
            <span style={{ flex: 1, textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.title}
            </span>
            <button onClick={() => deleteTodo(todo._id)} style={{ color: 'red' }}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App