'use client'

import { Suspense, useEffect, useState } from 'react'
import TrainDetails from '../../components/train-details'
import { Card, CardContent } from '../../components/ui/card'
import { Skeleton } from '../../components/ui/skeleton'
import { Alert, AlertDescription } from '../../components/ui/alert'

type TrainData = {
  pnr: string
  trainNumber: string
  trainName: string
  // Add other properties expected in TrainData
}

function OrderNote() {
  return (
    <Alert className="mb-4 text-red-500">
      <AlertDescription>
        Please order food at least 2 hours before reaching the station. Orders placed later may not be processed.
      </AlertDescription>
    </Alert>
  )
}

function SelectStationContent() {
  const [trainData, setTrainData] = useState<TrainData | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTrainDetails = async () => {
      try {
        // Use a relative URL instead of constructing an absolute URL
        const pnr = new URLSearchParams(window.location.search).get('pnr')

        if (!pnr) {
          setError('No PNR provided')
          setLoading(false)
          return
        }

        const response = await fetch(`/api/train-details?pnr=${pnr}`)
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        const data = await response.json()
        setTrainData({ ...data, pnr })
      } catch (error) {
        console.error('Error fetching train details:', error)
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
        <OrderNote />
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