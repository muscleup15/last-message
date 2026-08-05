import type { ReactNode } from 'react'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <div className="app-stage relative flex flex-col overflow-hidden">{children}</div>
    </div>
  )
}
