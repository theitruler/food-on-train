"use client"
import React, { useState } from "react";
import { Menu, X, Train, Utensils, MapPin } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

const NavItem: React.FC<NavItemProps> = ({ href, children }) => (
  <a
    href={href}
    className="text-gray-200 hover:bg-indigo-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition duration-300 ease-in-out"
  >
    {children}
  </a>
);

const LandingPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [pnr, setPnr] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/select-station?pnr=${pnr}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <span className="text-white text-xl font-bold">
                  Food on Train
                </span>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <NavItem href="#home">Home</NavItem>
                  <NavItem href="/order">Orders</NavItem>
                  <NavItem href="#how-it-works">How It Works</NavItem>
                  <NavItem href="/trackorder">Track Orders</NavItem>
                  <NavItem href="#about">About Us</NavItem>
                </div>
              </div>
            </div>
            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="bg-indigo-600 inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white transition duration-300 ease-in-out"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden" id="mobile-menu">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <NavItem href="#home">Home</NavItem>
              <NavItem href="/order">Orders</NavItem>
              <NavItem href="#how-it-works">How It Works</NavItem>
              <NavItem href="/trackorder">Track Orders</NavItem>
              <NavItem href="#about">About Us</NavItem>
            </div>
          </div>
        )}
      </nav>

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
                src="https://cloud.appwrite.io/v1/storage/buckets/66f442aa0039a152902f/files/66f6901300131343e201/view?project=66f1d50d003129532883&project=66f1d50d003129532883&mode=admin"
                alt="Food on Train"
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
                At Food on Train, we&apos;re passionate about transforming your
                travel experience. We believe that great journeys deserve great
                food, which is why we&apos;ve partnered with top local
                restaurants to bring you a diverse menu of delicious,
                freshly-prepared meals delivered right to your train seat.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our mission is to make your train journey more enjoyable and
                convenient. No more settling for subpar station food or packing
                your own meals. With Food on Train, you can savor
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

      <footer className="bg-gradient-to-r from-indigo-800 to-purple-800 mt-20">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Quick Links
              </h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#home"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/order"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#how-it-works"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    How It Works
                  </a>
                </li>
                <li>
                  <a
                    href="/trackorder"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    Track Orders
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="text-gray-300 hover:text-white transition duration-300"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-semibold mb-4">
                Follow Us
              </h3>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition duration-300"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-6 w-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 border-t border-indigo-700 pt-8 flex justify-between items-center">
            <p className="text-base text-gray-400">
              &copy; 2024 Food on Train Service. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition duration-300"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
