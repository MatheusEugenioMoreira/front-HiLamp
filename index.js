const http = require("http");
const express = require("express");
const server = http.createServer();
const app = express();

app.use("/styles", express.static("styles"));
app.use("/assets", express.static("assets"));
app.get("/", (req,res) => res.sendFile(__dirname + "/index.html"));
app.post("/tagbatch", (req,res) => console.log("teste"));
app.listen(3000,() => console.log("Listening on port 3000"));







const data = JSON.stringify({
	"setTags":
	[{"name": "Application_Andar_3_IN_Iluminacao_3pav_Circuito3", "value": "true"}]
})
const options = {
  hostname: '192.168.15.249',
  port: 8083,
  path: '/tagbatch',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
}
const req = http.request(options, (res) => {
  console.log(`statusCode: ${res.statusCode}`)
  res.on('data', (d) => {
    process.stdout.write(d)
  })
})
req.on('error', (error) => {
  console.error(error)
})
req.write(data)
req.end()
