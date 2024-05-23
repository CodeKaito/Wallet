const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const invoiceStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "invoices",
  },
});

const cloudinaryInvoiceMiddleware = multer({ storage: invoiceStorage }).single(
  "invoice"
);

module.exports = cloudinaryInvoiceMiddleware;
