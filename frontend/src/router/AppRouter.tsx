import { Route, Routes } from 'react-router-dom'
import { WorldLayout } from '../layouts/WorldLayout'
import { InboxPage } from '../pages/InboxPage'
import { WritePage } from '../pages/WritePage'

export function AppRouter() {
  return (
    <Routes>
      <Route element={<WorldLayout />}>
        <Route index element={null} />
        <Route path="write" element={<WritePage />} />
        <Route path="inbox" element={<InboxPage />} />
      </Route>
    </Routes>
  )
}
