import React, { useState, useEffect } from 'react';
import { Edit, Trash, Plus, Loader2 } from 'lucide-react';
import Sidebar from '../../components/admin/Sidebar';
import ImageUpload from '../../components/admin/ImageUpload';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface Category {
  id: string;
  name: string;
  image_url: string | null;
}

const AdminCategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCategory, setCurrentCategory] = useState<Category | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    image_url: ''
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');

      if (error) throw error;

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Error al cargar las categorías');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (isEditing && currentCategory) {
        const { error } = await supabase
          .from('categories')
          .update({
            name: formData.name,
            image_url: formData.image_url || null
          })
          .eq('id', currentCategory.id);

        if (error) throw error;
        toast.success('Categoría actualizada exitosamente');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{
            name: formData.name,
            image_url: formData.image_url || null
          }]);

        if (error) throw error;
        toast.success('Categoría creada exitosamente');
      }

      setShowModal(false);
      setFormData({ name: '', image_url: '' });
      setCurrentCategory(null);
      setIsEditing(false);
      fetchCategories();
    } catch (error) {
      console.error('Error saving category:', error);
      toast.error('Error al guardar la categoría');
    }
  };

  const handleEdit = (category: Category) => {
    setCurrentCategory(category);
    setFormData({
      name: category.name,
      image_url: category.image_url || ''
    });
    setIsEditing(true);
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta categoría?')) return;

    try {
      const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast.success('Categoría eliminada exitosamente');
      fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
      toast.error('Error al eliminar la categoría');
    }
  };

  const handleImageUpload = (url: string) => {
    setFormData(prev => ({ ...prev, image_url: url }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      
      <div className="flex-1 overflow-auto">
        <div className="p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Gestión de Categorías</h1>
            <button 
              onClick={() => {
                setIsEditing(false);
                setCurrentCategory(null);
                setFormData({ name: '', image_url: '' });
                setShowModal(true);
              }}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Nueva Categoría
            </button>
          </div>
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-pink-600" />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Categoría
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categories.map((category) => (
                    <tr key={category.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {category.image_url && (
                            <div className="h-10 w-10 flex-shrink-0">
                              <img 
                                className="h-10 w-10 rounded-full object-cover" 
                                src={category.image_url} 
                                alt="" 
                              />
                            </div>
                          )}
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{category.name}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{category.id}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button 
                          onClick={() => handleEdit(category)}
                          className="text-indigo-600 hover:text-indigo-900 mr-3"
                        >
                          <Edit className="h-5 w-5" />
                        </button>
                        <button 
                          onClick={() => handleDelete(category.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          <Trash className="h-5 w-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">
              {isEditing ? 'Editar Categoría' : 'Nueva Categoría'}
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-pink-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Imagen
                </label>
                <ImageUpload
                  onUpload={handleImageUpload}
                  currentImage={formData.image_url}
                />
              </div>
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-pink-600 text-white rounded-md hover:bg-pink-700"
                >
                  {isEditing ? 'Actualizar' : 'Crear'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCategoriesPage;