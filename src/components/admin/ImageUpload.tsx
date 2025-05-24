import React, { useCallback } from 'react';
import { Upload } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import toast from 'react-hot-toast';

interface ImageUploadProps {
  onUpload: (url: string) => void;
  currentImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onUpload, currentImage }) => {
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
  
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    uploadImage(event.target.files[0]);
  };
  
  return (
    <div className="flex flex-col items-center justify-center w-full">
      {currentImage && (
        <img
          src={currentImage}
          alt="Current"
          className="w-32 h-32 object-cover mb-4 rounded-lg"
        />
      )}
      
      <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-gray-50">
        <Upload className="w-8 h-8 text-gray-500" />
        <span className="mt-2 text-base leading-normal">Seleccionar imagen</span>
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;