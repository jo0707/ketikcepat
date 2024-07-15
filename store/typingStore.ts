import type { Word } from "~/types/word"

export const useTypingStore = defineStore("typing", () => {
    const wordPairs = ref<Word[]>([
        {
            english: "",
            indonesia: "",
            definisi: "",
            sentence: "",
        },
    ])

    const isTraining = ref(false)
    const currentLetterIndex = ref(0)
    const currentWordIndex = ref(0)
    const currentLevel = ref(1)
    const currentWord = computed(() => wordPairs.value[currentWordIndex.value])
    const currentSpeech = useSpeechSynthesis(() => currentWord.value.english, {
        rate: 1,
        pitch: 1.8,
        volume: 1,
    })

    watch(currentWordIndex, () => {
        currentLetterIndex.value = 0

        if (currentWordIndex.value >= 0 && !isTraining.value) {
            currentSpeech.speak()
        }
    })

    function reset() {
        currentWordIndex.value = 0
        currentLetterIndex.value = 0
    }

    async function fetchWords(level: number | string = 1) {
        reset()

        isTraining.value = level === "learn"
        let wordsUrl = level === "learn" ? "/words/learn_1.json" : `/words/english_indonesia_${level}.json`

        try {
            currentLevel.value = parseInt(`${level}`)
        } catch {
            currentLevel.value = 0
        }

        const response = await fetch(wordsUrl)
        wordPairs.value = await response.json()
    }

    return {
        wordPairs,
        currentLetterIndex,
        currentWordIndex,
        currentWord,
        currentLevel,
        fetchWords,
        reset,
        currentSpeech,
    }
})
