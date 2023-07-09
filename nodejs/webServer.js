const http = require('http');
const fs = require('fs') 
const dayjs = require('dayjs')

console.log(dayjs().format('YYYY-MM-DD HH:mm:ss'))
console.log(dayjs().year()) 
console.log(dayjs().month())
console.log(dayjs().date())
console.log(dayjs().hour())
console.log(dayjs().minute())
console.log(dayjs().second())


const server = http.createServer((req, res) => {
    /*console.log('Request received')
    console.log(req.url)
    console.log(req.method)*/

    let path = './views/'
    switch (req.url) {
        case '/':
            path += 'index.html'
            res.statusCode = 200
            console.log('index.html')
            break

        case '/about':
            path += 'about.html'
            res.statusCode = 200
            console.log('about.html')
            break

        case '/aboutus' :
            res.statusCode = 301
            res.setHeader('Location', '/about')
            res.end()
            break

        default:
            path += '404.html'
            res.statusCode = 404
            console.log('404.html')
            break
    }

    res.setHeader('Content-Type', 'text/html')
    fs.readFile(path, (err, data) => {
        if (err) {
            res.writeHead(404, {'Content-Type': 'text/html'})
            return res.end("404 Not Found")
        } else {
            res.writeHead(200, {'Content-Type': 'text/html'})
            res.write(data)
            return res.end()
        }
    })
})
    



//localhost listen (port, hostname, callback)
server.listen(3000, () => {
    console.log('Server started on port 3000')
})

//兩大object: request, response

