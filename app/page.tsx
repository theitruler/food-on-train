"use client"
import React, { useState } from "react";
import { Train, Utensils, MapPin, Gift } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
  const [pnr, setPnr] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/select-station?pnr=${pnr}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <style jsx global>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
          100% { transform: translateX(0); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out infinite;
        }
      `}</style>
      <main>
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <section
            id="home"
            className="px-4 py-20 md:py-32 bg-gradient-to-b from-indigo-50 to-white"
          >
            <div className="text-center">
              <h1 className="text-5xl font-extrabold text-indigo-900 sm:text-6xl md:text-7xl">
                Delicious Meals{" "}
                <span className="text-indigo-600">on Your Journey</span>
              </h1>
              <p className="mt-6 max-w-md mx-auto text-xl text-gray-600 sm:max-w-3xl">
                Experience gourmet dining while you travel. Order fresh, tasty
                food directly to your train seat.
              </p>
              
              {/* Animated Offer Section */}
              <div className="mt-8 bg-yellow-100 border-2 border-yellow-400 rounded-lg p-4 max-w-2xl mx-auto animate-shake">
                <h2 className="text-2xl font-bold text-yellow-800 mb-2 flex items-center justify-center">
                  <Gift className="mr-2 animate-bounce" /> Limited Time Offer!
                </h2>
                <p className="text-lg text-yellow-800">
                  🍽️ Order Food Worth ₹500+ and get 2 250ml FREE Cokes! 🥤🥤
                </p>
                <p className="text-lg text-yellow-800 mt-2">
                  🍗 And for ₹1500+ get FREE Chicken Biryani! 🍛
                </p>
                <p className="text-sm text-yellow-700 mt-2">
                  Don&apos;t miss this flavor-packed deal! Order now and make your journey deliciously rewarding.
                </p>
              </div>
              
              <div className="mt-10 max-w-3xl mx-auto">
                <form
                  onSubmit={handleSubmit}
                  className="flex items-center justify-center"
                >
                  <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Train
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      name="pnr"
                      id="pnr"
                      value={pnr}
                      onChange={(e) => setPnr(e.target.value)}
                      className="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 py-4 sm:text-lg border-gray-300 rounded-l-md"
                      placeholder="Enter your PNR"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-r-md text-white bg-indigo-600 hover:bg-indigo-700 md:text-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                  >
                    Order Now
                  </button>
                </form>
              </div>
            </div>
            <div className="mt-20 flex justify-center">
              <Image
                src="https://cloud.appwrite.io/v1/storage/buckets/66f442aa0039a152902f/files/6705026a0022ccd86099/view?project=66f1d50d003129532883&project=66f1d50d003129532883"
                alt="RailBites"
                width={800}
                height={500}
                className="rounded-lg shadow-2xl"
              />
            </div>
          </section>

          <section
            id="how-it-works"
            className="px-4 py-20 mt-20 bg-gradient-to-b from-white to-indigo-50"
          >
            <h2 className="text-4xl font-extrabold text-indigo-900 text-center">
              How It Works
            </h2>
            <div className="mt-16">
              <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-3 md:gap-x-8 md:gap-y-10">
                <div className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Train className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      1. Enter PNR
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Start by entering your PNR number to find your train
                    details.
                  </dd>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <Utensils className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      2. Select Food
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Choose from a variety of delicious meals available on your
                    route.
                  </dd>
                </div>

                <div className="relative bg-white p-6 rounded-lg shadow-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      <MapPin className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                      3. Confirm & Enjoy
                    </p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">
                    Confirm your order and wait for your delicious meal to be
                    delivered to your seat.
                  </dd>
                </div>
              </dl>
            </div>
          </section>

          <section
            id="about"
            className="px-4 py-20 bg-white shadow-lg sm:rounded-lg mt-20"
          >
            <h2 className="text-4xl font-extrabold text-indigo-900 text-center">
              About Us
            </h2>
            <p className="mt-4 text-xl text-gray-600 text-center">
              Bringing gourmet dining to your train journey
            </p>
            <div className="mt-12 max-w-3xl mx-auto text-center">
              <p className="text-lg text-gray-700 mb-6">
                At RailBites, we&apos;re passionate about transforming your
                travel experience. We believe that great journeys deserve great
                food, which is why we&apos;ve partnered with top local
                restaurants to bring you a diverse menu of delicious,
                freshly-prepared meals delivered right to your train seat.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our mission is to make your train journey more enjoyable and
                convenient. No more settling for subpar station food or packing
                your own meals. With RailBites, you can savor
                restaurant-quality dishes while watching the world go by outside
                your window.
              </p>
              <div className="bg-indigo-100 border-l-4 border-indigo-500 text-indigo-700 p-4 mb-6">
                <p className="font-bold">Important Note:</p>
                <p>
                  Please place your order at least 2 hours before your train
                  arrives at the station to ensure timely delivery.
                </p>
              </div>
              <p className="text-lg text-gray-700 mb-6">
                Currently, we are operating exclusively at{" "}
                <span className="font-semibold">
                  KSR Bengaluru City Junction (SBC)
                </span>
                . We&apos;re working hard to expand our services to more
                stations across India, so stay tuned for updates!
              </p>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default LandingPage;