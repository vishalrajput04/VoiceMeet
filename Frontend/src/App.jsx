import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { MeetingProvider } from './context/MeetingContext.jsx'
import AppRoutes from './routes/AppRoutes.jsx'

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <MeetingProvider>
          <AppRoutes />
        </MeetingProvider>
      </AuthProvider>
    </BrowserRouter>
  )
}
