async function main() {
    try {
        console.log("Generating dataset...")

        const englishIndonesiaTxt = Bun.file("./public/english_indonesia.txt")
        const indonesiaEnglishTxt = Bun.file("./public/indonesia_english.txt")

        console.log(englishIndonesiaTxt)
        console.log(indonesiaEnglishTxt)

        const englishIndonesiaText = await englishIndonesiaTxt.text()
        const indonesiaEnglishText = await indonesiaEnglishTxt.text()

        const englishIndonesiaArr = englishIndonesiaText
            .split("\n")
            .map((line) => line.split("\t"))
            .filter((lineArr) =>  /^[a-zA-Z]{2,}$/g.test(lineArr[0]))
        const indonesiaEnglishArr = indonesiaEnglishText
            .split("\n")
            .map((line) => line.split("\t"))
            .filter((lineArr) => /^[a-zA-Z]{2,}$/g.test(lineArr[0]))

        const englishIndonesiaJson = JSON.stringify(englishIndonesiaArr)
        const indonesiaEnglishJson = JSON.stringify(indonesiaEnglishArr)

        await Bun.write("./public/english_indonesia.json", englishIndonesiaJson)
        await Bun.write("./public/indonesia_english.json", indonesiaEnglishJson)

        // shuffle randomly with 20 items each
        // repeat 20 times
        // then save to ./public/words/english_indonesia_1.json, ./public/words/english_indonesia_2.json, ..., 20.json
        for (let i = 0; i < 50; i++) {
            let chunkedEnglishIndonesiaArr: Array<Array<string>> = []
            let chunkedIndonesiaEnglishArr: Array<Array<string>> = []

            for (let j = 0; j < 20; j++) {
                const randomIndex = Math.floor(Math.random() * englishIndonesiaArr.length)
                const randomIndex2 = Math.floor(Math.random() * indonesiaEnglishArr.length)

                chunkedEnglishIndonesiaArr.push(englishIndonesiaArr[randomIndex])
                chunkedIndonesiaEnglishArr.push(indonesiaEnglishArr[randomIndex2])

                englishIndonesiaArr.splice(randomIndex, 1)
                indonesiaEnglishArr.splice(randomIndex2, 1)
            }

            Bun.write(`./public/words/english_indonesia_${i + 1}.json`, JSON.stringify(chunkedEnglishIndonesiaArr))
            Bun.write(`./public/words/indonesia_english_${i + 1}.json`, JSON.stringify(chunkedIndonesiaEnglishArr))
        }
    } catch (error) {
        console.error(error)
    }
}

main()
