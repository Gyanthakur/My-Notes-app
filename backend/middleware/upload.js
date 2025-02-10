import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

export default upload;

// import multer from "multer";


// const storage = multer.diskStorage({
//     filename:function(req,file,callback){
//         callback(null,file.originalname)
//     }
// })

// const upload = multer({storage});
// export default upload;