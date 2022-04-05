//required packages
const express = require("express");
const fetch = require("node-fetch")
require("dotenv").config();

//create the express server
const app = express();

//server port number
const PORT = process.env.PORT || 3000;

//set template engine
app.set("view engine", "ejs");
app.use(express.static("public"));

//needed to parse html data for post request
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json());

app.get("/", (req, res) => {
    res.render("index")
})

app.post("/convert-mp3", async (req, res) => {
  const videoId = req.body.videoID;
  if(
  videoId === undefined ||
  videoId === "" ||
  videoId === null 
 ){
    return res.render("index", { success : dalse, message : "Please enter a valid video ID" });
 } else{
     const fetchAPI = await fetch(`https://youtube-to-mp32.p.rapidapi.com/api/yt_to_mp3${videoId}`, {
         "method": "GET",
         "headers": {
             "x-rapidapi-key": process.env.API_KEY,
             "x-rapidapi-host": process.env.API_HOST
         }
     });

     const fetchResponse = await fetchAPI.json();

     if(fetchResponse.status === "ok")
     return res.render("index", {success : true, song_title: fetchResponse. title, song_link :fetchResponse.link});
     else 
      return res.render("index", {success: false, message : fetchResponse.msg})     
  }
 })

//start the server
app.listen(PORT, () => {
    console.log('Server started on port 3000')
})
