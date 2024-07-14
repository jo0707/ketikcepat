<template>
  <UModal v-model="isCompleteOpen">
    <UCard class=" bg-gradient-to-br from-green-300 to-teal-500 backdrop-blur text-center text-sm">
      <div class="flex flex-col gap-2">
        <h1 class="text-xl mb-4">Kamu Berhasil!</h1>

        <div class="flex gap-8 text-center place-content-center place-items-center">
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" class="flex flex-col items-center">
            <span>Waktu</span>
            <UIcon name="i-heroicons-clock-solid" class="text-4xl bg-gradient-to-b from-violet-400 to-violet-600" />
            <span>{{ elapsedTimeText }}</span>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="0"
            class="flex flex-col items-center text-lg">
            <span>Kata Per Menit</span>
            <UIcon name="i-heroicons-bolt-solid" class="text-5xl bg-gradient-to-b from-yellow-400 to-orange-500" />
            <span class="font-semibold">{{ wpm }}</span>
          </div>
          <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" class="flex flex-col items-center">
            <span>Akurasi</span>
            <UIcon name="i-heroicons-receipt-percent-solid" class="text-4xl from-violet-400 to-violet-600" />
            <span>{{ accuracy }} %</span>
          </div>
        </div>

        <p class="mt-4">Selamat! kamu karena telah menyelesaikan level ini</p>
        <UButton :label="`Lanjut ke level ${currentLevel + 1}`"
          :to="`/typing/${currentLevel + 1}`" icon="i-heroicons-chevron-right" trailing color="white"
          size="sm" class="mx-auto max-w-lg" />
      </div>
    </UCard>
  </UModal>
</template>

<script lang="ts" setup>
import { useTypingStore } from '~/store/typingStore';
import { useWpmStore } from '~/store/wpmStore';

const wpmStore = useWpmStore();
const typingStore = useTypingStore();
const isCompleteOpen = defineModel('isCompleteOpen', { type: Boolean, default: false });

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

const {
  currentLevel
} = storeToRefs(typingStore)
</script>

<style></style>