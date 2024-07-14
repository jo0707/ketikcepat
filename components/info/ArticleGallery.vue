<template>
  <div class="w-full flex flex-col gap-2">
    <Carousel id="gallery" :items-to-show="1" :wrap-around="false" v-model="currentSlide">
      <Slide class="h-56 w-full rounded overflow-hidden bg-white/90" v-for="ar, i in articles">
        <div class="w-full grid grid-rows-2">
          <NuxtImg class="w-full object-cover" :src="`/img/${ar.mdfile}.png`" />
          <div class="w-full p-4 text-gray-700 text-left flex flex-col gap-4">
            <UButton :padded="false" size="sm" :label="ar.title" variant="link" :to="`/article/${ar.mdfile}`"
              class="line-clamp-3 text-ellipsis" />
            <UButton :padded="false" :to="`/article/${ar.mdfile}`" variant="link" color="red" class="text-xs"
              icon="i-heroicons-user-circle-solid">{{
      ar.author
    }}</UButton>
          </div>
        </div>
      </Slide>
    </Carousel>

    <Carousel id="thumbnails" :items-to-show="2.5" :wrap-around="true" v-model="currentSlide" ref="carousel">
      <Slide class="w-full h-32 px-1" v-for="ar, i in articles" @click="slideTo(i - 1)">
        <div class="w-full rounded overflow-hidden grid grid-rows-2 bg-white/90 ">
          <NuxtImg class="w-full  object-cover" :src="`/img/${ar.mdfile}.png`" />
          <div class="w-full  p-2 text-gray-700 text-left flex flex-col gap-2">
            <UButton :padded="false" size="xs" :label="ar.title" variant="link" :to="`/article/${ar.mdfile}`"
              class="line-clamp-1 text-ellipsis" />
            <UButton :padded="false" size="xs" :to="`/article/${ar.mdfile}`" variant="link" color="red" class="text-xs"
              icon="i-heroicons-user-circle-solid">{{
      ar.author
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
import { articles } from '~/data/articles';

const currentSlide = ref(0)

function slideTo(val: number) {
  console.log("slideTTO")
  currentSlide.value = val
}
</script>