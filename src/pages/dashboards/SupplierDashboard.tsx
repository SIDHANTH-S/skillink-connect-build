
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PackageOpen, ShoppingCart, BarChart, TrendingUp, MessageSquare, Package, Upload } from "lucide-react";
import { Progress } from "@/components/ui/progress";

const SupplierDashboard = () => {
  return (
    <Layout>
      <div className="bg-primary-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Supplier Dashboard</h1>
          <p className="mb-6">Manage your product listings and fulfillment</p>
          
          <div className="flex flex-wrap gap-2">
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <Upload className="h-4 w-4 mr-2" />
              Add Products
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <ShoppingCart className="h-4 w-4 mr-2" />
              View Orders
            </Button>
            <Button size="sm" variant="secondary" className="bg-white text-primary-700 hover:bg-gray-100">
              <MessageSquare className="h-4 w-4 mr-2" />
              Customer Inquiries
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
                <Package className="h-6 w-6 text-blue-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Products Listed</p>
                <p className="text-2xl font-bold">24</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-green-100 p-3 mr-4">
                <ShoppingCart className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">New Orders</p>
                <p className="text-2xl font-bold">7</p>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4 flex items-center">
              <div className="rounded-full bg-purple-100 p-3 mr-4">
                <BarChart className="h-6 w-6 text-purple-700" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Monthly Revenue</p>
                <p className="text-2xl font-bold">$8,745</p>
              </div>
            </CardContent>
          </Card>
        </div>
        
        {/* Product Inventory */}
        <section className="mb-8">
          <h2 className="text-xl font-bold mb-4">Inventory Status</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Premium Cement Mix</h3>
                  <span className="text-green-600 text-sm font-medium">In Stock</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>200 units remaining</span>
                  <span>80% left</span>
                </div>
                <Progress value={80} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Wood Flooring Premium Oak</h3>
                  <span className="text-amber-600 text-sm font-medium">Low Stock</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>35 units remaining</span>
                  <span>25% left</span>
                </div>
                <Progress value={25} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Ceramic Bathroom Tiles</h3>
                  <span className="text-green-600 text-sm font-medium">In Stock</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>450 units remaining</span>
                  <span>90% left</span>
                </div>
                <Progress value={90} className="h-2" />
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium">Copper Plumbing Fittings</h3>
                  <span className="text-red-600 text-sm font-medium">Out of Stock</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mb-2">
                  <span>0 units remaining</span>
                  <span>0% left</span>
                </div>
                <Progress value={0} className="h-2" />
              </CardContent>
            </Card>
          </div>
          <div className="mt-4">
            <Button variant="outline" className="w-full md:w-auto">View All Inventory</Button>
          </div>
        </section>
        
        {/* Recent Orders */}
        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Recent Orders</h2>
            <Button variant="outline" size="sm">View All</Button>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b text-left">
                  <th className="py-3 px-4 font-medium">Order ID</th>
                  <th className="py-3 px-4 font-medium">Customer</th>
                  <th className="py-3 px-4 font-medium">Products</th>
                  <th className="py-3 px-4 font-medium">Total</th>
                  <th className="py-3 px-4 font-medium">Status</th>
                  <th className="py-3 px-4 font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b">
                  <td className="py-3 px-4">#ORD-2345</td>
                  <td className="py-3 px-4">John Smith</td>
                  <td className="py-3 px-4">Premium Cement Mix (10)</td>
                  <td className="py-3 px-4">$459.90</td>
                  <td className="py-3 px-4">
                    <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded">Processing</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Details</Button>
                  </td>
                </tr>
                <tr className="border-b">
                  <td className="py-3 px-4">#ORD-2344</td>
                  <td className="py-3 px-4">Sarah Miller</td>
                  <td className="py-3 px-4">Wood Flooring Premium Oak (5)</td>
                  <td className="py-3 px-4">$399.95</td>
                  <td className="py-3 px-4">
                    <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Shipped</span>
                  </td>
                  <td className="py-3 px-4">
                    <Button variant="outline" size="sm">Details</Button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default SupplierDashboard;
