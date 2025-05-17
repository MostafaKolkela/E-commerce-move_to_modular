const multer = require('multer')
const AppError = require('../utils/AppError')

// Use memory storage instead of disk storage
const memoryStorage = multer.memoryStorage()

const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0]
    if(type === 'image') {
        return cb(null, true)
    } else {
        return cb(new AppError('file must be an image', 401), false)
    }
}

const uploads = multer({
    storage: memoryStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})

// Convert file buffer to base64
const processUpload = (req, res, next) => {
    if (!req.file && !req.files) {
        return next()
    }

    const processFile = (file) => {
        const base64 = file.buffer.toString('base64')
        file.base64 = `data:${file.mimetype};base64,${base64}`
    }

    if (req.file) {
        processFile(req.file)
    } else if (req.files) {
        req.files.forEach(processFile)
    }

    next()
}

module.exports = {
    uploads,
    processUpload
}