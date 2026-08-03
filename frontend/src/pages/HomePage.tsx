import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { HomeStage, type HomeMood } from '../components/home/HomeStage'
import { Button } from '../components/ui/Button'

export function HomePage() {
  const navigate = useNavigate()
  const [mood, setMood] = useState<HomeMood>('idle')

  function handleSendPreview() {
    if (mood !== 'idle') return
    setMood('sending')
  }

  function handleReceivePreview() {
    if (mood !== 'idle') return
    setMood('receiving')
  }

  return (
    <HomeStage
      mood={mood}
      onSendComplete={() => navigate('/write')}
      onReceiveComplete={() => navigate('/inbox')}
      actions={
        <>
          <Button
            type="button"
            variant="primary"
            disabled={mood !== 'idle'}
            onClick={handleSendPreview}
          >
            별 보내기
          </Button>
          <Button
            type="button"
            variant="ghost"
            disabled={mood !== 'idle'}
            onClick={handleReceivePreview}
          >
            별 받기
          </Button>
        </>
      }
    />
  )
}
