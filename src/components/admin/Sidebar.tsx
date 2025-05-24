import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Tags, Settings, LogOut } from 'lucide-react';
import { useAdminStore } from '../../stores/adminStore';

const Sidebar: React.FC = () => {
  const location = useLocation();
  const logout = useAdminStore((state) => state.logout);
  
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <aside className="bg-gray-900 text-white w-64 min-h-screen flex flex-col">
      <div className="p-4 border-b border-gray-800">
        <Link to="/admin" className="flex items-center">
          <span className="text-xl font-bold">
            <span className="text-pink-500">tutto</span>moda
          </span>
        </Link>
        <div className="text-sm text-gray-400 mt-1">Panel de Administración</div>
      </div>
      
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          <li>
            <Link
              to="/admin"
              className={`flex items-center p-3 rounded-md ${
                isActive('/admin') 
                  ? 'bg-pink-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <LayoutDashboard className="h-5 w-5 mr-3" />
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/admin/products"
              className={`flex items-center p-3 rounded-md ${
                isActive('/admin/products') 
                  ? 'bg-pink-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <ShoppingBag className="h-5 w-5 mr-3" />
              Productos
            </Link>
          </li>
          <li>
            <Link
              to="/admin/categories"
              className={`flex items-center p-3 rounded-md ${
                isActive('/admin/categories') 
                  ? 'bg-pink-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Tags className="h-5 w-5 mr-3" />
              Categorías
            </Link>
          </li>
          <li>
            <Link
              to="/admin/settings"
              className={`flex items-center p-3 rounded-md ${
                isActive('/admin/settings') 
                  ? 'bg-pink-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-800'
              }`}
            >
              <Settings className="h-5 w-5 mr-3" />
              Configuración
            </Link>
          </li>
        </ul>
      </nav>
      
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={logout}
          className="flex items-center p-3 w-full text-left rounded-md text-gray-300 hover:bg-gray-800"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;