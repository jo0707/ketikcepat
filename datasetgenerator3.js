async function main() {
    try {
        console.log("Generating dataset...")

        const englishIndonesiaTxt = Bun.file("./public/english_indonesia.json")
        const indonesiaEnglishTxt = Bun.file("./public/indonesia_english.json")

        const englishIndonesiaText = await englishIndonesiaTxt.text()
        const indonesiaEnglishText = await indonesiaEnglishTxt.text()

        const eiobjs = {}

        JSON.parse(englishIndonesiaText).forEach((arr) => {
            eiobjs[arr[0]] = arr[1]
        })
        const ieobjs = {}
        JSON.parse(indonesiaEnglishText).forEach((arr) => {
            ieobjs[arr[0]] = arr[1]
        })

        await Bun.write("./public/english_indonesia2.json", JSON.stringify(eiobjs))
        await Bun.write("./public/indonesia_english2.json", JSON.stringify(ieobjs))
    } catch (error) {
        console.error(error)
    }
}

main()
