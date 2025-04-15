
import { Calendar, Clock, DollarSign, MessageSquare } from "lucide-react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { cn } from "@/lib/utils";

interface BookingCardProps {
  booking: {
    id: string;
    status: 'pending' | 'accepted' | 'declined' | 'completed' | 'cancelled';
    serviceDate: string;
    description: string;
    totalAmount: number;
    paymentStatus: 'pending' | 'paid' | 'refunded';
    createdAt: string;
    professional?: {
      name: string;
      avatar?: string;
      specialty: string;
    };
    supplier?: {
      name: string;
      businessName: string;
    };
  };
  userRole: 'homeowner' | 'professional' | 'supplier';
  onViewDetails: () => void;
  onChat: () => void;
  onAccept?: () => void;
  onDecline?: () => void;
  onCancel?: () => void;
  onComplete?: () => void;
}

export function BookingCard({
  booking,
  userRole,
  onViewDetails,
  onChat,
  onAccept,
  onDecline,
  onCancel,
  onComplete,
}: BookingCardProps) {
  const {
    id,
    status,
    serviceDate,
    description,
    totalAmount,
    paymentStatus,
    professional,
    supplier,
  } = booking;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric',
    }).format(date);
  };
  
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    }).format(date);
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case 'accepted': return "bg-blue-100 text-blue-800 border-blue-200";
      case 'completed': return "bg-green-100 text-green-800 border-green-200";
      case 'declined':
      case 'cancelled': return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return "bg-green-100 text-green-800 border-green-200";
      case 'refunded': return "bg-purple-100 text-purple-800 border-purple-200";
      case 'pending': return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };
  
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Badge className={cn(getStatusColor(status))}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Badge>
              <Badge className={cn(getPaymentStatusColor(paymentStatus))}>
                {paymentStatus.charAt(0).toUpperCase() + paymentStatus.slice(1)}
              </Badge>
            </div>
            <span className="text-sm font-medium text-gray-500">#{id.slice(0, 8)}</span>
          </div>
          
          <div className="mb-3">
            <h3 className="font-medium text-gray-900 mb-1">
              {professional ? professional.specialty : supplier ? 'Material Order' : 'Service Booking'}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          </div>
          
          <div className="flex flex-col space-y-2 mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatDate(serviceDate)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-2 text-gray-400" />
              <span>{formatTime(serviceDate)}</span>
            </div>
            <div className="flex items-center text-sm text-gray-600">
              <DollarSign className="h-4 w-4 mr-2 text-gray-400" />
              <span>${totalAmount.toFixed(2)}</span>
            </div>
          </div>
          
          {professional && (
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gray-200 overflow-hidden mr-2">
                {professional.avatar ? (
                  <img src={professional.avatar} alt={professional.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary-100 text-primary-700 text-xs font-medium">
                    {professional.name.split(' ').map(n => n[0]).join('')}
                  </div>
                )}
              </div>
              <div>
                <p className="text-sm font-medium">{professional.name}</p>
                <p className="text-xs text-gray-500">{professional.specialty}</p>
              </div>
            </div>
          )}
          
          {supplier && (
            <div className="mb-3">
              <p className="text-sm font-medium">{supplier.businessName}</p>
              <p className="text-xs text-gray-500">{supplier.name}</p>
            </div>
          )}
        </div>
        
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-2">
          <Button size="sm" variant="outline" onClick={onViewDetails}>Details</Button>
          <Button size="sm" variant="outline" onClick={onChat}>
            <MessageSquare className="h-3.5 w-3.5 mr-1" />
            Chat
          </Button>
          
          {userRole === 'professional' && status === 'pending' && (
            <>
              <Button size="sm" variant="default" onClick={onAccept}>Accept</Button>
              <Button size="sm" variant="destructive" onClick={onDecline}>Decline</Button>
            </>
          )}
          
          {userRole === 'homeowner' && (status === 'pending' || status === 'accepted') && (
            <Button size="sm" variant="destructive" onClick={onCancel}>Cancel</Button>
          )}
          
          {userRole !== 'homeowner' && status === 'accepted' && (
            <Button size="sm" variant="default" onClick={onComplete}>Complete</Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
