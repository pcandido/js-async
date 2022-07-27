const fs = require('fs')
const path = require('path')

function process(filePath, callback) {
  fs.readFile(filePath, (err, data) => {
    if (err) return callback(err)

    const text = data.toString()
    const keywords = text.split(/\s*,\s*/)

    callback(null, keywords)
  })
}

function main() {
  const getFilePath = fileName => path.resolve(__dirname, '../data', fileName)
  const validFile1 = getFilePath('keywords.txt')
  const validFile2 = getFilePath('keywords.txt')
  const invalidFile = getFilePath('keywords-invalid.txt')

  process(validFile1, (err, keywords1) => {
    if (err) throw err

    process(validFile2, (err, keywords2) => {
      console.log(keywords1)
      console.log(keywords2)
      console.log('end')
    })
  })

  setTimeout(() => {
    process(invalidFile, (err, keywords) => {
      if (err) return console.error('Ocorreu um erro ao processar o arquivo')
      console.log(keywords)
      console.log('end')
    })
  }, 2000)
}

main()