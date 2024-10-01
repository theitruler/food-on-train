"use client"
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { getMenuItems, MenuItem, getCustomerData, CustomerData, updateCustomerOrder, OrderItem, OrderSummary } from '../../services/database'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { X, Loader2 } from 'lucide-react'
import { toast } from 'react-hot-toast'
import { Suspense } from 'react'
import MenuCard from '../../components/menu-card'

interface MenuItemWithQuantity extends MenuItem {
  quantity: number;
}

const CartPanel = ({ 
  isOpen, 
  onClose, 
  customerData, 
  selectedItems, 
  totalAmount,
  totalItems,
  onConfirmOrder
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  customerData: CustomerData | null; 
  selectedItems: MenuItemWithQuantity[]; 
  totalAmount: number;
  totalItems: number;
  onConfirmOrder: () => Promise<void>;
}) => {
  const [isConfirming, setIsConfirming] = useState(false);

  if (!isOpen) return null;

  const handleConfirmClick = async () => {
    setIsConfirming(true);
    try {
      await onConfirmOrder();
    } finally {
      setIsConfirming(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-white z-50 overflow-y-auto md:inset-y-0 md:right-0 md:left-auto md:w-80 shadow-lg">
      <div className="p-4">
        <Button 
          onClick={onClose} 
          className="absolute top-2 right-2 p-1 md:left-2 md:right-auto"
          variant="ghost"
        >
          <X size={20} />
        </Button>
        <h2 className="text-xl font-bold mb-3 mt-6">Order Summary</h2>
        
        {customerData && (
          <div className="mb-4">
            <h3 className="text-lg font-semibold mb-1">Customer Details</h3>
            <p><strong>Name:</strong> {customerData.name}</p>
            <p><strong>PNR:</strong> {customerData.pnrNumber}</p>
            <p><strong>Seat:</strong> {customerData.seatNumber}</p>
            <p><strong>Station:</strong> {customerData.selectedStation}</p>
          </div>
        )}
        
        <h3 className="text-lg font-semibold mb-2">Order Items</h3>
        {selectedItems.map((item) => (
          <div key={item.$id} className="mb-2">
            <p>{item.foodname}</p>
            <p className="text-sm text-gray-600">
              Quantity: {item.quantity} x ₹{item.price} = ₹{(item.quantity * item.price).toFixed(2)}
            </p>
          </div>
        ))}
        
        <div className="mt-3 pt-3 border-t">
          <p><strong>Total Items:</strong> {totalItems}</p>
          <p className="text-lg font-bold">Total Amount: ₹{totalAmount.toFixed(2)}</p>
        </div>
        
        {customerData && (
          <div className="mt-3">
            <p><strong>Payment Method:</strong> {customerData.paymentMethod}</p>
          </div>
        )}

        <Button 
          className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
          onClick={handleConfirmClick}
          disabled={isConfirming}
        >
          {isConfirming ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Confirming...
            </>
          ) : (
            'Confirm Order'
          )}
        </Button>
      </div>
    </div>
  );
};

const MenuContent = () => {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pnr = searchParams.get('pnr')

  const [menuItems, setMenuItems] = useState<MenuItemWithQuantity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalItems, setTotalItems] = useState(0)
  const [totalAmount, setTotalAmount] = useState(0)
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        if (pnr) {
          const customer = await getCustomerData(pnr)
          setCustomerData(customer)
          
          // Check if the order is already confirmed
          if (customer.orderSummary && customer.orderSummary.orderStatus === 'confirmed') {
            setOrderConfirmed(true)
            setLoading(false)
            return
          }
        }

        const items = await getMenuItems()
        setMenuItems(items.map(item => ({ ...item, quantity: 0 })))
      } catch (err) {
        setError('Failed to fetch data')
        console.error(err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [pnr])

  useEffect(() => {
    const total = menuItems.reduce((sum, item) => sum + item.quantity, 0)
    const amount = menuItems.reduce((sum, item) => sum + (item.quantity * item.price), 0)
    setTotalItems(total)
    setTotalAmount(amount)
  }, [menuItems])

  const handleIncrement = (id: string) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.$id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    )
  }

  const handleDecrement = (id: string) => {
    setMenuItems(prevItems =>
      prevItems.map(item =>
        item.$id === id && item.quantity > 0 ? { ...item, quantity: item.quantity - 1 } : item
      )
    )
  }

  const toggleCartAndUpdateOrder = () => {
    setIsCartOpen(true)
    handleUpdateOrder()
  }

  const handleUpdateOrder = async () => {
    if (!pnr || !customerData) {
      return
    }

    const orderItems: OrderItem[] = menuItems
      .filter(item => item.quantity > 0)
      .map(item => ({
        foodname: item.foodname,
        quantity: item.quantity,
        price: item.price,
        totalPrice: item.quantity * item.price
      }))

    const orderSummary: OrderSummary = {
      items: orderItems,
      totalItems: totalItems,
      totalAmount: totalAmount,
      orderStatus: 'pending',
      orderDate: new Date().toISOString()
    }

    try {
      await updateCustomerOrder(pnr, orderSummary)
    } catch (error) {
      console.error('Error updating order:', error)
      toast.error('Failed to update order')
    }
  }

  const handleConfirmOrder = async () => {
    if (!pnr || !customerData) {
      toast.error('Unable to confirm order. Missing customer data.')
      return
    }

    try {
      await updateCustomerOrder(pnr, {
        items: menuItems.filter(item => item.quantity > 0).map(item => ({
          foodname: item.foodname,
          quantity: item.quantity,
          price: item.price,
          totalPrice: item.quantity * item.price
        })),
        totalItems,
        totalAmount,
        orderStatus: 'confirmed',
        orderDate: new Date().toISOString()
      })
      router.push('/ordertaken')
    } catch (error) {
      console.error('Error confirming order:', error)
      toast.error('Failed to confirm order')
    }
  }

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  if (orderConfirmed) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center h-screen">
        <Card className="w-full max-w-md">
          <CardContent className="p-6">
            <h2 className="text-2xl font-bold text-center mb-4">Order Already Confirmed</h2>
            <p className="text-center mb-4">You have already placed and confirmed an order for this PNR.</p>
            <Button 
              className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white"
              onClick={() => router.push(`/trackorder?pnr=${pnr}`)}
            >
              Track Your Order
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const selectedItems = menuItems.filter(item => item.quantity > 0)

  return (
    <div className={`container mx-auto p-4 pb-24 ${isCartOpen ? 'md:pr-80' : ''}`}>
      {customerData && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Customer Details</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Name:</strong> {customerData.name}</p>
            <p><strong>PNR:</strong> {customerData.pnrNumber}</p>
            <p><strong>Seat:</strong> {customerData.seatNumber}</p>
            <p><strong>Station:</strong> {customerData.selectedStation}</p>
          </CardContent>
        </Card>
      )}

      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {menuItems.map((item) => (
          <MenuCard
            key={item.$id}
            item={item}
            onIncrement={() => handleIncrement(item.$id)}
            onDecrement={() => handleDecrement(item.$id)}
          />
        ))}
      </div>
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-green-500 text-white py-3 px-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-sm font-semibold">Total items: {totalItems}</span>
            <Button 
              onClick={toggleCartAndUpdateOrder}
              className="bg-white text-green-500 hover:bg-green-100 text-sm py-1 px-3"
            >
              View Cart
            </Button>
          </div>
          <div className="text-sm font-semibold">
            Total amount: ₹{totalAmount.toFixed(2)}
          </div>
        </div>
      )}
      <CartPanel 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        customerData={customerData} 
        selectedItems={selectedItems}
        totalAmount={totalAmount}
        totalItems={totalItems}
        onConfirmOrder={handleConfirmOrder}
      />
    </div>
  )
}

export default function MenuPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MenuContent />
    </Suspense>
  )
}