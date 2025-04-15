
import { Star } from "lucide-react";
import { Card, CardContent } from "./card";
import { Badge } from "./badge";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { Professional } from "@/types";

interface ProfessionalCardProps {
  professional: {
    id: string;
    userId: string;
    name: string;
    avatar?: string;
    specialty: string;
    experience: number;
    rating: number;
    verified: boolean;
    trustScore: number;
    hourlyRate: number;
    location?: {
      city: string;
      state: string;
    };
  };
  onBook?: () => void;
  onViewProfile?: () => void;
}

export function ProfessionalCard({
  professional,
  onBook,
  onViewProfile,
}: ProfessionalCardProps) {
  const {
    id,
    name,
    avatar,
    specialty,
    experience,
    rating,
    verified,
    trustScore,
    hourlyRate,
    location,
  } = professional;
  
  return (
    <Card className="overflow-hidden h-full hover:shadow-md transition-shadow">
      <CardContent className="p-0">
        <div className="p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center">
              <Avatar className="h-14 w-14 border-2 border-white shadow">
                <AvatarImage src={avatar} alt={name} />
                <AvatarFallback className="bg-primary-100 text-primary-800">
                  {name.split(" ").map(n => n[0]).join("")}
                </AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-gray-900">{name}</h3>
                  {verified && (
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200 text-xs">
                      Verified
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-500">{specialty}</p>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-1" />
                    <span className="text-xs text-gray-600 font-medium">{rating.toFixed(1)}</span>
                  </div>
                  <span className="mx-2 text-gray-300">•</span>
                  <span className="text-xs text-gray-600">{experience} yrs exp</span>
                  {location && (
                    <>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-600">{location.city}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div>
              <p className="font-semibold text-right text-primary-700">
                ${hourlyRate}
                <span className="text-xs text-gray-500 font-normal">/hr</span>
              </p>
              <div className="flex items-center mt-1">
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div 
                    className="bg-green-500 h-1.5 rounded-full" 
                    style={{ width: `${trustScore}%` }}
                  ></div>
                </div>
                <span className="ml-2 text-xs text-gray-600">
                  {trustScore}% Trust
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 bg-gray-50 border-t border-gray-100 flex justify-between">
          <Button variant="outline" size="sm" onClick={onViewProfile}>
            View Profile
          </Button>
          <Button size="sm" onClick={onBook}>
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
