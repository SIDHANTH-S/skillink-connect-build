
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { ProfessionalCard } from "@/components/ui/professional-card";
import { ProductCard } from "@/components/ui/product-card";
import { BookingCard } from "@/components/ui/booking-card";
import { Search, MapPin, Calendar, Clock, MessageSquare } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

// Mock data
const featuredProfessionals = [
  {
    id: "1",
    userId: "user1",
    name: "John Doe",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    specialty: "Civil Engineer",
    experience: 8,
    rating: 4.8,
    verified: true,
    trustScore: 92,
    hourlyRate: 75,
    location: {
      city: "San Francisco",
      state: "CA"
    }
  },
  {
    id: "2",
    userId: "user2",
    name: "Sarah Miller",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    specialty: "Interior Designer",
    experience: 6,
    rating: 4.7,
    verified: true,
    trustScore: 90,
    hourlyRate: 65,
    location: {
      city: "Los Angeles",
      state: "CA"
    }
  }
];

const recentBookings = [
  {
    id: "b1",
    status: 'pending' as const,
    serviceDate: "2023-06-15T10:00:00Z",
    description: "Kitchen renovation consultation and initial planning",
    totalAmount: 150,
    paymentStatus: 'paid' as const,
    createdAt: "2023-06-10T14:30:00Z",
    professional: {
      name: "John Doe",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      specialty: "Civil Engineer",
    },
  }
];

const featuredProducts = [
  {
    id: "p1",
    name: "Premium Cement Mix",
    category: "Building Materials",
    price: 45.99,
    discountedPrice: 39.99,
    inStock: true,
    stockQuantity: 200,
    images: ["https://images.unsplash.com/photo-1565800489013-c64859d0c2d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
    rating: 4.5,
    supplier: {
      name: "BuildRight Supplies",
      verified: true,
    },
  },
  {
    id: "p2",
    name: "Wood Flooring Premium Oak",
    category: "Flooring",
    price: 79.99,
    inStock: true,
    stockQuantity: 35,
    images: ["https://images.unsplash.com/photo-1584467541268-b040f83be3f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
    rating: 4.8,
    supplier: {
      name: "Woodland Materials",
      verified: true,
    },
  }
];

const HomeownerDashboard = () => {
  return (
    <Layout>
      <div className="bg-primary-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back, John!</h1>
          <p className="mb-6">What are you looking for today?</p>
          
          <div className="relative mb-4">
            <Input 
              placeholder="Search for professionals, materials, or services" 
              className="pl-10 bg-white text-gray-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              Find Professionals
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              Browse Materials
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              View Bookings
            </Button>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-blue-100 p-3 mr-4">
                <Calendar className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Active Bookings</p>
                <p className="text-2xl font-bold">3</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <Clock className="h-6 w-6 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending Approvals</p>
                <p className="text-2xl font-bold">2</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <MessageSquare className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Messages</p>
                <p className="text-2xl font-bold">5</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Recent Bookings */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Bookings</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {recentBookings.map((booking) => (
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
        </section>
        
        {/* Top Professionals */}
        <section className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Top Professionals Near You</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {featuredProfessionals.map((professional) => (
              <ProfessionalCard
                key={professional.id}
                professional={professional}
                onBook={() => {}}
                onViewProfile={() => {}}
              />
            ))}
          </div>
        </section>
        
        {/* Featured Materials */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Featured Materials</h2>
            <Button variant="outline" size="sm">Browse All</Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {featuredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => {}}
                onViewDetails={() => {}}
              />
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomeownerDashboard;
