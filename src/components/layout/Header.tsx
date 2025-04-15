
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Menu, X, User, LogOut, Home, Briefcase, Package, Shield, 
  ChevronDown, Bell, MessageSquare 
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

// Mock user data - Replace with actual auth state later
const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  roles: ["homeowner", "professional"] as UserRole[],
  activeRole: "homeowner" as UserRole,
  avatar: "",
};

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(mockUser);
  const isMobile = useIsMobile();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const switchRole = (role: UserRole) => {
    setUser({...user, activeRole: role});
    setIsMenuOpen(false);
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
        <Link to="/" className="flex items-center">
          <span className="text-primary-600 font-bold text-xl">Skillink</span>
          <span className="text-orange-500 font-bold">24/7</span>
        </Link>
        
        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/dashboard" className="text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
            <Link to="/bookings" className="text-gray-600 hover:text-primary-600 font-medium">Bookings</Link>
            {user.activeRole === 'homeowner' && (
              <>
                <Link to="/professionals" className="text-gray-600 hover:text-primary-600 font-medium">Find Professionals</Link>
                <Link to="/materials" className="text-gray-600 hover:text-primary-600 font-medium">Materials</Link>
              </>
            )}
            {user.activeRole === 'professional' && (
              <Link to="/portfolio" className="text-gray-600 hover:text-primary-600 font-medium">My Portfolio</Link>
            )}
            {user.activeRole === 'supplier' && (
              <Link to="/products" className="text-gray-600 hover:text-primary-600 font-medium">My Products</Link>
            )}
            {user.activeRole === 'admin' && (
              <Link to="/manage-users" className="text-gray-600 hover:text-primary-600 font-medium">Manage Users</Link>
            )}
          </nav>
        )}
        
        {/* User Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 bg-red-500 rounded-full w-2 h-2"></span>
          </Button>
          
          {/* Messages */}
          <Button variant="ghost" size="icon">
            <MessageSquare className="h-5 w-5" />
          </Button>
          
          {/* Role Switcher */}
          {user.roles.length > 1 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="flex items-center gap-1">
                  {getRoleIcon(user.activeRole)}
                  <span className="hidden sm:inline">{getRoleLabel(user.activeRole)}</span>
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
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="bg-primary-100 text-primary-800">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="h-4 w-4 mr-2" />
                <span>Profile</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
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
      </div>
      
      {/* Mobile Navigation */}
      {isMobile && isMenuOpen && (
        <div className="bg-white border-t border-gray-200 md:hidden">
          <nav className="flex flex-col px-4 py-2">
            <Link to="/dashboard" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Dashboard</Link>
            <Link to="/bookings" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Bookings</Link>
            {user.activeRole === 'homeowner' && (
              <>
                <Link to="/professionals" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Find Professionals</Link>
                <Link to="/materials" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Materials</Link>
              </>
            )}
            {user.activeRole === 'professional' && (
              <Link to="/portfolio" className="py-2 text-gray-600 hover:text-primary-600 font-medium">My Portfolio</Link>
            )}
            {user.activeRole === 'supplier' && (
              <Link to="/products" className="py-2 text-gray-600 hover:text-primary-600 font-medium">My Products</Link>
            )}
            {user.activeRole === 'admin' && (
              <Link to="/manage-users" className="py-2 text-gray-600 hover:text-primary-600 font-medium">Manage Users</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
