import React from 'react';
import PNRForm from '../../components/pnr-form';
import { Utensils, Clock, Train } from 'lucide-react';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <div className="flex items-center mb-4">
      <div className="bg-indigo-100 p-3 rounded-full mr-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
    </div>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-indigo-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-indigo-900 sm:text-5xl md:text-6xl mb-4">
            Order Delicious Food for Your Journey
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Enjoy restaurant-quality meals delivered right to your train seat. Simple, convenient, and tasty!
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-12">
          <div className="bg-indigo-600 px-6 py-4">
            <h2 className="text-2xl font-bold text-white">Start Your Order</h2>
          </div>
          <div className="p-6">
            <PNRForm />
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          <FeatureCard
            icon={<Utensils className="h-6 w-6 text-indigo-600" />}
            title="Diverse Menu"
            description="Choose from a wide variety of cuisines, including vegetarian and special diet options."
          />
          <FeatureCard
            icon={<Clock className="h-6 w-6 text-indigo-600" />}
            title="Timely Delivery"
            description="We ensure your food is delivered fresh and on time at your designated station."
          />
          <FeatureCard
            icon={<Train className="h-6 w-6 text-indigo-600" />}
            title="Train-Friendly"
            description="All meals are packaged for easy consumption during your train journey."
          />
        </div>

        <div className="bg-indigo-100 rounded-lg p-6 text-center">
          <h3 className="text-2xl font-bold text-indigo-900 mb-4">How It Works</h3>
          <ol className="text-left max-w-md mx-auto">
            <li className="mb-3">1. Enter your PNR number above</li>
            <li className="mb-3">2. Select your station</li>
            <li className="mb-3">3. Browse our menu and choose your meals</li>
            <li className="mb-3">4. Complete your order and payment</li>
            <li>5. Enjoy your delicious meal on your journey!</li>
          </ol>
        </div>
      </div>
    </main>
  );
}