import { BrandTitle } from './components/brand/BrandTitle'
import { AppShell } from './layouts/AppShell'

function App() {
  return (
    <AppShell>
      <div className="flex flex-1 flex-col items-center justify-center text-center">
        <BrandTitle />
        <p
          className="mt-4 max-w-[18rem] text-[0.9375rem] text-[var(--text-muted)]"
          style={{
            animation: 'brand-rise var(--duration-enter) var(--ease-out-soft) 220ms both',
          }}
        >
          시간이 지나도 닿는 말
        </p>
      </div>
    </AppShell>
  )
}

export default App
