const fs = require('fs') //Import FS Module

/*fs.readFile('demo.txt', (err, file) => {
    if (err) {
        console.log(err)
    } else {
        console.log(file)
    }
})*/

/*
fs.mkdir('./image',(error)=>{
    if(error){
        console.log(error)
    }else{
        console.log("Folder created")
    }
})*/

//check if file exist
if(fs.existsSync('./demo.txt')){
    fs.unlink('./demo.txt', (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("File deleted")
        }
    })
}



if(fs.existsSync('./image')) 
{
    console.log("Folder exist")
} else
{
     fs.mkdir('./image', (error) => {
        if (error) {
            console.log(error)
        } else {
            console.log("Folder created")
        }
    })
}

