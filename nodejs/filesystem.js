const fs = require('fs') //Import FS Module

// Create a file
fs.writeFile('demo.txt', "This is an example", (err) => {
    if (err) {
        console.log(err)
    } else {
        console.log("File successfully created")
        fs.readFile('demo.txt', 'utf8', (err, file) => {
            if (err) {
                console.log(err)
            } else {
                console.log(file)
            }
        })
    }
})
