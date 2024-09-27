'use client'

import { Suspense, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import TrainDetails from '../../components/train-details'
import { Card, CardContent } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'

// Define or import TrainData type
type TrainData = {
  pnr: string
  trainNumber: string
  trainName: string
  // Add other properties expected in TrainData
}

export default function SelectStation() {
  // Set trainData to be TrainData | null
  const [trainData, setTrainData] = useState<TrainData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const searchParams = useSearchParams()
  const pnr = searchParams.get('pnr')

  useEffect(() => {
    const fetchTrainDetails = async () => {
      if (!pnr) {
        setError('No PNR provided')
        setLoading(false)
        return
      }

      try {
        const response = await fetch(`/api/train-details?pnr=${pnr}`)
        if (response.ok) {
          const data = await response.json()
          setTrainData({ ...data, pnr }) // Include PNR in the train data
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
  }, [pnr])

  return (
    <Suspense fallback={<LoadingSkeleton />}>

    <div className="container mx-auto p-4">
        {loading ? (
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-8 w-full mb-4" />
              <Skeleton className="h-6 w-3/4 mb-2" />
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        ) : error ? (
          <Card>
            <CardContent className="p-4">
              <p className="text-red-500">{error}</p>
            </CardContent>
          </Card>
        ) : (
          trainData && <TrainDetails data={trainData} /> // Only render TrainDetails if trainData is not null
        )}
    </div>
    </Suspense>

  )
}

function LoadingSkeleton() {
  return (
    <Suspense>

    <Card>
      <CardContent className="p-4">
        <Skeleton className="h-8 w-full mb-4" />
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-6 w-1/2 mb-2" />
        <Skeleton className="h-32 w-full" />
      </CardContent>
    </Card>
    </Suspense>

  )
}
