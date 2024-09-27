import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { CheckCircle } from 'lucide-react'
import Link from 'next/link'

export default function OrderTakenPage() {
  return (
    <div className="container mx-auto p-4 flex items-center justify-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex items-center justify-center mb-4">
            <CheckCircle className="text-green-500" size={48} />
          </div>
          <CardTitle className="text-2xl font-bold text-center">Order Confirmed!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center mb-6">
            Thank you for your order. Your delicious meal is being prepared and will be delivered to your seat shortly.
          </p>
          <p className="text-center mb-6">
            We hope you enjoy your journey and your meal. If you need any assistance, please don&apos;t hesitate to ask our staff.
          </p>
          <div className="flex justify-center space-x-4">
            <Link href="/">
              <Button className="bg-green-500 hover:bg-green-600 text-white">
                Back to Home
              </Button>
            </Link>
            <Link href="/trackorder">
              <Button variant="outline" className="border-black text-black hover:bg-gray-100">
                Track Order
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}