let enId: Record<string, string> = {}
let idEn: Record<string, string> = {}

export async function initTranslation() {
    if (!localStorage.getItem("en-id") || !localStorage.getItem("id-en")) {
        let response = await fetch("/english_indonesia.json")
        let data = await response.text()
        localStorage.setItem("en-id", data)

        response = await fetch("/indonesia_english.json")
        data = await response.text()
        localStorage.setItem("id-en", data)
    }

    enId = JSON.parse(localStorage.getItem("en-id") ?? "{}")
    idEn = JSON.parse(localStorage.getItem("id-en") ?? "{}")
}

export function searchEnId(word: string) {
    return enId[word]
}

export function searchIdEn(word: string) {
    return idEn[word]
}
