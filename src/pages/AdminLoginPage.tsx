import { useNavigate } from 'react-router-dom'
import { LoginScreen } from '../components/admin/LoginScreen'

export function AdminLoginPage() {
  const navigate = useNavigate()

  return (
    <LoginScreen
      onLogin={() => navigate('/admin/panel')}
      onBack={() => navigate('/')}
    />
  )
}
