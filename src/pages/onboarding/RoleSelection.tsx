
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Home, Briefcase, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RoleSelectionCard } from "@/components/ui/role-selection-card";
import { UserRole } from "@/types";
import { Layout } from "@/components/layout/Layout";

const RoleSelection = () => {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState<UserRole[]>([]);
  
  const toggleRole = (role: UserRole) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };
  
  const handleContinue = () => {
    if (selectedRoles.length > 0) {
      // Store selected roles in local storage or context
      localStorage.setItem('selectedRoles', JSON.stringify(selectedRoles));
      navigate("/onboarding/auth");
    }
  };
  
  return (
    <Layout hideFooter>
      <div className="container max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2">Welcome to Skillink 24/7</h1>
          <p className="text-gray-600">Select your role(s) to get started. You can choose multiple.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <RoleSelectionCard
            role="homeowner"
            icon={<Home size={24} />}
            title="Homeowner"
            description="Find professionals and materials for your project"
            selected={selectedRoles.includes("homeowner")}
            onClick={() => toggleRole("homeowner")}
          />
          
          <RoleSelectionCard
            role="professional"
            icon={<Briefcase size={24} />}
            title="Professional"
            description="Offer your services and find new clients"
            selected={selectedRoles.includes("professional")}
            onClick={() => toggleRole("professional")}
          />
          
          <RoleSelectionCard
            role="supplier"
            icon={<Package size={24} />}
            title="Material Supplier"
            description="Sell construction materials and supplies"
            selected={selectedRoles.includes("supplier")}
            onClick={() => toggleRole("supplier")}
          />
        </div>
        
        <div className="flex justify-center">
          <Button 
            size="lg" 
            onClick={handleContinue}
            disabled={selectedRoles.length === 0}
          >
            Continue
          </Button>
        </div>
        
        {selectedRoles.length > 0 && (
          <p className="text-center mt-4 text-sm text-gray-600">
            You selected: {selectedRoles.map(role => 
              role.charAt(0).toUpperCase() + role.slice(1)
            ).join(", ")}
          </p>
        )}
      </div>
    </Layout>
  );
};

export default RoleSelection;
