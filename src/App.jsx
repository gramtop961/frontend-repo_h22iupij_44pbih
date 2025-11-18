import React, { useState } from 'react'
import Header from './components/Header'
import BillForm from './components/BillForm'
import Result from './components/Result'

function App() {
  const [result, setResult] = useState(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(59,130,246,0.05),transparent_50%)]" />

      <div className="relative min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-3xl">
          <Header />

          <div className="bg-slate-800/50 backdrop-blur-sm border border-blue-500/20 rounded-2xl p-6 shadow-xl">
            <BillForm onResult={setResult} />
            <Result result={result} />
          </div>

          <p className="text-center text-blue-300/60 text-xs mt-6">
            Inserisci i dati del conto, i partecipanti e la percentuale di sconto per i figli.
          </p>
        </div>
      </div>
    </div>
  )
}

export default App
