import cloudinary from 'cloudinary';

// Cloudinary configuration (this should already be set in your index.js)
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all uploaded images (this assumes you have uploaded images to a specific folder like 'uploads')
export const getAllImages = async (req, res) => {
    try {
        const resources = await cloudinary.v2.api.resources({
            type: 'upload',
            prefix: 'uploads/',  // The folder where your images are uploaded
            max_results: 30      // You can adjust this number based on how many images you want to fetch
        });

        // Return image URLs
        const imageUrls = resources.resources.map(resource => resource.secure_url);
        res.status(200).json({ success: true, images: imageUrls });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to retrieve images', error: error.message });
    }
};
