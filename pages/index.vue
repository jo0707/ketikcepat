<template>
  <div data-aos="fade-in" class="h-full bg-cover">
    <div class="flex flex-col justify-center items-center h-full">
      <div class="relative">
        <NuxtImg src="/img/icon.png"
          class="w-12 h-12 absolute top-0 left-0 -translate-x-1/2 -translate-y-1/2 -rotate-6" />
        <h1 class="text-6xl text-white font-bold">ketik cepat!</h1>
      </div>
      <h2 class="text-white mt-4">Sebuah platform digital untuk melatih keterampilan bahasa Inggris dan mengetik kamu!
      </h2>
      <div class="flex space-x-4 mt-8">
        <UButton to="/learn" class="bg-white text-black px-4 py-2 rounded-lg">Berlatih</UButton>
        <UButton to="/select" class="bg-white text-black px-4 py-2 rounded-lg">Mulai</UButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>