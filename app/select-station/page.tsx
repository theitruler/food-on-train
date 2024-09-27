'use client'

import { Suspense, useEffect, useState } from 'react'
import TrainDetails from '../../components/train-details'
import { Card, CardContent } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'

type TrainData = {
  pnr: string
  trainNumber: string
  trainName: string
  // Add other properties expected in TrainData
}

function SelectStationContent() {
  const [trainData, setTrainData] = useState<TrainData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrainDetails = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const pnr = urlParams.get('pnr');

      if (!pnr) {
        setError('No PNR provided')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/train-details?pnr=${pnr}`)
        if (response.ok) {
          const data = await response.json()
          setTrainData({ ...data, pnr })
        } else {
          setError('Failed to fetch train details')
        }
      } catch (error) {
        console.error('Error:', error)
        setError('An error occurred while fetching train details')
      } finally {
        setLoading(false)
      }
    }

    fetchTrainDetails()
  }, [])

  if (loading) {
    return <LoadingSkeleton />
  }

  if (error) {
    return (
      <Card>
        <CardContent className="p-4">
          <p className="text-red-500">{error}</p>
        </CardContent>
      </Card>
    )
  }

  return trainData ? <TrainDetails data={trainData} /> : null
}

export default function SelectStation() {
  return (
    <Suspense fallback={<LoadingSkeleton />}>
      <div className="container mx-auto p-4">
        <SelectStationContent />
      </div>
    </Suspense>
  )
}

function LoadingSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
  )
}