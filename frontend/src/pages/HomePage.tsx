import { useNavigate } from 'react-router-dom'
import { HomeStage } from '../components/home/HomeStage'
import { Button } from '../components/ui/Button'

export function HomePage() {
  const navigate = useNavigate()

  return (
    <HomeStage
      actions={
        <>
          <Button type="button" variant="primary" onClick={() => navigate('/write')}>
            별 보내기
          </Button>
          <Button type="button" variant="ghost" onClick={() => navigate('/inbox')}>
            별 받기
          </Button>
        </>
      }
    />
  )
}
