
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ProductCard } from "@/components/ui/product-card";
import { Search, Filter, SlidersHorizontal } from "lucide-react";

// Mock data
const mockProducts = [
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
  },
  {
    id: "p3",
    name: "Ceramic Bathroom Tiles",
    category: "Tiles",
    price: 12.99,
    discountedPrice: 10.99,
    inStock: true,
    stockQuantity: 450,
    images: ["https://images.unsplash.com/photo-1532323544230-7191fd51bc1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
    rating: 4.3,
    supplier: {
      name: "TileMaster",
      verified: true,
    },
  },
  {
    id: "p4",
    name: "Copper Plumbing Fittings",
    category: "Plumbing",
    price: 8.99,
    inStock: false,
    stockQuantity: 0,
    images: ["https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
    rating: 4.6,
    supplier: {
      name: "PlumbPro Supplies",
      verified: true,
    },
  },
  {
    id: "p5",
    name: "Interior Paint - White",
    category: "Paint",
    price: 29.99,
    inStock: true,
    stockQuantity: 120,
    images: ["https://images.unsplash.com/photo-1580462611434-b10926e83d2e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
    rating: 4.7,
    supplier: {
      name: "ColorWorld",
      verified: true,
    },
  },
  {
    id: "p6",
    name: "Electric Drill Kit",
    category: "Tools",
    price: 149.99,
    discountedPrice: 129.99,
    inStock: true,
    stockQuantity: 25,
    images: ["https://images.unsplash.com/photo-1583707823265-78f38fe3c59f?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"],
    rating: 4.9,
    supplier: {
      name: "PowerTools Inc.",
      verified: true,
    },
  },
];

const categories = [
  "All Categories",
  "Building Materials",
  "Flooring",
  "Tiles",
  "Plumbing",
  "Paint",
  "Tools",
  "Hardware",
  "Electrical",
];

const MaterialStore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  
  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  return (
    <Layout>
      <div className="bg-primary-700 text-white py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Material Store</h1>
          <p className="mb-6">Browse and purchase high-quality construction materials</p>
          
          <div className="relative mb-4">
            <Input 
              placeholder="Search for materials" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white text-gray-800"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters */}
          <div className="w-full md:w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <h2 className="font-medium flex items-center mb-4">
                  <Filter className="h-4 w-4 mr-2" />
                  Categories
                </h2>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div key={category} className="flex items-center">
                      <button
                        className={`text-left w-full py-1 px-2 rounded text-sm ${
                          selectedCategory === category 
                            ? "bg-primary-50 text-primary-700 font-medium" 
                            : "hover:bg-gray-100"
                        }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h2 className="font-medium flex items-center mb-4">
                  <SlidersHorizontal className="h-4 w-4 mr-2" />
                  Price Range
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <Input placeholder="Min" type="number" />
                    <Input placeholder="Max" type="number" />
                  </div>
                  <Button className="w-full">Apply</Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4">
                <h2 className="font-medium mb-4">Availability</h2>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" defaultChecked />
                    <span>In Stock</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span>Out of Stock</span>
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-500">Showing {filteredProducts.length} results</p>
              <select className="border rounded p-2 text-sm">
                <option>Sort by: Recommended</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Rating</option>
              </select>
            </div>
            
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={() => {}}
                    onViewDetails={() => {}}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-500">No products match your search criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All Categories");
                  }}
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default MaterialStore;
