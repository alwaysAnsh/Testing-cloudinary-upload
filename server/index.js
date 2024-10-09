// Import dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import cloudinary from 'cloudinary';
import fileUpload from 'express-fileupload';
import { getAllImages } from './controller/images.controller.js';
import path from 'path'


const __dirname = path.resolve();
// Initialize Express app
const app = express();

dotenv.config();  // Load environment variables

// Middleware
app.use(cors()); // Enable CORS
app.use(bodyParser.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(fileUpload({ useTempFiles: true })); // Handle file uploads

// Cloudinary configuration
cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Connect to MongoDB
// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// })
// .then(() => console.log('MongoDB connected successfully'))
// .catch((err) => console.error('MongoDB connection error:', err));

// Simple test route
app.get('/', (req, res) => {
    res.send('Welcome to the MERN backend with Cloudinary!');
});

// Cloudinary image upload route
app.post('/upload', (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const file = req.files.image; // Assuming the image file field is called 'image'

    // Upload image to Cloudinary
    cloudinary.v2.uploader.upload(file.tempFilePath, { folder: 'uploads' })
        .then((result) => {
            res.json({
                success: true,
                url: result.secure_url, // The URL of the uploaded image
            });
        })
        .catch((error) => {
            res.status(500).json({
                success: false,
                message: 'Image upload failed',
                error: error.message,
            });
        });
});
app.get('/images', getAllImages);

app.use(express.static(path.join(__dirname, '/client/dist')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client','dist','index.html'))
})

// Port configuration
const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
