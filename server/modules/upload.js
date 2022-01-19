//Configuration for multer middleware:
const multer = require("multer");
const UUID = require("uuid");

const storage = multer.diskStorage({
	// store files in ./uploads
	destination: function (req, file, next) {
		next(null, "./uploads");
	},
	filename: function (req, file, next) {
		const fileName = UUID.v4() + "-" + file.originalname;
		next(null, fileName);
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
