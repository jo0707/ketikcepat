<template>
  <div data-aos="fade-in" class="h-full text-center p-4">
    <UCard class="h-full bg-black/30 backdrop-blur" :ui="{ body: { base: 'h-full' } }">
      <div class="h-full flex flex-col">
        <div>
        </div>

        <main class="grow flex gap-2 place-items-center place-content-center">
          <span v-for="letter, i in currentWord.english"
            :class="{ 'text-teal-300': currentLetterIndex > i, 'text-gray-200': currentLetterIndex <= i, 'bg-white/50 rounded w-4 h-4': letter == ' ' && currentLetterIndex <= i, 'bg-teal-400 rounded w-4 h-4': letter == ' ' && currentLetterIndex > i, 'font-mono text-4xl': true }">{{
      letter
    }}</span>
        </main>


        <div class="text-white max-w-4xl mx-auto">
          <p class="text-gray-200 mt-4">{{ currentWord.definisi }}</p>
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

          <UCard class="w-fit mx-auto bg-white/30 backdrop-blur">
            <div class="flex flex-col gap-2 text-gray-100">
              <div>
                <p class="text-xs ">Tahap</p>
                <p class=" font-bold font-mono ">{{ currentWordIndex + 1 }} / {{ wordPairs.length }}</p>
              </div>

              <Keyboard class="max-sm:hidden" />
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
      </div>
    </UCard>

    <UModal v-model="isCompleteOpen">
      <UCard class=" bg-gradient-to-br from-teal-300 to-teal-500 backdrop-blur text-center text-sm">
        <div class="flex flex-col gap-2">
          <h1 class="text-xl mb-4">Selamat!</h1>
          <p>Kamu berhasil menyelesaikan tutorial ini. Sekarang, secepat manakah kamu dapat mengetik?</p>
        </div>
      </UCard>
    </UModal>

    <div class="hidden bg-gray-500/50"></div>
  </div>
</template>

<script lang="ts" setup>
import { useTypingStore } from '~/store/typingStore';
import { useWpmStore } from '~/store/wpmStore';
import type { Word } from '~/types/word';
import JSConfetti from 'js-confetti'

const SAVED_STEP = "saved_step"

let jsConfetti: JSConfetti | null = null
const typingStore = useTypingStore()
const wpmStore = useWpmStore()

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

watch(currentWordIndex, () => {
  console.log("currentWordIndex", currentWordIndex.value)
  localStorage.setItem(SAVED_STEP, currentWordIndex.value.toString())
})

const isCompleteOpen = ref(false)

onMounted(async () => {
  jsConfetti = new JSConfetti()
  await typingStore.fetchWords("learn")
  wpmStore.reset()

  const savedStep = parseInt(localStorage.getItem(SAVED_STEP) ?? "0")
  if (savedStep != 0) {
    currentWordIndex.value = savedStep
    useToast().add({
      title: "Berhasil memuat riwayat!",
      description: `Latihan dimulai dari tahap ${currentWordIndex.value}`,
      color: "teal",
    })
  }
})

onKeyStroke(true, (e) => {
  if (!currentWord.value) return

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
    if (currentWordIndex.value === wordPairs.value.length - 1) {
      if (jsConfetti) jsConfetti.addConfetti()
      isCompleteOpen.value = true
      wpmStore.stop()
    } else {
      currentWordIndex.value++
    }
    wpmStore.onWordComplete()
    playDing()
  }
}, { dedupe: true })

useHead({
  title: "Latihan",
  meta: [
    {
      name: "description",
      content: "Berlatih mengetik 10 jari dengan tepat",
    },
  ],
})
</script>