import  express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
// const PORT = process.env.PORT || 3000
const PORT = process.env.PORT || 3000
dotenv.config()
import connectionToDB from "./config/dbConnection.js";
import Routes from "./Routes/routes.js";
import ProductRoutes from "./Routes/product.routes.js"
import cookieParser from "cookie-parser";
import path from "path"

const app = express();
// app.use(express.json());


app.use(express.json())
app.use(express.urlencoded({extended : true}))

app.use(cookieParser());
// app.use(cors({
//     origin:  "*",
//     //   origin: '*' ,
//    Credential:true,
//    optionSuccessStatus:200,
// }));
app.use(cors({
    origin : "*",
    credentials : true,

    // withCredentials : true,
    optionsSuccessStatus: 200

}))
app.use(express.json()) //middleware to work with json data
app.use(express.static(path.join(__dirname, "./mern-client/dist")))
app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, './mern-client/dist/index.html'))
});

app.use("/user" , Routes)
app.use("/admin" ,ProductRoutes )


app.listen(PORT , async ()=>{
    await connectionToDB()
    console.log("Server Started on PORT NO:", PORT)
})