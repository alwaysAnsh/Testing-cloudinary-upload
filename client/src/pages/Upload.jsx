import React, { useState } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Upload = () => {
    const [image, setImage] = useState(null);  // Store the selected image
    const [preview, setPreview] = useState(''); // For image preview
    const [message, setMessage] = useState(''); // For displaying success/failure message
    const [imageUrl, setImageUrl] = useState(''); // Store the uploaded image URL

    // Handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        setPreview(URL.createObjectURL(file)); // Preview the selected image
    };

    // Handle form submit for image upload
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage('Please select an image to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('image', image);  // Append the selected image

        try {
            const response = await axios.post('https://cloudinary-upload-m412.onrender.com/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            setMessage('Image uploaded successfully!');
            setImageUrl(response.data.url);  // Get the URL of the uploaded image
        } catch (error) {
            setMessage('Image upload failed. Please try again.');
        }
    };

    return (
        <div className="upload-container flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Upload Image</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-lg p-6 w-80">
                <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                    className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
                />
                {preview && (
                    <img 
                        src={preview} 
                        alt="Image Preview" 
                        className="w-full h-48 object-cover rounded-md mb-4"
                    />
                )}
                <button 
                    type="submit" 
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                >
                    Upload
                </button>
            </form>

            {message && <p className="mt-4 text-center text-gray-700">{message}</p>}

            {imageUrl && (
                <div className="mt-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Uploaded Image:</h3>
                    <img 
                        src={imageUrl} 
                        alt="Uploaded" 
                        className="w-48 h-48 object-cover rounded-lg shadow-md"
                    />
                </div>
            )}
            <button className='border-2 rounded-md bg-orange-800 text-white hover:bg-orange-600 p-3 mt-5  transition-all' >
                <Link to='/get-images'>
                Get images</Link>
            </button>
        </div>
    );
};

export default Upload;
