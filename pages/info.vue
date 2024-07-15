<template>
  <div data-aos="fade-in" class="w-full h-full bg-[url('/img/background_3.svg')] bg-cover bg-right p-4 text-white">
    <UCard class="bg-black/20 backdrop-blur-sm w-full h-full overflow-y-scroll">
      <h2 class="text-lg font-bold">Belajar dari Artikel & Video</h2>
      <p class="text-sm">Perluas wawasan mengenai latihan ketik, IT, dan bahasa Inggris yuk!</p>

      <div class="flex gap-8 flex-col max-w-lg">
        <div>
          <h3 class="text-lg">Artikel</h3>
          <InfoArticleGallery />
        </div>
        <div>
          <h3 class="text-lg">Video</h3>
          <InfoVideoGallery />
        </div>
      </div>

    </UCard>
  </div>
</template>

<script lang="ts" setup>
import 'vue3-carousel/dist/carousel.css'

import { articles } from '~/data/articles';
import { videos } from '~/data/videos';

useHead({
  title: 'Informasi',
  meta: [
    {
      name: 'description',
      content: 'Belajar dari artikel dan video.'
    }
  ]
});
</script>
