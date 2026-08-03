import { Route, Routes } from 'react-router-dom'
import { HomePage } from '../pages/HomePage'
import { InboxPage } from '../pages/InboxPage'
import { WritePage } from '../pages/WritePage'

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/write" element={<WritePage />} />
      <Route path="/inbox" element={<InboxPage />} />
    </Routes>
  )
}
