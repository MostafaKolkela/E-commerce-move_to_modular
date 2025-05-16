const multer = require('multer')
const AppError = require('../utils/AppError')
const fs = require('fs')

// Create a storage engine that stores files in memory
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
    fileFilter
})

// Create a middleware to process the file after multer
const processUpload = (req, res, next) => {
    if (!req.file && !req.files) {
        return next()
    }

    const processFile = (file) => {
        // Convert buffer to base64
        const base64Data = file.buffer.toString('base64')
        // Create data URL
        file.dataUrl = `data:${file.mimetype};base64,${base64Data}`
        // Store image data in req
        file.imageData = base64Data
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