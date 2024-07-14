<template>
  <div class="whitespace-pre-wrap break-words">
    <span>{{ displayedText }}</span><span class="inline-block w-[2px] animate-pulse">|</span>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  text: {
    type: String,
    required: true,
  },
  delayPerCharacter: {
    type: Number,
    required: true,
  },
});

const displayedText = ref('');
const currentIndex = ref(0);

const typeText = () => {
  if (currentIndex.value < props.text.length) {
    displayedText.value += props.text.charAt(currentIndex.value);
    currentIndex.value++;
    setTimeout(typeText, props.delayPerCharacter);
  }
};

onMounted(typeText);
</script>

<style scoped>
@keyframes blink {

  0%,
  50% {
    opacity: 1;
  }

  51%,
  100% {
    opacity: 0;
  }
}
</style>