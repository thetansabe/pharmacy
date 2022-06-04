const fs = require('fs')

const uploadFile = async (files) =>{
    //console.log('files: ', files)

    //bat ket duoi' day bang fetch
    //gui data de xu li ben promise cua fetch
    const element = files[0]
    
    if(!element.originalFilename) return false
    //MOVE FILE into public/upload
    //khac o dia -> ko co' rename (move) duoc
    //chi co the dung copy

    const oldPath = element.path
    const newPath = __dirname+'/../public/images/'+element.originalFilename

    fs.copyFileSync(oldPath, newPath)

    return element.originalFilename
}

module.exports = {
    uploadFile
}