
import { Star, ShoppingCart } from "lucide-react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Product } from "@/types";

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    price: number;
    discountedPrice?: number;
    inStock: boolean;
    stockQuantity: number;
    images: string[];
    rating: number;
    supplier: {
      name: string;
      verified: boolean;
    };
  };
  onAddToCart?: () => void;
  onViewDetails?: () => void;
}

export function ProductCard({
  product,
  onAddToCart,
  onViewDetails,
}: ProductCardProps) {
  const {
    id,
    name,
    category,
    price,
    discountedPrice,
    inStock,
    stockQuantity,
    images,
    rating,
    supplier,
  } = product;
  
  const discount = discountedPrice ? Math.round(((price - discountedPrice) / price) * 100) : 0;
  
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div 
          className="h-48 w-full bg-gray-100 relative overflow-hidden"
          onClick={onViewDetails}
        >
          {images.length > 0 ? (
            <img 
              src={images[0]} 
              alt={name} 
              className="w-full h-full object-cover cursor-pointer"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400">
              No image
            </div>
          )}
          
          {discount > 0 && (
            <Badge className="absolute top-2 right-2 bg-orange-600">
              {discount}% OFF
            </Badge>
          )}
          
          {!inStock && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
              <span className="text-white font-medium">Out of Stock</span>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs text-gray-500">{category}</span>
            <div className="flex items-center">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
              <span className="text-xs text-gray-600">{rating.toFixed(1)}</span>
            </div>
          </div>
          
          <h3 
            className="font-medium text-gray-900 mb-1 cursor-pointer hover:text-primary-600"
            onClick={onViewDetails}
          >
            {name}
          </h3>
          
          <div className="flex items-center text-sm">
            <span className="text-gray-500">by</span>
            <span className="font-medium ml-1">{supplier.name}</span>
            {supplier.verified && (
              <Badge variant="outline" className="ml-2 bg-blue-50 text-blue-700 border-blue-200 text-xs">
                Verified
              </Badge>
            )}
          </div>
          
          <div className="mt-3 flex items-center justify-between">
            <div>
              {discountedPrice ? (
                <div className="flex items-center">
                  <span className="font-semibold text-primary-700">${discountedPrice.toFixed(2)}</span>
                  <span className="ml-2 text-sm text-gray-500 line-through">${price.toFixed(2)}</span>
                </div>
              ) : (
                <span className="font-semibold text-primary-700">${price.toFixed(2)}</span>
              )}
              {inStock && stockQuantity <= 5 && (
                <p className="text-xs text-orange-600 mt-1">Only {stockQuantity} left</p>
              )}
            </div>
            
            <Button 
              size="sm" 
              onClick={onAddToCart}
              disabled={!inStock}
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
