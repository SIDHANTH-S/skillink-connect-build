
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { BookingCard } from "@/components/ui/booking-card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Calendar, Clock, Filter } from "lucide-react";

// Mock data
const mockBookings = [
  {
    id: "b1",
    status: 'pending' as const,
    serviceDate: "2025-04-20T10:00:00Z",
    description: "Kitchen renovation consultation and initial planning",
    totalAmount: 150,
    paymentStatus: 'paid' as const,
    createdAt: "2025-04-15T14:30:00Z",
    professional: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      specialty: "Civil Engineer",
    },
  },
  {
    id: "b2",
    status: 'accepted' as const,
    serviceDate: "2025-04-22T13:30:00Z",
    description: "Bathroom plumbing inspection and repair estimate",
    totalAmount: 85,
    paymentStatus: 'paid' as const,
    createdAt: "2025-04-14T09:15:00Z",
    professional: {
      name: "Sarah Miller",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      specialty: "Plumbing Specialist",
    },
  },
  {
    id: "b3",
    status: 'completed' as const,
    serviceDate: "2025-04-10T15:00:00Z",
    description: "Electrical wiring assessment for home office",
    totalAmount: 120,
    paymentStatus: 'paid' as const,
    createdAt: "2025-04-08T11:45:00Z",
    professional: {
      name: "Michael Johnson",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      specialty: "Electrical Engineer",
    },
  },
  {
    id: "b4",
    status: 'cancelled' as const,
    serviceDate: "2025-04-05T09:00:00Z",
    description: "Interior design consultation for living room",
    totalAmount: 200,
    paymentStatus: 'refunded' as const,
    createdAt: "2025-04-02T16:20:00Z",
    professional: {
      name: "Jennifer Williams",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      specialty: "Interior Designer",
    },
  },
];

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("all");
  
  const filteredBookings = activeTab === "all" 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === activeTab);
  
  return (
    <Layout>
      <div className="bg-primary-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">My Bookings</h1>
          <p className="mb-6">View and manage all your service bookings</p>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <Calendar className="h-4 w-4 mr-2" />
              New Booking
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <Clock className="h-4 w-4 mr-2" />
              Booking History
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid grid-cols-5 mb-6">
            <TabsTrigger value="all" onClick={() => setActiveTab("all")}>All</TabsTrigger>
            <TabsTrigger value="pending" onClick={() => setActiveTab("pending")}>Pending</TabsTrigger>
            <TabsTrigger value="accepted" onClick={() => setActiveTab("accepted")}>Accepted</TabsTrigger>
            <TabsTrigger value="completed" onClick={() => setActiveTab("completed")}>Completed</TabsTrigger>
            <TabsTrigger value="cancelled" onClick={() => setActiveTab("cancelled")}>Cancelled</TabsTrigger>
          </TabsList>
          
          <TabsContent value="all" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userRole="homeowner"
                  onViewDetails={() => {}}
                  onChat={() => {}}
                  onCancel={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="pending" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userRole="homeowner"
                  onViewDetails={() => {}}
                  onChat={() => {}}
                  onCancel={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="accepted" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userRole="homeowner"
                  onViewDetails={() => {}}
                  onChat={() => {}}
                  onCancel={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="completed" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userRole="homeowner"
                  onViewDetails={() => {}}
                  onChat={() => {}}
                  onCancel={() => {}}
                />
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="cancelled" className="mt-0">
            <div className="grid grid-cols-1 gap-4">
              {filteredBookings.map(booking => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  userRole="homeowner"
                  onViewDetails={() => {}}
                  onChat={() => {}}
                  onCancel={() => {}}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
        
        {filteredBookings.length === 0 && (
          <div className="text-center py-10">
            <p className="text-gray-500">No bookings found in this category.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Bookings;
