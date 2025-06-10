import React, { useCallback } from 'react';
import { Upload, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImages?: string[];
  onRemove?: (index: number) => void;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ 
  onUpload, 
  currentImages = [], 
  onRemove,
  multiple = false 
}) => {
  const uploadImage = useCallback(async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;
      
      const { error: uploadError, data } = await supabase.storage
        .from('images')
        .upload(filePath, file);
      
      if (uploadError) {
        throw uploadError;
      }
      
      const { data: { publicUrl } } = supabase.storage
        .from('images')
        .getPublicUrl(data.path);
      
      onUpload(publicUrl);
      toast.success('Imagen subida exitosamente');
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Error al subir la imagen');
    }
  }, [onUpload]);
  
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const files = Array.from(event.target.files);
    
    if (multiple) {
      // Upload multiple files
      for (const file of files) {
        await uploadImage(file);
      }
    } else {
      // Upload single file
      await uploadImage(files[0]);
    }
    
    // Reset the input
    event.target.value = '';
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* Display current images */}
      {currentImages.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4 w-full">
          {currentImages.map((image, index) => (
            <div key={index} className="relative group">
              <img
                src={image}
                alt={`Imagen ${index + 1}`}
                className="w-full h-24 object-cover rounded-lg border"
              />
              {onRemove && (
                <button
                  type="button"
                  onClick={() => onRemove(index)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      
      {/* Upload area */}
      <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-gray-50 transition-colors">
        <Upload className="w-8 h-8 text-gray-500" />
        <span className="mt-2 text-base leading-normal">
          {multiple ? 'Seleccionar imágenes' : 'Seleccionar imagen'}
        </span>
        <span className="text-sm text-gray-500 mt-1">
          {multiple ? 'Puedes seleccionar múltiples archivos' : 'Solo un archivo'}
        </span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          multiple={multiple}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;