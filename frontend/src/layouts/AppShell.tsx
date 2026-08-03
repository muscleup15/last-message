import type { ReactNode } from 'react'
import { NightSky } from '../components/sky/NightSky'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <div className="app-stage">
        <NightSky>
          <div className="app-content">{children}</div>
        </NightSky>
      </div>
    </div>
  )
}
