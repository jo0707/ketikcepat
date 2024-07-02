<template>
  <div data-aos="fade-left" class="h-full text-center p-4">
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
              @click="currentWordIndex--; totalWord++">
              <div class="flex flex-col text-left">
                <p>{{ wordPairs[currentWordIndex - 1].english }}</p>
                <p class="text-xs">{{ wordPairs[currentWordIndex - 1].indonesia }}</p>
              </div>
            </UButton>
          </div>

          <UCard class="w-fit mx-auto bg-white/75 backdrop-blur">
            <div class="flex flex-col gap-2">
              <div>
                <p class="text-xs text-gray-500">Tahap</p>
                <p class="text-gray-600 font-bold font-mono ">{{ totalWord }} / {{ wordPairs.length }}</p>
              </div>

              <Keyboard />
            </div>
          </UCard>

          <div class="min-w-16 grid place-content-center">
            <UButton class="px-4 h-fit" icon="i-heroicons-chevron-right" trailing
              v-if="currentWordIndex != wordPairs.length - 1" variant="ghost" @click="currentWordIndex++; totalWord--">
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
      <div class="flex flex-col gap-4">
        <h1 class="text-2xl font-bold">Selesai</h1>
      </div>
    </UModal>

    <div class="hidden bg-gray-500/50"></div>
  </div>
</template>

<script lang="ts" setup>
import { useTypingStore } from '~/store/typingStore';
import { useWpmStore } from '~/store/wpmStore';
import type { Word } from '~/types/word';

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

const isCompleteOpen = ref(false)

onMounted(async () => {
  await typingStore.fetchWords("learn")
  wpmStore.reset()
})

onKeyStroke(true, (e) => {
  if (!currentWord.value) return

  if (e.key === "Backspace") {
    currentLetterIndex.value = Math.max(0, currentLetterIndex.value - 1)
    return
  }

  const isCorrect = e.key === currentWord.value.english[currentLetterIndex.value]

  wpmStore.onLetterStroke(e.key, isCorrect)

  if (isCorrect) {
    currentLetterIndex.value++
  } else {
    isWrong.value = true
  }

  // word complete
  if (currentLetterIndex.value === currentWord.value.english.length) {
    if (currentWordIndex.value === wordPairs.value.length - 1) {
      isCompleteOpen.value = true
      wpmStore.stop()
    } else {
      currentWordIndex.value++
    }
    wpmStore.onWordComplete()
  }
}, { dedupe: true })
</script>