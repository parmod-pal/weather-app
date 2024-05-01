const http = require('http');
const app = require('./app');
const server = http.createServer(app)
const PORT = 5000;
function startServer(){
    server.listen(PORT,()=>{
        console.log(`listening on PORT ${PORT}`);
    })
}
startServer();