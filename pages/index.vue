<template>
  <div data-aos="fade-left" class="h-full bg-cover overflow-hidden grid place-content-center">
    <UCard class="bg-black/20 backdrop-blur py-4">
      <div class="flex flex-col justify-center items-center h-fit mx-auto text-center max-w-3xl">
        <div class="relative">
          <NuxtImg src="/img/icon.png"
            class="w-12 h-12 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 -rotate-6" />
          <h1 class="text-3xl lg:text-6xl text-white font-bold">Ketik Cepat!</h1>
        </div>
        <TypingText class="text-white mt-4"
          text="Sebuah platform untuk belajar mengetik cepat sekaligus mengasah kemampuan kosakata bahasa Inggris dan Indonesia!"
          :delayPerCharacter="50">
        </TypingText>
        <div class="flex space-x-4 mt-8">
          <UButton to="/learn" color="white" class="px-4 py-2 rounded-lg">Latihan</UButton>
          <UButton to="/select" color="white" class="px-4 py-2 rounded-lg">Mulai!</UButton>
        </div>
        <div class="h-0 opacity-0">
          Sebuah platform untuk belajar mengetik cepat sekaligus mengasah kemampuan kosakata bahasa Inggris dan
          Indonesia!
        </div>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>

</script>