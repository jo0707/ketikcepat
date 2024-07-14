<template>
  <div class="w-full flex flex-col gap-2">
    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide class="h-56 w-full rounded overflow-hidden bg-white/90" v-for="vid, i in videos">
        <div class="w-full grid grid-rows-2">
          <iframe :src="vid.embed" alt="background" class="w-full object-cover" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div class="w-full p-4 text-gray-700 text-left flex flex-col gap-4">
            <UButton :padded="false" size="sm" :label="vid.title" variant="link" :to="vid.url"
              class="line-clamp-3 text-ellipsis" />
            <UButton :padded="false" :to="vid.url" variant="link" color="red" class="text-xs"
              icon="i-heroicons-user-circle-solid">{{
              vid.author
              }}</UButton>
          </div>
        </div>
      </Slide>
    </Carousel>

    <Carousel id="thumbnails" :items-to-show="2.5" :wrap-around="true" v-model="currentSlide" ref="carousel">
      <Slide class="w-full  h-32 px-1" v-for="vid, i in videos" @click="slideTo(i - 1)">
        <div class="w-full rounded overflow-hidden grid grid-rows-2 bg-white/90 ">
          <iframe :src="vid.embed" alt="background" class="w-full object-cover" title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          <div class="w-full p-4 text-gray-700 text-left flex flex-col gap-4">
            <UButton :padded="false" size="sm" :label="vid.title" variant="link" :to="vid.url"
              class="line-clamp-3 text-ellipsis" />
            <UButton :padded="false" :to="vid.url" variant="link" color="red" class="text-xs"
              icon="i-heroicons-user-circle-solid">{{
              vid.author
              }}</UButton>
          </div>
        </div>
      </Slide>

      <template #addons>
        <Navigation />
      </template>
    </Carousel>
  </div>
</template>

<script setup lang="ts">
import 'vue3-carousel/dist/carousel.css'
import { videos } from '~/data/videos';


const currentSlide = ref(0)

function slideTo(val: number) {
  console.log("slideTTO")
  currentSlide.value = val
}
</script>