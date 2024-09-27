import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { addCustomerData, CustomerData } from "../services/database";

interface Station {
  station_name: string;
  station_code: string;
  arrives: string;
  departs: string;
  halt?: string;
  date?: string;
}

interface TrainData {
  train_name?: string;
  train_number?: string;
  date?: string;
  seat?: string;
  chart_status?: string;
  train_schedule?: Station[];
  servingList?: string[];
  pnr?: string;
}

interface TrainDetailsProps {
  data: TrainData;
}

export default function TrainDetails({ data }: TrainDetailsProps) {
  const router = useRouter();
  const [selectedStation, setSelectedStation] = useState<string | null>(null);
  const [customerDetails, setCustomerDetails] = useState<CustomerData>({
    name: "",
    phoneNumber: "",
    contactOnWhatsapp: true,
    email: "",
    pnrNumber: data.pnr || "",
    berthNumber: "",
    seatNumber: "",
    paymentMethod: "cash",
    selectedStation: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    const { name, phoneNumber, berthNumber, seatNumber, paymentMethod } =
      customerDetails;
    const isValid =
      name !== "" &&
      phoneNumber !== "" &&
      berthNumber !== "" &&
      seatNumber !== "" &&
      selectedStation !== null &&
      paymentMethod === "cash"; // Only valid if cash is selected
    setIsFormValid(isValid);
  }, [customerDetails, selectedStation]);

  if (!data || Object.keys(data).length === 0) {
    return (
      <p className="text-center text-red-500">No train details available.</p>
    );
  }

  const detailsToShow: Array<{ key: keyof TrainData; label: string }> = [
    { key: "train_name", label: "Train Name" },
    { key: "train_number", label: "Train Number" },
    { key: "date", label: "Date" },
    { key: "seat", label: "Seat" },
    { key: "chart_status", label: "Chart Status" },
  ];

  const servingList = data.servingList || [];
  const filteredSchedule =
    data.train_schedule?.filter((station) =>
      servingList.includes(station.station_code)
    ) || [];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCustomerDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setCustomerDetails((prev) => ({ ...prev, contactOnWhatsapp: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setNotification(null);

    try {
      if (!selectedStation) {
        throw new Error("Please select a serving station");
      }

      if (!data.pnr) {
        throw new Error("PNR is missing");
      }

      const dataToSubmit: CustomerData = {
        ...customerDetails,
        selectedStation,
        pnrNumber: data.pnr,
      };

      // Remove email field if it's empty
      if (!dataToSubmit.email) {
        delete dataToSubmit.email;
      }

      await addCustomerData(dataToSubmit, data.pnr);

      setNotification({
        type: "success",
        message: "Customer data submitted successfully!",
      });

      // Navigate to menu page with PNR
      router.push(`/menu?pnr=${data.pnr}`);
    } catch (error) {
      console.error("Error submitting customer data:", error);
      setNotification({
        type: "error",
        message: "Failed to submit customer data. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {notification && (
        <div
          className={`p-4 rounded-md ${
            notification.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {notification.message}
        </div>
      )}

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Train Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {detailsToShow.map(({ key, label }) => (
              <div key={key} className="flex justify-between items-center">
                <span className="font-medium text-gray-600">{label}:</span>
                <span className="text-gray-900">
                  {/* Handle arrays by joining them into a string, or render each element */}
                  {Array.isArray(data[key])
                    ? (data[key] as string[]).join(", ") // Convert array to string (if it's an array of strings)
                    : data[key] || "N/A"}{" "}
                  {/* Handle non-array types */}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-md mx-auto">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Select a Serving Station
          </CardTitle>
        </CardHeader>
        <CardContent>
          {filteredSchedule.length > 0 ? (
            <RadioGroup
              value={selectedStation || undefined} // Convert `null` to `undefined`
              onValueChange={setSelectedStation} // Set selected station
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredSchedule.map((station, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-2 p-4 border rounded-lg"
                  >
                    <RadioGroupItem
                      value={station.station_code}
                      id={station.station_code}
                      className="mt-1"
                    />
                    <div className="flex-grow">
                      <Label
                        htmlFor={station.station_code}
                        className="font-bold"
                      >
                        {station.station_name}
                      </Label>
                      <div className="text-sm">
                        <p>Code: {station.station_code}</p>
                        <p>Arrives: {station.arrives}</p>
                        <p>Date: {station.date}</p>
                        <p>Halt: {station.halt || "N/A"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </RadioGroup>
          ) : (
            <p className="text-center text-gray-600">
              Not serving in your path
            </p>
          )}
        </CardContent>
      </Card>

      {filteredSchedule.length > 0 && (
        <Card className="w-full max-w-md mx-auto">
          <CardHeader>
            <CardTitle className="text-xl font-semibold">
              Customer Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={customerDetails.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="phoneNumber">Phone Number *</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={customerDetails.phoneNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="contactOnWhatsapp"
                  checked={customerDetails.contactOnWhatsapp}
                  onCheckedChange={handleCheckboxChange}
                />
                <Label htmlFor="contactOnWhatsapp">Contact on WhatsApp</Label>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={customerDetails.email}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <Label htmlFor="pnrNumber">PNR Number *</Label>
                <Input
                  id="pnrNumber"
                  name="pnrNumber"
                  value={customerDetails.pnrNumber}
                  readOnly
                />
              </div>
              <div>
                <Label htmlFor="berthNumber">Berth Number *</Label>
                <Input
                  id="berthNumber"
                  name="berthNumber"
                  value={customerDetails.berthNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="seatNumber">Seat Number *</Label>
                <Input
                  id="seatNumber"
                  name="seatNumber"
                  value={customerDetails.seatNumber}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label>Payment Method</Label>
                <RadioGroup
                  value={customerDetails.paymentMethod}
                  onValueChange={(value) =>
                    setCustomerDetails((prev) => ({
                      ...prev,
                      paymentMethod: value as "cash" | "online",
                    }))
                  }
                  className="flex space-x-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash">Cash</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online">Online</Label>
                  </div>
                </RadioGroup>
                {customerDetails.paymentMethod === "online" && (
                  <p className="text-red-500 text-sm mt-1">
                    We are currently working on online payments.
                  </p>
                )}
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={
                  isLoading ||
                  !isFormValid ||
                  customerDetails.paymentMethod === "online"
                }
              >
                {isLoading ? "Submitting..." : "Submit"}
              </Button>
              {customerDetails.paymentMethod === "online" && (
                <p className="text-red-500 text-sm text-center">
                  Online payment is not available. Please select cash to
                  proceed.
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
