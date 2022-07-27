const fs = require('fs/promises')
const path = require('path')

async function process(filePath) {
  const data = await fs.readFile(filePath)
  const text = data.toString()
  const keywords = text.split(/\s*,\s/)
  return keywords
}

function later(delay) {
  return new Promise(resolve => setTimeout(resolve, delay))
}

async function main() {
  const getFilePath = fileName => path.resolve(__dirname, '../data', fileName)
  const validFile1 = getFilePath('keywords.txt')
  const validFile2 = getFilePath('keywords.txt')
  const invalidFile = getFilePath('keywords-invalid.txt')

  const keywords1 = await process(validFile1)
  const keywords2 = await process(validFile2)
  console.log(keywords1)
  console.log(keywords2)
  console.log('end')

  await later(2000)
  try {
    const keywords = await process(invalidFile)
    console.log(keywords)
    console.log('end')
  } catch {
    console.error('Ocorreu um erro ao processar o arquivo')
  }
}

main()