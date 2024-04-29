const http = require("http")
const fs = require("fs")
const url = require("url")

const port = 2600

const server = http.createServer((req, res)=>{
    
    const urlInfo = url.parse(req.url, true)
    const n = urlInfo.query.n

    if(!n){
        fs.readFile('tabuada.html', (err, data)=> {
            res.writeHead(200, {"Contenty-Type":"text/html"})
            res.write(data)
            return res.end()
        })
    } else {
        res.write(`<h1>Tabuada do ${n}</h1>`)
        for (let i=1; i <= 10; i++) {
            let resposta = n * i;
            const titulo = `<h1> Tabuada do ${n} </h1>`
            const resultado = `<p>` + n +  " X " + i + " = " + resposta + `\n</p>`
            res.write(`<p><h2>${resultado}</h2></p>`)
            fs.appendFileSync('tabuada.html', resultado ,(err, data)=>{
            
                res.end()
            })
        }
        
        
    }
    
    
})

server.listen(port, ()=> {
    console.log(`Servidor rodando na porta: ${port}`)
})


