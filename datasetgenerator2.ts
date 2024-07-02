import type { Word } from "./types/word"

async function main() {
    try {
        // get all files from ./public/words/english_indonesia_10..20.json
        // map them each to Bun.File()
        // iterate them
        // read the text
        // parse to object Word
        // lowercase the "english" property value
        // save to ./public/words/english_indonesia_10..20.json

        console.log("Generating dataset...")

        for (let i = 10; i <= 20; i++) {
            const englishIndonesiaTxt = Bun.file(`./public/words/english_indonesia_${i}.json`)

            const englishIndonesiaText = await englishIndonesiaTxt.text()

            const englishIndonesiaArr = JSON.parse(englishIndonesiaText)
            const englishIndonesiaArrLowercase: Word[] = englishIndonesiaArr.map((word: Word) => {
                return {
                    english: word.english.toLowerCase(),
                    indonesia: word.indonesia,
                    definisi: word.definisi,
                    sentence: word.sentence,
                }
            })

            await Bun.write(`./public/words/english_indonesia_${i}.json`, JSON.stringify(englishIndonesiaArrLowercase, null, 2))
        }
    } catch (error) {
        console.error(error)
    }
}

main()
