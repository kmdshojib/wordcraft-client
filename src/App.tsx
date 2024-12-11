import React from 'react'
import './App.css'
import Layout from './Layout/Layout';
import { useAppContext } from './hooks/useAppContext';

const App: React.FC = () => {
  const { user } = useAppContext()
  console.log(user)
  return (
    <div>
      <Layout />
    </div>
  )
}

export default App