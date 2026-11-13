import { Route, Routes } from 'react-router-dom'
import AppShell from '../pages/AppShell.jsx'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppShell />} />
      <Route path="/meetings" element={<AppShell />} />
      <Route path="/contacts" element={<AppShell />} />
      <Route path="/settings" element={<AppShell />} />
      <Route path="/meeting/:meetingId" element={<AppShell />} />
      <Route path="*" element={<AppShell />} />
    </Routes>
  )
}
