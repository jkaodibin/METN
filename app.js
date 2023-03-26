const createError = require('http-errors');
const http = require('http');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const {requireAuth} = require('./middleware/auth.middleware');
require('./config/db');
var cookie = require("cookie")
const jwtDecode=require('jwt-decode')

const { Server } = require("socket.io");


let indexRouter = require('./src/routes/index');
let profilsRouter = require('./src/routes/profils');
let dashboardRouter = require('./src/routes/dashboard');



//API routers
let offersApi= require('./src/api/offer.api.js');
let authApi= require('./src/api/auth.api.js');
let userApi= require('./src/api/user.api.js');
let bidApi= require('./src/api/bid.api.js');
let messageApi= require('./src/api/message.api.js');
let socketAuth=require('./src/api/socket.api.js')

const app = express();
var server = http.createServer(app);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

app.use('/', indexRouter);
app.use('/profils', profilsRouter);
app.use('/dashboard', dashboardRouter);


app.use('/api/offers', offersApi);
app.use('/api/auth', authApi);
app.use('/api/users', userApi);
app.use('/api/bids', bidApi);
app.use('/api/messages', messageApi);


const io = new Server(server,{
        cors:{
            origin:'*',
            credentials: true
        }
    });
    let online=[]
    io.on("connection", (socket) => {
        socket.on("addOnlineUser", () => {
            const userId=jwtDecode(cookie.parse(socket.handshake.headers.cookie).jwt).id
            if(!online.find((e)=>{e.userId===userId})){
                online=[...online,{userId,socketId:socket.id}]
            }
            console.log(online)
        })
        socket.on("message", ({msg,to}) => {
            const receiverOnline = connected.find((e)=>e.userId===to)
            if(receiverOnline){
                io.to(socket.Id).emit("message",msg);
            }
            
        });
    
    });



server.listen(3000,()=>{
    console.log('connect')
});

