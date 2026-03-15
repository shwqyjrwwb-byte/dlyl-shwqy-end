"use client"

import { useState } from "react"

export default function TestApiPage() {
  const [result, setResult] = useState<string>("")

  const testApi = async () => {
    try {
      const response = await fetch('/api/clients-from-folders')
      const data = await response.json()
      setResult(JSON.stringify(data, null, 2))
    } catch (error) {
      setResult(`Error: ${error}`)
    }
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Test API</h1>
      <button 
        onClick={testApi}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Test API
      </button>
      <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
        {result || "Click button to test API"}
      </pre>
    </div>
  )
}
