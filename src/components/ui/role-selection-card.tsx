
import { ReactNode } from "react";
import { Card, CardContent } from "./card";
import { UserRole } from "@/types";
import { cn } from "@/lib/utils";

interface RoleSelectionCardProps {
  role: UserRole;
  icon: ReactNode;
  title: string;
  description: string;
  selected: boolean;
  onClick: () => void;
}

export function RoleSelectionCard({
  role,
  icon,
  title,
  description,
  selected,
  onClick,
}: RoleSelectionCardProps) {
  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all border-2",
        selected 
          ? "border-primary-500 bg-primary-50" 
          : "border-gray-200 hover:border-primary-200 hover:bg-gray-50"
      )}
      onClick={onClick}
    >
      <CardContent className="p-6 flex flex-col items-center text-center">
        <div className={cn(
          "p-3 rounded-full mb-4",
          selected ? "bg-primary-100 text-primary-700" : "bg-gray-100 text-gray-600"
        )}>
          {icon}
        </div>
        <h3 className="text-lg font-medium mb-1">{title}</h3>
        <p className="text-sm text-gray-500">{description}</p>
      </CardContent>
    </Card>
  );
}
