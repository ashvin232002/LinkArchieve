const  express  =  require("express");
const  app = express();


//importing the routes
const  userRoutes  =  require("./routes/Auth");
const entryRoutes =  require("./routes/Entry")

const  cors  =  require("cors");

require("dotenv").config();

const PORT =  process.env.PORT || 4000 ;

const  cookieParser  =  require("cookie-parser");

const  database  =  require("./config/Database");
database.connect();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin:"https://linkarchievebackend.onrender.com/api/v1",
        credentials:true,
    })
)


app.use("/api/v1/auth" , userRoutes);
app.use("/api/v1/Entry",entryRoutes);


//default  route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});

//activate the server 
app.listen(PORT, () => {
	console.log(`App is running at ${PORT}`)
})
