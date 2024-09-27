"use client"
import React, { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { getCustomerData, CustomerData, OrderSummary, deleteCustomerData, updateCustomerOrder } from '@/services/database';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog";

function TrackOrderContent() {
  const [pnr, setPnr] = useState('');
  const [orderDetails, setOrderDetails] = useState<CustomerData | null>(null);
  const [error, setError] = useState('');
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const queryPnr = urlParams.get('pnr');
    if (queryPnr) {
      setPnr(queryPnr);
      handleSearch(queryPnr);
    }
  }, []);

  const handleSearch = async (searchPnr: string) => {
    setError('');
    setOrderDetails(null);

    try {
      const data = await getCustomerData(searchPnr);
      setOrderDetails(data);
      window.history.pushState(null, '', `${window.location.pathname}?pnr=${searchPnr}`);
    } catch (err) {
      console.error('Error fetching order:', err);
      setError('Order not found');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(pnr);
  };

  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus === 'confirmed') return 'bg-green-500 hover:bg-green-600';
    if (lowerStatus === 'pending') return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-gray-500 hover:bg-gray-600';
  };

  const renderOrderSummary = (summary: OrderSummary) => {
    return (
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {summary.items.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.foodname}</TableCell>
                  <TableCell>{item.quantity}</TableCell>
                  <TableCell>₹{item.price}</TableCell>
                  <TableCell>₹{item.totalPrice}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="mt-4 space-y-2">
            <p>Total Items: {summary.totalItems}</p>
            <p>Total Amount: ₹{summary.totalAmount}</p>
            <p>
              Order Status: 
              <Badge className={`ml-2 ${getStatusColor(summary.orderStatus)}`}>
                {summary.orderStatus}
              </Badge>
            </p>
          </div>
        </CardContent>
      </Card>
    );
  };

  const parseSummary = (summary: string | OrderSummary): OrderSummary => {
    if (typeof summary === 'string') {
      try {
        return JSON.parse(summary);
      } catch (error) {
        console.error('Error parsing order summary:', error);
        return {} as OrderSummary;
      }
    }
    return summary;
  };

  const handleCancelOrder = async () => {
    if (!orderDetails) return;

    try {
      await deleteCustomerData(orderDetails.pnrNumber);
      window.location.href = '/order';
    } catch (error) {
      console.error('Error cancelling order:', error);
      setError('Failed to cancel order. Please try again.');
    }
  };

  const handleConfirmOrder = async () => {
    if (!orderDetails || !orderDetails.orderSummary) return;

    try {
      const updatedSummary = parseSummary(orderDetails.orderSummary);
      updatedSummary.orderStatus = 'confirmed';
      await updateCustomerOrder(orderDetails.pnrNumber, updatedSummary);
      await handleSearch(orderDetails.pnrNumber);
    } catch (error) {
      console.error('Error confirming order:', error);
      setError('Failed to confirm order. Please try again.');
    }
  };

  return (
    <div className="container mx-auto p-4 max-w-3xl">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <Input
          type="text"
          value={pnr}
          onChange={(e) => setPnr(e.target.value)}
          placeholder="Enter PNR Number"
          required
        />
        <Button type="submit">Search</Button>
      </form>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            {error}
            {error === 'Order not found' && (
              <p className="mt-2">
                You have not ordered yet.{' '}
                <Link href="/order" className="text-blue-500 underline">
                  Order now
                </Link>
              </p>
            )}
          </AlertDescription>
        </Alert>
      )}

      {orderDetails && orderDetails.orderSummary && (
        <Card className="relative">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <p><strong>Name:</strong> {orderDetails.name}</p>
              <p><strong>Phone Number:</strong> {orderDetails.phoneNumber}</p>
              {orderDetails.email && orderDetails.email !== "noemail@gmail.com" && (
                <p><strong>Email:</strong> {orderDetails.email}</p>
              )}
              <p><strong>PNR Number:</strong> {orderDetails.pnrNumber}</p>
              <p><strong>Berth Number:</strong> {orderDetails.berthNumber}</p>
              <p><strong>Seat Number:</strong> {orderDetails.seatNumber}</p>
              <p><strong>Payment Method:</strong> {orderDetails.paymentMethod}</p>
              <p><strong>Selected Station:</strong> {orderDetails.selectedStation}</p>
            </div>
            {renderOrderSummary(parseSummary(orderDetails.orderSummary))}
          </CardContent>
          <CardFooter className="flex justify-end mt-4">
            {parseSummary(orderDetails.orderSummary).orderStatus === 'pending' ? (
              <Button onClick={handleConfirmOrder}>Confirm Order</Button>
            ) : (
              <Button variant="destructive" onClick={() => setIsConfirmOpen(true)}>Cancel Order</Button>
            )}
          </CardFooter>
        </Card>
      )}

      <AlertDialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to cancel this order?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelOrder}>Confirm Cancel</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default function TrackOrder() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TrackOrderContent />
    </Suspense>
  );
}