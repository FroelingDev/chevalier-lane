import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold font-playfair">Chevalier Lane</h1>
    </div>
  )
}
