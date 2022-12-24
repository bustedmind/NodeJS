const http = require('http')
const fs = require('fs')
const server = http.createServer((req,res)=>{
    const header = req.headers;
    const url = req.url;
    const method = req.method;

    if(req.url === '/'){
        // req from home
        res.write('<html>');
        res.write('<head><title>Upload</title></head><body><h1>Upload Text</h1><br><form method="POST" action="/send"><input type="text" name="message"><br><input type="submit"></body>');
        res.write('</html>');
        res.end()
    }
    else if(req.url === '/send' ){
        // console.log(req.headers, req.url, req.method, );
        let ar = [];
        req.on('data', (dt)=>{
            console.log(dt);
            ar.push(dt);
        });
        req.on('end',()=>{
            const msg = Buffer.concat(ar).toString();
            const msgf = msg.split("=")[1];
            console.log(msgf);
            fs.writeFileSync('log.txt', msgf);
        })
        
        // console.log(req);
        res.write('<html>');
        res.write('<head><title>Ay App</title></head><body><h1>Text Uploaded</h1></body>');
        res.write('</html>');
        res.statusCode = 302;
        // res.setHeader('location','/');
        res.end()
    }   

})

server.listen(8080);