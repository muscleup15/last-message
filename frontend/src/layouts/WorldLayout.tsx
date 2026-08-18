import { Outlet, useLocation } from 'react-router-dom'
import { HomeBackdrop } from '../components/home/HomeBackdrop'
import { ShootingStars } from '../components/home/ShootingStars'
import { HomePage } from '../pages/HomePage'

export function WorldLayout() {
  const { pathname } = useLocation()
  const isSheet = pathname === '/write' || pathname === '/inbox'
  const isOauthCallback = pathname === '/oauth/kakao'

  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden">
      <HomeBackdrop />
      <ShootingStars />

      {!isOauthCallback ? (
        <div
          className={`relative z-10 flex min-h-0 flex-1 flex-col ${
            isSheet ? 'pointer-events-none select-none' : ''
          }`}
          aria-hidden={isSheet}
        >
          <HomePage />
        </div>
      ) : (
        <div className="relative z-10 flex min-h-0 flex-1 flex-col">
          <Outlet />
        </div>
      )}

      {!isOauthCallback ? <Outlet /> : null}
    </div>
  )
}
