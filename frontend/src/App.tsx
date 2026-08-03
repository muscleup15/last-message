import { BrowserRouter } from 'react-router-dom'
import { AppShell } from './layouts/AppShell'
import { AppRouter } from './router/AppRouter'

function App() {
  return (
    <BrowserRouter>
      <AppShell>
        <AppRouter />
      </AppShell>
    </BrowserRouter>
  )
}

export default App
