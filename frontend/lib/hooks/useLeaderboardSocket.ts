'use client'

import { useEffect, useRef, useState } from 'react'

export interface LeaderboardEntry {
  rank: number
  userId: string
  username: string
  avatarUrl?: string
  score: number
  accuracy: number
  percentile: number
  isCurrentUser: boolean
}

export function useLeaderboardSocket(mockId: string) {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([])
  const [connected, setConnected] = useState(false)
  const wsRef = useRef<WebSocket | null>(null)

  useEffect(() => {
    const wsUrl = `${process.env.NEXT_PUBLIC_WS_URL}/ws/leaderboard?mockId=${mockId}`
    const ws = new WebSocket(wsUrl)
    wsRef.current = ws

    ws.onopen = () => {
      setConnected(true)
    }

    ws.onclose = () => {
      setConnected(false)
    }

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        if (data.type === 'leaderboard_update') {
          setEntries(data.entries || [])
        }
      } catch (error) {
        console.error('Error parsing WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
      setConnected(false)
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }, [mockId])

  return { entries, connected }
}
