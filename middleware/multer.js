const multer = require('multer')
const AppError = require('../utils/AppError')
const path = require('path')

// Configure multer disk storage
const diskStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '.' + ext)
    }
})

const fileFilter = (req, file, cb) => {
    const type = file.mimetype.split('/')[0]
    if(type === 'image') {
        return cb(null, true)
    } else {
        return cb(new AppError('file must be an image', 401), false)
    }
}

const uploads = multer({
    storage: diskStorage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})

// Add file URL to the request
const processUpload = (req, res, next) => {
    if (!req.file && !req.files) {
        return next()
    }

    const baseUrl = `${req.protocol}://${req.get('host')}/`

    const processFile = (file) => {
        file.url = baseUrl + file.path.replace(/\\/g, '/')
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