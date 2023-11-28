var express = require('express')
const app = express()

// var bodyParser = require('body-parser')
// const morgan =require('morgan')
const dotenv = require("dotenv");
const cors =require('cors')
// const port = 5000
const port = process.env.PORT || 5000;
const cookie_parser=require("cookie-parser")
const mongoose =require('mongoose')

dotenv.config();

// const category = require('./routes/category')
// const passport = require('passport');
// var path = require('path');
// app.use(cors())
// const session = require('express-session');
// const cookieSession = require('cookie-session')
// require('./config/passport')(passport)

// app.use('/public',express.static('./uploads'))
// app.enable("trust proxy")
// app.use(fileUpload())
// app.use(cors())//avoid inter port communication error
// app.use(cors({
//     origin:"https://lfs-project.herokuapp.com",
//     credentials: true
// }));
// app.use(cors({
//     origin: ["http://localhost:3000","https://spiffy-crepe-2eafc0.netlify.app/"],
//     credentials: true
// }));
app.use(function(req, res, next) {
  // res.header("Access-Control-Allow-Origin", "*");
  const allowedOrigins = ['http://localhost:3000', 'https://nimble-brigadeiros-5fb66e.netlify.app/'];
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
       res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-credentials", true);
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, UPDATE");
  next();
});
// app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(cookie_parser())
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }));
//Data parsing
var __filename = url.parse(process.cwd() + "/" + (process.argv[1] || ""));
__filename = path.resolve(__filename.pathname);
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb'}));
// app.use(express.urlencoded({extended:false}))
//Express session
// app.use(session({
//     secret:'secret',
//     resave:true,
//     saveUninitialized:true
// }))
//Passport middleware
// app.use(passport.initialize())
// app.use(passport.session())

// app.use(cookieSession({
//     name:'session',
//     keys:['key1','key2']
// }))
// passport.serializeUser(function(user, done) {
//     console.log('serialize')
//     done(null, user.email);
//   });

// passport.deserializeUser(function(id, done) {
//     console.log('deserialize')

//     User.findById(id, function(err, user) {
//       done(err, user);
//     });
// });


// const url = "mongodb://localhost:27017/lostANDfound";
console.log(process.env.MDB_CONNECT);
mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    // useFindAndModify: false,
    // useCreateIndex:true
}).then(()=>{
    console.log("database connection is successful");
}).catch((err)=>{
    console.log("database connection failed with err " + err);
});





app.use("/auth", require('./routers/auth.js'));
app.use('/',require('./routers/category.js'));


app.listen(port,()=> console.log(`Listening to port ${port} !!`))
