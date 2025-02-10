// // import { v2 as cloudinary } from "cloudinary";

// // cloudinary.config({
// //   cloud_name: process.env.CLOUD_NAME,
// //   api_key: process.env.CLOUD_API_KEY,
// //   api_secret: process.env.CLOUD_API_SECRET,
// // });

// // export default cloudinary;


// import {v2 as cloudinary} from 'cloudinary'

// const connectCloudinary = async()=>{
//     cloudinary.config({
//         cloud_name: process.env.CLOUDINARY_NAME,
//         api_key:process.env.CLOUDINARY_API_KEY,
//         api_secret:process.env.CLOUDINARY_SECRET_KEY,
//     })
// }


// export default connectCloudinary;

import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config(); // Ensure environment variables are loaded

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
});

export default cloudinary;
