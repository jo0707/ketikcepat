// import type { Word } from "~/types/word"

import type { Word } from "~/types/word"

export const useWpmStore = defineStore("wpm", () => {
    const timer = ref<Timer | null>(null)

    const totalStroke = ref(0)
    const totalWrongStroke = ref(0)
    const totalCorrectStroke = computed(() => totalStroke.value - totalWrongStroke.value)
    const totalWord = ref(0)
    const elapsedTime = ref(0)

    const elapsedTimeText = computed(() => {
        const minutes = Math.floor(elapsedTime.value / 60)
        const seconds = elapsedTime.value % 60
        return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`
    })

    const wpm = computed(() => {
        if (elapsedTime.value === 0) return 0

        const minutes = elapsedTime.value / 60
        const wordsPerMinute = totalWord.value / minutes
        return Math.round(wordsPerMinute)
    })

    const accuracy = computed(() => {
        if (totalStroke.value === 0) return 0
        return Math.round((totalCorrectStroke.value / totalStroke.value) * 100)
    })

    function reset() {
        stop()
        totalStroke.value = 0
        totalWrongStroke.value = 0
        totalWord.value = 0
        elapsedTime.value = 0
    }

    function start() {
        timer.value = setInterval(() => {
            elapsedTime.value++
        }, 1000)
    }

    function onLetterStroke(letter: string, correct: boolean) {
        totalStroke.value++
        if (!correct) {
            totalWrongStroke.value++
        }
    }

    function onWordComplete() {
        totalWord.value++
    }

    function stop() {
        if (timer.value) {
            clearInterval(timer.value)
            timer.value = null
        }
    }

    watch(totalStroke, () => {
        if (totalStroke.value === 1) {
            start()
        }
    })

    return {
        totalStroke,
        totalWrongStroke,
        totalCorrectStroke,
        totalWord,
        elapsedTime,
        elapsedTimeText,
        wpm,
        accuracy,
        reset,
        start,
        onLetterStroke,
        onWordComplete,
        stop,
    }
})
