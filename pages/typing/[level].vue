<template>
  <div data-aos="fade-in" class="h-full text-center p-4">
    <UCard class="h-full bg-black/30 backdrop-blur" :ui="{ body: { base: 'h-full' } }">
      <div class="h-full flex flex-col">
        <div>
        </div>

        <main class="grow flex place-items-center place-content-center">
          <span v-for="letter, i in currentWord.english" class="font-['Roboto_Mono']"
            :class="{ 'text-teal-300': currentLetterIndex > i, 'text-red-400': isWrong && currentLetterIndex == i, 'text-gray-200': currentLetterIndex <= i, 'text-4xl': true }">{{
      letter
    }}</span>
          <UButton class="ml-2" icon="i-heroicons-speaker-wave"
            :color="typingStore.currentSpeech.isPlaying ? 'primary' : 'gray'" variant="ghost"
            @click="typingStore.currentSpeech.speak()" />
        </main>


        <div class="text-sm text-white">
          <p class="text-lg">{{ currentWord.indonesia }}</p>
          <p class="text-gray-200 mt-4">{{ currentWord.definisi }}</p>
          <p class="text-gray-200 ">Contoh: {{ currentWord.sentence }}</p>
        </div>

        <div class="flex justify-between p-4">
          <div class="min-w-16 grid place-content-center">
            <UButton class="px-4 h-fit" icon="i-heroicons-chevron-left" v-if="currentWordIndex != 0" variant="ghost"
              @click="currentWordIndex--">
              <div class="flex flex-col text-left">
                <p>{{ wordPairs[currentWordIndex - 1].english }}</p>
                <p class="text-xs">{{ wordPairs[currentWordIndex - 1].indonesia }}</p>
              </div>
            </UButton>
          </div>

          <UCard class="w-fit mx-auto bg-white/80 backdrop-blur">
            <div class="flex gap-8">
              <div>
                <p class="text-xs text-gray-400">Karakter</p>
                <p class="text-gray-600 font-bold font-mono ">{{ totalStroke }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">Waktu</p>
                <p class="text-gray-600 font-bold font-mono ">{{ elapsedTimeText }}</p>
              </div>
              <div>
                <p class=" text-xs text-gray-400">KPM</p>
                <p class="text-gray-800 font-bold font-mono text-xl">{{ wpm }}</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">Akurasi</p>
                <p class="text-gray-600 font-bold font-mono ">{{ accuracy }}%</p>
              </div>
              <div>
                <p class="text-xs text-gray-400">Kata</p>
                <p class="text-gray-600 font-bold font-mono ">{{ totalWord }} / {{ wordPairs.length }}</p>
              </div>
            </div>
          </UCard>

          <div class="min-w-16 grid place-content-center">
            <UButton class="px-4 h-fit" icon="i-heroicons-chevron-right" trailing
              v-if="currentWordIndex != wordPairs.length - 1" variant="ghost" @click="currentWordIndex++">
              <div class="flex flex-col text-right">
                <p>{{ wordPairs[currentWordIndex + 1].english }}</p>
                <p class="text-xs">{{ wordPairs[currentWordIndex + 1].indonesia }}</p>
              </div>
            </UButton>
          </div>
        </div>

        <TypingResultModal v-model:isCompleteOpen="isCompleteOpen" />
      </div>
    </UCard>


  </div>
</template>

<script lang="ts" setup>
import { useTypingStore } from '~/store/typingStore';
import { useWpmStore } from '~/store/wpmStore';
import JSConfetti from 'js-confetti'
import { playBeep, playDing, playKey } from '~/utils/sounds';


let jsConfetti: JSConfetti | null = null
const typingStore = useTypingStore()
const wpmStore = useWpmStore()

const route = useRoute()
const level = route.params.level as string

const isWrong = ref(false)
watch(isWrong, () => {
  if (isWrong.value) {
    setTimeout(() => {
      isWrong.value = false
    }, 200)
  }
})

const {
  wordPairs,
  currentLetterIndex,
  currentWordIndex,
  currentWord,
  currentLevel
} = storeToRefs(typingStore)

const {
  totalStroke,
  totalWrongStroke,
  totalCorrectStroke,
  totalWord,
  elapsedTime,
  elapsedTimeText,
  wpm,
  accuracy,
} = storeToRefs(wpmStore)

const isCompleteOpen = ref(false)

async function fetchWords() {
  await typingStore.fetchWords(level)
  wpmStore.reset()
}

watch(currentLevel, () => {
  fetchWords()
})

onMounted(async () => {
  jsConfetti = new JSConfetti()
  fetchWords()
})

onKeyStroke(true, (e) => {
  if (!currentWord.value || isCompleteOpen.value) return
  if (!e.key.match(/[a-zA-Z]/) && e.key !== "Backspace") return

  if (e.key === "Backspace") {
    currentLetterIndex.value = Math.max(0, currentLetterIndex.value - 1)
    return
  }

  const isCorrect = e.key === currentWord.value.english[currentLetterIndex.value]

  wpmStore.onLetterStroke(e.key, isCorrect)
  playKey()

  if (isCorrect) {
    currentLetterIndex.value++
  } else {
    isWrong.value = true
    playBeep()
  }

  // word complete
  if (currentLetterIndex.value === currentWord.value.english.length) {
    // level complete
    if (currentWordIndex.value === wordPairs.value.length - 1) {
      if (jsConfetti) jsConfetti.addConfetti()
      isCompleteOpen.value = true
      wpmStore.stop()
      setLevelStatus(parseInt(level) - 1, true)
    } else {
      currentWordIndex.value++
    }

    wpmStore.onWordComplete()
    playDing()
  }
}, { dedupe: true })

useHead({
  title: `Level ${level}`,
  meta: [
    {
      name: 'description',
      content: 'Latihan ketik kosakata bahasa Inggris.'
    }
  ]
})
</script>