import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { siteConfig } from '../../data/siteConfig';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-pink-500">tutto</span>moda
            </h3>
            <p className="text-gray-400 mb-4">
              Tu destino para encontrar las últimas tendencias de moda con estilo y calidad.
            </p>
            <div className="flex space-x-4">
              {siteConfig.socialMedia.instagram && (
                <a href={siteConfig.socialMedia.instagram} target="_blank" rel="noopener noreferrer" 
                   className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Instagram size={20} />
                </a>
              )}
              {siteConfig.socialMedia.facebook && (
                <a href={siteConfig.socialMedia.facebook} target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Facebook size={20} />
                </a>
              )}
              {siteConfig.socialMedia.twitter && (
                <a href={siteConfig.socialMedia.twitter} target="_blank" rel="noopener noreferrer"
                   className="text-gray-400 hover:text-pink-500 transition-colors">
                  <Twitter size={20} />
                </a>
              )}
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">Enlaces</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white transition-colors">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to="/category/1" className="text-gray-400 hover:text-white transition-colors">
                  Vestidos
                </Link>
              </li>
              <li>
                <Link to="/category/2" className="text-gray-400 hover:text-white transition-colors">
                  Pantalones
                </Link>
              </li>
              <li>
                <Link to="/category/3" className="text-gray-400 hover:text-white transition-colors">
                  Blusas
                </Link>
              </li>
              <li>
                <Link to="/category/4" className="text-gray-400 hover:text-white transition-colors">
                  Accesorios
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-pink-500">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-start">
                <MapPin className="w-5 h-5 text-pink-500 mr-2 mt-0.5" />
                <span className="text-gray-400">{siteConfig.address}</span>
              </div>
              <div className="flex items-center">
                <Phone className="w-5 h-5 text-pink-500 mr-2" />
                <span className="text-gray-400">{siteConfig.phone}</span>
              </div>
              <div className="flex items-center">
                <Mail className="w-5 h-5 text-pink-500 mr-2" />
                <a href={`mailto:${siteConfig.email}`} className="text-gray-400 hover:text-white transition-colors">
                  {siteConfig.email}
                </a>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} tuttomoda. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;