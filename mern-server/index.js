import  express  from "express";
import cors from 'cors'
import dotenv from 'dotenv'
const PORT = process.env.PORT || 3000
dotenv.config()
import connectionToDB from "./config/dbConnection.js";
import Routes from "./Routes/routes.js";
import ProductRoutes from "./Routes/product.routes.js"
import cookieParser from "cookie-parser";

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


app.use("/user" , Routes)
app.use("/admin" ,ProductRoutes )


app.listen(PORT , async ()=>{
    await connectionToDB()
    console.log("Server Started on PORT NO:", PORT)
})