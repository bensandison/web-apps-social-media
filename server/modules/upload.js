const multer = require("multer");

const upload = multer({
	dest: "temp-uploads/",
	// you might also want to set some limits: https://github.com/expressjs/multer#limits
});

function uploadImage(req, res, next) {
	// Call multer middleware function
	upload.single("file"),
		(req, res) => {
			const tempPath = req.file.path;
			//Need to go up a directory for the uploads folder so use "../"
			const targetPath = path.join(__dirname, "../uploads", "/image.png");

			//Check filetype
			if (path.extname(req.file.originalname).toLowerCase() === ".png") {
				fs.rename(tempPath, targetPath, (err) => {
					if (err) return next(err);
					res.json({ message: "file uploaded" });
				});
			} else {
				fs.unlink(tempPath, (err) => {
					if (err) return next(err);
					return next(new Error("Only .png files are allowed"));
				});
			}
		};
}

module.exports = { uploadImage };
