
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Linkedin, Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div>
            <Link to="/" className="flex items-center">
              <span className="text-primary-400 font-bold text-xl">Skillink</span>
              <span className="text-orange-400 font-bold">24/7</span>
            </Link>
            <p className="mt-3 text-gray-400">
              Connecting homeowners, professionals, and material suppliers for seamless construction and renovation projects.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter size={18} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Linkedin size={18} />
              </a>
            </div>
          </div>
          
          {/* For Clients */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Homeowners</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/professionals" className="hover:text-primary-400">Find Professionals</Link>
              </li>
              <li>
                <Link to="/materials" className="hover:text-primary-400">Shop Materials</Link>
              </li>
              <li>
                <Link to="/how-it-works" className="hover:text-primary-400">How It Works</Link>
              </li>
              <li>
                <Link to="/pricing" className="hover:text-primary-400">Pricing</Link>
              </li>
            </ul>
          </div>
          
          {/* For Professionals */}
          <div>
            <h3 className="text-lg font-semibold mb-4">For Professionals</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/join-as-professional" className="hover:text-primary-400">Join as Professional</Link>
              </li>
              <li>
                <Link to="/success-stories" className="hover:text-primary-400">Success Stories</Link>
              </li>
              <li>
                <Link to="/supplier-registration" className="hover:text-primary-400">Become a Supplier</Link>
              </li>
              <li>
                <Link to="/resources" className="hover:text-primary-400">Resources</Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 mt-1" />
                <span>support@skillink247.com</span>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 mt-1" />
                <span>+1 (555) 123-4567</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Skillink 24/7. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy-policy" className="text-sm text-gray-400 hover:text-white">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-sm text-gray-400 hover:text-white">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
