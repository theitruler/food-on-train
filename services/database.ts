import { databases, Query } from './appwrite';
import { ID } from 'appwrite';

const DATABASE_ID = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID as string;
const COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID as string;
const MENU_COLLECTION_ID = process.env.NEXT_PUBLIC_APPWRITE_MENU_COLLECTION_ID as string;

export interface CustomerData {
  name: string;
  phoneNumber: string;
  contactOnWhatsapp: boolean;
  email?: string;
  pnrNumber: string;
  berthNumber: string;
  seatNumber: string;
  paymentMethod: 'online' | 'cash';
  selectedStation: string;
  orderSummary?: OrderSummary;  // Make this optional
}

export interface MenuItem {
  $id: string;
  foodname: string;
  price: number;
  imageurl: string;
}

export interface OrderItem {
  foodname: string;
  quantity: number;
  price: number;
  totalPrice: number;
}

export interface OrderSummary {
  items: OrderItem[];
  totalItems: number;
  totalAmount: number;
  orderStatus: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  orderDate: string;
}

export const addCustomerData = async (data: CustomerData, pnr: string) => {
  try {
    // Create a new object without the email field
    const { email, ...dataWithoutEmail } = data;

    // Only add the email field if it's not empty
    const dataToSubmit = email ? { ...dataWithoutEmail, email } : dataWithoutEmail;

    const response = await databases.createDocument(
      DATABASE_ID,
      COLLECTION_ID,
      pnr,
      dataToSubmit
    );
    return response;
  } catch (error) {
    console.error('Error adding customer data:', error);
    throw error;
  }
};

export const getCustomerData = async (pnr: string): Promise<CustomerData> => {
  try {
    const response = await databases.getDocument(
      DATABASE_ID,
      COLLECTION_ID,
      pnr
    );
    
    // Parse the orderSummary if it exists
    const orderSummary = response.orderSummary 
      ? JSON.parse(response.orderSummary as string) 
      : undefined;
    
    // Explicitly cast and construct the CustomerData object
    const customerData: CustomerData = {
      name: response.name as string,
      phoneNumber: response.phoneNumber as string,
      contactOnWhatsapp: response.contactOnWhatsapp as boolean,
      email: response.email as string | undefined,
      pnrNumber: response.pnrNumber as string,
      berthNumber: response.berthNumber as string,
      seatNumber: response.seatNumber as string,
      paymentMethod: response.paymentMethod as 'online' | 'cash',
      selectedStation: response.selectedStation as string,
      orderSummary: orderSummary as OrderSummary | undefined,
    };

    return customerData;
  } catch (error) {
    console.error('Error getting customer data:', error);
    throw error;
  }
};

export const updateCustomerOrder = async (pnr: string, updatedOrder: OrderSummary) => {
  try {
    // Stringify the updated order summary
    const orderSummaryJson = JSON.stringify(updatedOrder);

    const response = await databases.updateDocument(
      DATABASE_ID,
      COLLECTION_ID,
      pnr,
      {
        orderSummary: orderSummaryJson, // Store as a string
      }
    );
    return response;
  } catch (error) {
    console.error('Error updating customer order:', error);
    throw error;
  }
};

export const getMenuItems = async (): Promise<MenuItem[]> => {
  try {
    const response = await databases.listDocuments(
      DATABASE_ID,
      MENU_COLLECTION_ID
    );
    
    // Map the documents to MenuItem objects
    const menuItems: MenuItem[] = response.documents.map(doc => ({
      $id: doc.$id,
      foodname: doc.foodname as string,
      price: doc.price as number,
      imageurl: doc.imageurl as string
    }));

    return menuItems;
  } catch (error) {
    console.error('Error fetching menu items:', error);
    throw error;
  }
};

// New function to delete customer data
export const deleteCustomerData = async (pnr: string): Promise<void> => {
  try {
    await databases.deleteDocument(
      DATABASE_ID,
      COLLECTION_ID,
      pnr
    );
  } catch (error) {
    console.error('Error deleting customer data:', error);
    throw error;
  }
};

