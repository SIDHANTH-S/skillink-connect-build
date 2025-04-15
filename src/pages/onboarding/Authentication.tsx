
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Layout } from "@/components/layout/Layout";

const Authentication = () => {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSendOTP = () => {
    // Validate phone number
    if (phoneNumber.length < 10) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setOtpSent(true);
      setIsLoading(false);
    }, 1000);
  };
  
  const handleOTPChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1);
    if (!/^\d*$/.test(value)) return;
    
    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);
    
    // Auto-focus next input
    if (value && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };
  
  const handleVerifyOTP = () => {
    setIsLoading(true);
    
    // Simulate API verification
    setTimeout(() => {
      setIsLoading(false);
      navigate("/onboarding/location");
    }, 1000);
  };
  
  return (
    <Layout hideFooter>
      <div className="container max-w-md mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold mb-2">Authenticate Your Account</h1>
          <p className="text-gray-600">
            {otpSent
              ? "Enter the 4-digit code sent to your phone"
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
                  />
                ))}
              </div>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleVerifyOTP}
              disabled={otp.join("").length !== 4 || isLoading}
            >
              {isLoading ? "Verifying..." : "Verify"}
            </Button>
            
            <p className="text-center text-sm">
              Didn't receive a code?{" "}
              <button 
                className="text-primary-600 hover:text-primary-800"
                onClick={() => setOtpSent(false)}
              >
                Try again
              </button>
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Authentication;
