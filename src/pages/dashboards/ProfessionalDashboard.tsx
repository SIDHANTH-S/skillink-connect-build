
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, CircleDollarSign, FileClock, MessageSquare, ListPlus } from "lucide-react";

const ProfessionalDashboard = () => {
  return (
    <Layout>
      <div className="bg-primary-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Professional Dashboard</h1>
          <p className="mb-6">Manage your projects, portfolio, and client communications</p>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Messages
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <Calendar className="h-4 w-4 mr-2" />
              Schedule
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <FileClock className="h-4 w-4 mr-2" />
              Invoices
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
                <p className="text-sm text-gray-500">Upcoming Projects</p>
                <p className="text-2xl font-bold">4</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <CircleDollarSign className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">This Month's Earnings</p>
                <p className="text-2xl font-bold">$3,250</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-orange-100 p-3 mr-4">
                <MessageSquare className="h-6 w-6 text-orange-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Client Messages</p>
                <p className="text-2xl font-bold">6</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Incoming Projects */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Incoming Project Requests</h2>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Kitchen Renovation Design</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                  </div>
                  <p className="text-sm text-gray-500 my-2">Client needs a full kitchen design with modern fixtures</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Requested: Apr 10, 2025</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">Structural Assessment</h3>
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Pending</span>
                  </div>
                  <p className="text-sm text-gray-500 my-2">Wall removal project requires structural engineering approval</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-sm text-gray-500">Requested: Apr 12, 2025</span>
                    <div className="space-x-2">
                      <Button size="sm" variant="outline">View</Button>
                      <Button size="sm">Accept</Button>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                <ListPlus className="h-4 w-4 mr-2" />
                View All Requests
              </Button>
            </CardContent>
          </Card>
          
          {/* Portfolio */}
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Your Portfolio</h2>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
                <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                  <span className="text-gray-500">Project Image</span>
                </div>
              </div>
              <Button variant="outline" className="w-full">
                Manage Portfolio
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ProfessionalDashboard;
