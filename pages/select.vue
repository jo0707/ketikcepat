<template>
  <div data-aos="fade-in" class="h-full p-4 text-center">
    <UCard class="h-full bg-black/20 backdrop-blur-sm">
      <h2 class="text-white text-2xl font-bold">Pilih Tingkatan</h2>
      <ul class="mt-4 flex flex-col gap-8 place-content-center place-items-center">
        <li v-for="level in levels">
          <h3 class="text-white font-bold">{{ level.difficulty }}</h3>
          <p class="text-white text-sm">{{ level.description }}</p>
          <ul class="flex flex-wrap gap-2 mt-2 place-content-center place-items-center">
            <li class="w-24" v-for="levelId in level.levelIds" :key="levelId">
              <UButton block variant="soft" :to="`/typing/${levelId}`" :label="`Level ${levelId}`"
                :icon="levelStatuses[levelId - 1] ? 'i-heroicons-star-solid' : ''" trailing ></UButton>
            </li>
          </ul>
        </li>
      </ul>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const levelStatuses = getLevelStatus()

const levels = [
  {
    difficulty: 'Mudah',
    description: 'Kosakata yang sering digunakan dalam percakapan sehari-hari',
    levelIds: [1, 2, 3, 4, 5]
  },
  {
    difficulty: 'Sedang',
    description: 'Kosakata yang lebih kompleks tetapi masih cukup familiar',
    levelIds: [6, 7, 8, 9, 10]
  },
  {
    difficulty: 'Sulit',
    description: 'Kosakata yang jarang digunakan dan memiliki makna yang lebih spesifik.',
    levelIds: [11, 12, 13, 14, 15]
  },
  {
    difficulty: 'Sangat Sulit',
    description: 'Kosakata yang sangat jarang digunakan dan memerlukan pemahaman mendalam.',
    levelIds: [16, 17, 18, 19, 20]
  }
]

useHead({
  title: 'Pilih Tingkatan',
  meta: [
    {
      name: 'description',
      content: 'Pilih tingkatan latihan ketik yang menantang kemampuanmu.'
    }
  ]
})
</script>