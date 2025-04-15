
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Splash = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      navigate("/onboarding");
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="relative">
        <div className="absolute inset-0 bg-blue-500 opacity-10 animate-pulse rounded-full"></div>
        <div className="relative z-10 flex items-center justify-center">
          <span className="text-primary-600 text-5xl font-bold">Skillink</span>
          <span className="text-orange-500 text-5xl font-bold">24/7</span>
        </div>
      </div>
      <p className="text-gray-500 mt-4">Civil Engineering & Construction Services</p>
      
      {/* Blueprint pattern background - decorative */}
      <div className="absolute inset-0 z-0 opacity-5" style={{ 
        backgroundImage: `
          linear-gradient(to right, #3B82F6 1px, transparent 1px),
          linear-gradient(to bottom, #3B82F6 1px, transparent 1px)
        `,
        backgroundSize: '20px 20px'
      }}></div>
    </div>
  );
};

export default Splash;
