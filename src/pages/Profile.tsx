
import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { UserRole } from "@/types";
import { Home, Briefcase, Package, Shield, User, Settings, Bell, Lock, CreditCard } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockUser = {
  id: "user1",
  name: "John Doe",
  email: "john@example.com",
  phone: "+1234567890",
  roles: ["homeowner", "professional"] as UserRole[],
  activeRole: "homeowner" as UserRole,
  avatar: "",
  location: {
    state: "California",
    city: "San Francisco",
    area: "Marina District"
  },
  professional: {
    specialty: "Civil Engineer",
    experience: 8,
    rating: 4.8,
    verified: true,
    trustScore: 92
  }
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
    case 'homeowner': return 'Homeowner';
    case 'professional': return 'Professional';
    case 'supplier': return 'Material Supplier';
    case 'admin': return 'Administrator';
  }
};

const Profile = () => {
  const [user, setUser] = useState(mockUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    state: user.location?.state || '',
    city: user.location?.city || '',
    area: user.location?.area || '',
  });
  
  const { toast } = useToast();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSaveProfile = () => {
    setUser({
      ...user,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      location: {
        state: formData.state,
        city: formData.city,
        area: formData.area,
      },
    });
    
    setIsEditing(false);
    
    toast({
      title: "Profile Updated",
      description: "Your profile information has been saved successfully.",
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar */}
          <div className="w-full md:w-64 space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col items-center">
                  <Avatar className="h-24 w-24 mb-4">
                    <AvatarImage src={user.avatar} alt={user.name} />
                    <AvatarFallback className="text-lg bg-primary-100 text-primary-800">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                  <div className="flex flex-wrap gap-2 justify-center mb-4">
                    {user.roles.map((role) => (
                      <Badge key={role} variant="outline" className="flex items-center">
                        {getRoleIcon(role)}
                        {getRoleLabel(role)}
                      </Badge>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Edit Profile Picture
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-0">
                <div className="flex flex-col">
                  <Button variant="ghost" className="justify-start py-6 px-4 border-b">
                    <User className="h-5 w-5 mr-3" />
                    Profile Information
                  </Button>
                  <Button variant="ghost" className="justify-start py-6 px-4 border-b">
                    <Settings className="h-5 w-5 mr-3" />
                    Account Settings
                  </Button>
                  <Button variant="ghost" className="justify-start py-6 px-4 border-b">
                    <Bell className="h-5 w-5 mr-3" />
                    Notifications
                  </Button>
                  <Button variant="ghost" className="justify-start py-6 px-4 border-b">
                    <Lock className="h-5 w-5 mr-3" />
                    Security
                  </Button>
                  <Button variant="ghost" className="justify-start py-6 px-4">
                    <CreditCard className="h-5 w-5 mr-3" />
                    Payment Methods
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="flex-1">
            <Tabs defaultValue="personal">
              <TabsList className="mb-6 bg-white border">
                <TabsTrigger value="personal">Personal Information</TabsTrigger>
                <TabsTrigger value="roles">Role Settings</TabsTrigger>
                <TabsTrigger value="professional">Professional Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="personal">
                <Card>
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Update your personal details</CardDescription>
                      </div>
                      {!isEditing && (
                        <Button onClick={() => setIsEditing(true)}>Edit</Button>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        {isEditing ? (
                          <Input 
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="border px-3 py-2 rounded text-gray-800">{user.name}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Email Address</label>
                        {isEditing ? (
                          <Input 
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="border px-3 py-2 rounded text-gray-800">{user.email}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Phone Number</label>
                        {isEditing ? (
                          <Input 
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                          />
                        ) : (
                          <p className="border px-3 py-2 rounded text-gray-800">{user.phone}</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-3">Location</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">State</label>
                          {isEditing ? (
                            <Input 
                              name="state"
                              value={formData.state}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="border px-3 py-2 rounded text-gray-800">{user.location?.state || "Not specified"}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">City</label>
                          {isEditing ? (
                            <Input 
                              name="city"
                              value={formData.city}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="border px-3 py-2 rounded text-gray-800">{user.location?.city || "Not specified"}</p>
                          )}
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Area</label>
                          {isEditing ? (
                            <Input 
                              name="area"
                              value={formData.area}
                              onChange={handleInputChange}
                            />
                          ) : (
                            <p className="border px-3 py-2 rounded text-gray-800">{user.location?.area || "Not specified"}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  {isEditing && (
                    <CardFooter className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setIsEditing(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleSaveProfile}>
                        Save Changes
                      </Button>
                    </CardFooter>
                  )}
                </Card>
              </TabsContent>
              
              <TabsContent value="roles">
                <Card>
                  <CardHeader>
                    <CardTitle>Role Management</CardTitle>
                    <CardDescription>Manage your roles on the platform</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-500">
                        You can have multiple roles on Skillink 24/7. Select the roles that best describe you.
                      </p>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="role-homeowner" className="rounded border-gray-300" defaultChecked={user.roles.includes("homeowner")} />
                          <label htmlFor="role-homeowner" className="flex items-center">
                            <Home className="h-4 w-4 mr-2 text-primary-700" />
                            Homeowner
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">Find professionals and materials for your projects</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="role-professional" className="rounded border-gray-300" defaultChecked={user.roles.includes("professional")} />
                          <label htmlFor="role-professional" className="flex items-center">
                            <Briefcase className="h-4 w-4 mr-2 text-primary-700" />
                            Professional
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">Offer your services and find new clients</p>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="role-supplier" className="rounded border-gray-300" defaultChecked={user.roles.includes("supplier")} />
                          <label htmlFor="role-supplier" className="flex items-center">
                            <Package className="h-4 w-4 mr-2 text-primary-700" />
                            Material Supplier
                          </label>
                        </div>
                        <p className="text-xs text-gray-500 ml-6">Sell construction materials and supplies</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="ml-auto">Update Roles</Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="professional">
                {user.roles.includes("professional") ? (
                  <Card>
                    <CardHeader>
                      <CardTitle>Professional Profile</CardTitle>
                      <CardDescription>Manage your professional details and portfolio</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-medium text-lg mb-1">Verification Status</h3>
                          <div className="flex items-center">
                            {user.professional?.verified ? (
                              <Badge className="bg-green-500">Verified</Badge>
                            ) : (
                              <Badge variant="outline" className="text-amber-600 border-amber-600">Pending Verification</Badge>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Trust Score</p>
                          <div className="flex items-center justify-end">
                            <span className="text-2xl font-bold text-primary-700">{user.professional?.trustScore}</span>
                            <span className="text-sm text-gray-500">/100</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="text-sm font-medium">Specialty</label>
                          <p className="border px-3 py-2 rounded text-gray-800">{user.professional?.specialty}</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Years of Experience</label>
                          <p className="border px-3 py-2 rounded text-gray-800">{user.professional?.experience} years</p>
                        </div>
                        
                        <div>
                          <label className="text-sm font-medium">Rating</label>
                          <div className="flex items-center gap-2">
                            <div className="flex">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <span key={star} className={`text-xl ${star <= (user.professional?.rating || 0) ? 'text-yellow-500' : 'text-gray-300'}`}>
                                  ★
                                </span>
                              ))}
                            </div>
                            <span className="text-gray-500">{user.professional?.rating} / 5</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="font-medium mb-3">Portfolio</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Project Image</span>
                          </div>
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Project Image</span>
                          </div>
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                            <span className="text-gray-500">Project Image</span>
                          </div>
                          <div className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center border-2 border-dashed border-gray-300 text-gray-400">
                            + Add
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="ml-auto">Update Professional Profile</Button>
                    </CardFooter>
                  </Card>
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <Briefcase className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">Professional Profile Not Activated</h3>
                      <p className="text-gray-500 mb-6">
                        You haven't activated your professional profile yet. 
                        Add the Professional role to your account to create your professional profile.
                      </p>
                      <Button>Add Professional Role</Button>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
