//Configuration for multer middleware:
const multer = require("multer");

const storage = multer.diskStorage({
	// store files in ./uploads
	destination: function (req, file, next) {
		next(null, "./uploads");
	},
	filename: function (req, file, next) {
		next(null, Date.now() + "--" + file.originalname);
	},
});

// check filetypes:
const fileFilter = (req, file, next) => {
	if (
		file.mimetype.includes("jpeg") ||
		file.mimetype.includes("png") ||
		file.mimetype.includes("jpg")
	) {
		next(null, true);
	} else {
		next(null, false);
	}
};

let upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = { upload };
