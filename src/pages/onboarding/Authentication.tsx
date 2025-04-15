
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";

// Mock OTP for demonstration
const MOCK_OTP = "123456";

const Authentication = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);
  
  const handleSendOTP = () => {
    // Validate phone number
    if (phoneNumber.length < 10) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call to send OTP
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
      setCountdown(30); // 30 seconds countdown for resend
      
      toast({
        title: "OTP Sent!",
        description: `Mock OTP (${MOCK_OTP}) sent to ${phoneNumber}`,
      });
    }, 1000);
  };
  
  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (!/^\d*$/.test(value)) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
    
    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };
  
  const handleVerifyOTP = () => {
    const enteredOTP = otp.join("");
    
    if (enteredOTP.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the complete 6-digit OTP",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      
      if (enteredOTP === MOCK_OTP) {
        // Store auth state in localStorage
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("phoneNumber", phoneNumber);
        
        toast({
          title: "Success!",
          description: "Your phone number has been verified",
        });
        
        // Determine where to navigate based on selected roles
        const selectedRoles = JSON.parse(localStorage.getItem("selectedRoles") || "[]");
        if (selectedRoles.includes("homeowner")) {
          navigate("/dashboard/homeowner");
        } else if (selectedRoles.includes("professional")) {
          navigate("/dashboard/professional");
        } else if (selectedRoles.includes("supplier")) {
          navigate("/dashboard/supplier");
        } else {
          // Fallback
          navigate("/dashboard/homeowner");
        }
      } else {
        toast({
          title: "Incorrect OTP",
          description: `The OTP you entered is incorrect. Try ${MOCK_OTP} for demo.`,
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  return (
    <Layout hideFooter>
      <div className="container max-w-md mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Authenticate Your Account</h1>
          <p className="text-gray-600">
            {otpSent
              ? "Enter the 6-digit code sent to your phone"
              : "Enter your phone number to receive a verification code"}
          </p>
        </div>
        
        {!otpSent ? (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex">
                <div className="flex items-center px-3 bg-gray-50 border border-r-0 border-gray-200 rounded-l-md">
                  <PhoneIcon className="h-4 w-4 text-gray-500" />
                </div>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="rounded-l-none"
                />
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleSendOTP}
              disabled={phoneNumber.length < 10 || isLoading}
            >
              {isLoading ? "Sending..." : "Send Verification Code"}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label>Verification Code</Label>
              <div className="flex justify-between gap-2">
                {otp.map((digit, index) => (
                  <Input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    value={digit}
                    onChange={(e) => handleOTPChange(index, e.target.value)}
                    className="text-center text-xl p-6"
                    maxLength={1}
                    autoComplete="off"
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mt-2">For demo, enter: {MOCK_OTP}</p>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleVerifyOTP}
              disabled={otp.join("").length !== 6 || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            
            <p className="text-center text-sm">
              Didn't receive a code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-500">Resend in {countdown}s</span>
              ) : (
                <button 
                  className="text-primary hover:text-primary-800"
                  onClick={() => setOtpSent(false)}
                >
                  Try again
                </button>
              )}
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Authentication;
