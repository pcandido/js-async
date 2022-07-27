const fs = require('fs/promises')
const path = require('path')

function process(filePath) {
  return fs.readFile(filePath)
    .then(data => data.toString())
    .then(text => text.split(/\s*,\s*/))
}

function later(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

function main() {
  const getFilePath = fileName => path.resolve(__dirname, '../data', fileName)
  const validFile1 = getFilePath('keywords.txt')
  const validFile2 = getFilePath('keywords.txt')
  const invalidFile = getFilePath('keywords-invalid.txt')

  process(validFile1).then(keywords1 => {
    process(validFile2).then(keywords2 => {
      console.log(keywords1)
      console.log(keywords2)
      console.log('end')
    })
  })

  later(2000)
    .then(() => process(invalidFile))
    .then(keywords => {
      console.log(keywords)
      console.log('end')
    })
    .catch(() => console.error('Ocorreu um erro ao processar o arquivo'))
}

main()