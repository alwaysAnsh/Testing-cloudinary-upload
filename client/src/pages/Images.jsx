import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Images = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch all images from the backend
    useEffect(() => {
        const fetchImages = async () => {
            try {
                const response = await axios.get('http://localhost:5000/images');
                setImages(response.data.images);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch images');
                setLoading(false);
            }
        };

        fetchImages();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="image-gallery grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {images.map((imageUrl, index) => (
                <div key={index} className="image-item">
                    <img 
                        src={imageUrl} 
                        alt={`Uploaded ${index}`} 
                        className="w-full h-48 object-cover rounded-md shadow-md"
                    />
                </div>
            ))}
        </div>
    );
};

export default Images;
