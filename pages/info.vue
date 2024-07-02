<template>
  <div class="w-full h-full bg-[url('/img/background_3.svg')] bg-cover bg-right p-4 text-white">
    <UCard class="bg-black/20 backdrop-blur-sm w-full h-full">
      <h2>Informasi Ketik</h2>
      <p>Informasi tentang ketik</p>

      <h3>Cek Artikel kami!</h3>
      <section class="flex gap-4 max-w-5xl overflow-x-auto rounded-lg">
        <UCard v-for="ar, i in articles" class="w-56 min-w-56 overflow-hidden text-gray-950"
          :ui="{ header: { padding: 'p-0 sm:p-0 overflow-hidden' }, body: { padding: 'p-2 sm:p-2 overflow-hidden' } }">
          <template #header>
            <NuxtImg class="w-full h-20 object-cover" :src="`/img/${ar.mdfile}.png`" :alt="ar.mdfile" />
          </template>
          <div class="flex flex-col h-full place-content-between">
            <UButton :to="`/article/${ar.mdfile}`" variant="link"
              class="text-sm line-clamp-1 text-ellipsis text-black text-nowrap">{{
          ar.title
        }}
            </UButton>
            <UButton :to="`/article/${ar.mdfile}`" variant="link" color="red" class="text-xs"
              icon="i-heroicons-user-circle-solid">{{
          ar.author
        }}</UButton>
          </div>
        </UCard>
      </section>

      <h3 class="mt-4">Cek Video kami!</h3>
      <section class="flex gap-4 max-w-5xl overflow-x-auto rounded-lg">
        <UCard v-for="video in videos" class="w-56 min-w-56 overflow-hidden text-gray-950"
          :ui="{ header: { padding: 'p-0 sm:p-0 overflow-hidden' }, body: { padding: 'p-2 sm:p-2 overflow-hidden' } }">
          <template #header>
            <iframe :src="video.embed" alt="background" class="w-full h-20 object-cover" title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
          </template>
          <div class="flex flex-col h-full place-content-between">
            <UButton target="_blank" :to="video.url" variant="link"
              class="text-sm line-clamp-1 text-ellipsis text-black text-nowrap">{{
          video.title
        }}
            </UButton>
            <UButton target="_blank" :to="video.url" variant="link" color="red" class="text-xs"
              icon="i-heroicons-user-circle-solid">{{
              video.author
              }}</UButton>
          </div>
        </UCard>
      </section>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
import { articles } from '~/data/articles';
import { videos } from '~/data/videos';


</script>
