import type { ReactNode } from 'react'
import { NightSky } from '../components/sky/NightSky'

type AppShellProps = {
  children: ReactNode
}

export function AppShell({ children }: AppShellProps) {
  return (
    <NightSky>
      <div
        className="mx-auto flex min-h-svh w-full flex-col"
        style={{
          maxWidth: 'var(--content-max)',
          paddingInline: 'var(--space-page)',
          paddingBlock: 'var(--space-page)',
        }}
      >
        {children}
      </div>
    </NightSky>
  )
}
