"use client"
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { Loader2 } from 'lucide-react'
import { getCustomerData } from '../services/database'

export default function PNRForm() {
  const [pnr, setPnr] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderTaken, setOrderTaken] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setOrderTaken(false)

    try {
      // First, check if the PNR exists in the database
      const customerData = await getCustomerData(pnr)
      
      if (customerData && customerData.orderSummary) {
        // If orderSummary exists, it means an order has already been taken
        setOrderTaken(true)
        setIsLoading(false)
        return
      }

      // If no existing order, proceed with fetching train details
      const response = await fetch(`/api/train-details?pnr=${pnr}`)
      if (response.ok) {
        router.push(`/select-station?pnr=${pnr}`)
      } else {
        console.error('Failed to fetch train details')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Failed to fetch train details', error)
      try {
        const response = await fetch(`/api/train-details?pnr=${pnr}`)
        if (response.ok) {
          router.push(`/select-station?pnr=${pnr}`)
        } else {
          console.error('Failed to fetch train details')
          setIsLoading(false)
        }
      } catch (fetchError) {
        console.error('Error:', fetchError)
        setIsLoading(false)
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md">
      <div className="flex flex-col space-y-4">
        <Input
          type="text"
          placeholder="Enter PNR Number"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          required
          disabled={isLoading}
        />
        {orderTaken && (
          <p className="text-red-500 text-sm">Order already taken for this PNR.</p>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Loading...
            </>
          ) : (
            'Get Train Details'
          )}
        </Button>
      </div>
    </form>
  )
}