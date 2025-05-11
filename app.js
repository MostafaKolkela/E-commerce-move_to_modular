const express = require('express');
const helmet = require('helmet')
const dotenv = require('dotenv')
const AppError = require('./utils/AppError')
const GlobalError = require('./utils/ErrorHandler')
const ratelimit = require('express-rate-limit')
const dataSanitizer = require('express-mongo-sanitize')
const xss = require('xss-clean')
const morgan = require('morgan')
const { initializeRedisClient } = require("./middleware/redis");
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
dotenv.config({path : './config/.env'})
const path = require('path')
const cors = require('cors')

const rate = ratelimit({
    max : 100,
    windowMs : 60 * 60 * 1000,
    message : 'There is too many requestes from this IP, Plz Try After one Hour'
})


async function startserver (){

const app = express();
app.use(helmet())
app.use(express.json({limit : '10kb'}));
app.use(dataSanitizer())
app.use(xss())
app.use('/api' , rate)
app.use(cookieParser())
app.use(GlobalError)
app.use(morgan('dev'))
app.use(express.static(path.join(__dirname , 'uploads')))
app.use(cors())


await initializeRedisClient()


const productRoutes = require('./product/route/productRoutes')
app.use('/api/products', productRoutes )


const authRoutes = require('./Auth/route/authRouter')
app.use('/api/auth' , authRoutes)


const userRoutes = require('./User/route/userRouter')
app.use('/api/users' , userRoutes)

const categoryRoutes = require('./category/router/categoryRoute')
app.use("/api/categories", categoryRoutes);

const subcategoryRoutes = require('./subcategory/router/subcategoryRoute')
app.use("/api/subcategories", subcategoryRoutes);

const countryRoutes = require('./country/router/countryRoute.js')
app.use("/api/Countries", countryRoutes);

const brandRoutes = require('./brand/router/brandRoute.js')
app.use("/api/brands", brandRoutes);

const cartRoutes = require('./Cart/route/CartRouter')
app.use('/api/cart' , cartRoutes )


const orderRoutes = require('./order/route/orderRouter')
app.use('/api/order' , orderRoutes)

const favoriteRoutes = require('./favorite/route/favoriteRoutes.js');
app.use('/api/favorites', favoriteRoutes);

const reviewRoutes = require('./review/router/reviewRoute.js');
app.use('/api/reviews', reviewRoutes);


app.all('*' , (req,res,next)=>{
    next(new AppError(`can not find ${req.originalUrl} on this server!` ,404))
})

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        success: false,
        status: err.status,
        message: err.message
    });
});


mongoose.connect(process.env.URI)
.then(
    app.listen(process.env.PORT, ()=>{
        console.log(`started on port ${process.env.PORT}`)
    })
)
.catch(err=>{console.log(err)})
}

startserver().then('done all').catch(err=>console.log(err))