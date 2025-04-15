
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Menu, X, User, LogOut, Home, Briefcase, Package, Shield, 
  ChevronDown, Bell, MessageSquare, ShoppingCart, Calendar
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserRole } from '@/types';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useToast } from "@/hooks/use-toast";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<{
    id: string;
    name: string;
    email: string;
    phone: string;
    roles: UserRole[];
    activeRole: UserRole;
    avatar: string;
  } | null>(null);
  
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Check authentication status
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  
  useEffect(() => {
    // Load user data from localStorage if authenticated
    if (isAuthenticated) {
      const selectedRoles = JSON.parse(localStorage.getItem("selectedRoles") || "[]");
      const phoneNumber = localStorage.getItem("phoneNumber") || "";
      
      // Mock user data based on local storage
      setUser({
        id: "user1",
        name: "John Doe",
        email: "john@example.com",
        phone: phoneNumber,
        roles: selectedRoles as UserRole[],
        activeRole: selectedRoles[0] as UserRole,
        avatar: "",
      });
    }
  }, [isAuthenticated]);
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const switchRole = (role: UserRole) => {
    if (user) {
      setUser({...user, activeRole: role});
      
      // Navigate to the appropriate dashboard
      navigate(`/dashboard/${role}`);
    }
    
    setIsMenuOpen(false);
  };

  const handleLogout = () => {
    // Clear authentication data
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("selectedRoles");
    localStorage.removeItem("phoneNumber");
    
    // Reset user state
    setUser(null);
    
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    });
    
    // Navigate to splash screen
    navigate("/");
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'homeowner': return <Home className="h-4 w-4 mr-2" />;
      case 'professional': return <Briefcase className="h-4 w-4 mr-2" />;
      case 'supplier': return <Package className="h-4 w-4 mr-2" />;
      case 'admin': return <Shield className="h-4 w-4 mr-2" />;
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case 'homeowner': return 'Home Owner';
      case 'professional': return 'Professional';
      case 'supplier': return 'Material Supplier';
      case 'admin': return 'Administrator';
    }
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo */}
        <Link to={isAuthenticated ? `/dashboard/${user?.activeRole || 'homeowner'}` : "/"} className="flex items-center">
          <span className="text-[#0A2C4B] font-bold text-xl">Skillink</span>
          <span className="text-[#F97316] font-bold ml-1">24/7</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && isAuthenticated && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to={`/dashboard/${user?.activeRole || 'homeowner'}`} className="text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
            <Link to="/bookings" className="text-gray-600 hover:text-primary-600 font-medium">Bookings</Link>
            {user?.activeRole === 'homeowner' && (
              <>
                <Link to="/material-store" className="text-gray-600 hover:text-primary-600 font-medium">Material Store</Link>
              </>
            )}
            {user?.activeRole === 'professional' && (
              <Link to="/portfolio" className="text-gray-600 hover:text-primary-600 font-medium">My Portfolio</Link>
            )}
            {user?.activeRole === 'supplier' && (
              <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium">My Products</Link>
            )}
          </nav>
        )}
        
        {/* Unauthenticated Header */}
        {!isAuthenticated && !isMobile && (
          <div className="flex items-center space-x-4">
            <Button variant="ghost" asChild>
              <Link to="/onboarding">Sign Up</Link>
            </Button>
            <Button variant="default" asChild>
              <Link to="/onboarding/auth">Log In</Link>
            </Button>
          </div>
        )}
        
        {/* User Actions */}
        {isAuthenticated && (
          <div className="flex items-center space-x-4">
            {/* Chat */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/chat">
                <MessageSquare className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Material Store (for homeowners) */}
            {user?.activeRole === 'homeowner' && (
              <Button variant="ghost" size="icon" asChild>
                <Link to="/material-store">
                  <ShoppingCart className="h-5 w-5" />
                </Link>
              </Button>
            )}
            
            {/* Bookings */}
            <Button variant="ghost" size="icon" asChild>
              <Link to="/bookings">
                <Calendar className="h-5 w-5" />
              </Link>
            </Button>
            
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
            </Button>
            
            {/* Role Switcher */}
            {user?.roles && user.roles.length > 1 && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    {user.activeRole && getRoleIcon(user.activeRole)}
                    <span className="hidden sm:inline">{user.activeRole && getRoleLabel(user.activeRole)}</span>
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Switch Role</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {user.roles.map((role) => (
                    <DropdownMenuItem 
                      key={role} 
                      className={cn(
                        "cursor-pointer",
                        role === user.activeRole && "bg-primary-50 text-primary-600"
                      )}
                      onClick={() => switchRole(role)}
                    >
                      {getRoleIcon(role)}
                      <span>{getRoleLabel(role)}</span>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            
            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar>
                    <AvatarImage src={user?.avatar} alt={user?.name} />
                    <AvatarFallback className="bg-primary-100 text-primary-800">
                      {user?.name.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate('/profile')} className="cursor-pointer">
                  <User className="h-4 w-4 mr-2" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  <LogOut className="h-4 w-4 mr-2" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            {/* Mobile Menu Button */}
            {isMobile && (
              <Button variant="ghost" size="icon" onClick={toggleMenu} className="md:hidden">
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            )}
          </div>
        )}
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden">
          <nav className="flex flex-col px-4 py-2">
            {isAuthenticated ? (
              <>
                <Link to={`/dashboard/${user?.activeRole || 'homeowner'}`} className="py-2 text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
                <Link to="/bookings" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Bookings</Link>
                <Link to="/chat" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Messages</Link>
                <Link to="/profile" className="py-2 text-gray-600 hover:text-primary-600 font-medium">My Profile</Link>
                {user?.activeRole === 'homeowner' && (
                  <Link to="/material-store" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Material Store</Link>
                )}
                {user?.activeRole === 'professional' && (
                  <Link to="/portfolio" className="py-2 text-gray-600 hover:text-primary-600 font-medium">My Portfolio</Link>
                )}
                {user?.activeRole === 'supplier' && (
                  <Link to="/products" className="py-2 text-gray-600 hover:text-primary-600 font-medium">My Products</Link>
                )}
                <button 
                  onClick={handleLogout} 
                  className="py-2 text-gray-600 hover:text-primary-600 font-medium text-left"
                >
                  Log Out
                </button>
              </>
            ) : (
              <>
                <Link to="/onboarding" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Sign Up</Link>
                <Link to="/onboarding/auth" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Log In</Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
