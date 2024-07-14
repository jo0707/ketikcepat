<template>
  <div data-aos="fade-in" class="h-full w-full p-4 text-white">
    <UCard class="h-full bg-black/20 backdrop-blur-sm">
      <div class="flex flex-col place-content-center place-items-center">
        <div class="flex gap-2">
          <UInput class="w-96" placeholder="Cari Kata..." icon="i-heroicons-magnifying-glass" v-model="keyword" />
          <UButton label="Cari!" @click="search" />
        </div>

        <div class="flex gap-4 place-content-center place-items-center">
          <h4>Cari kata dalam bahasa :</h4>
          <URadioGroup v-model="selectedLanguage" :options="languageOptions" class="mt-2 text-gray-200" />
        </div>

        <div class="h-full flex flex-col max-w-2xl my-8 text-white">
          <Transition mode="in-out" appear>
            <div v-if="isLoading" class="max-w-lg">
              <p>Memuat data terjemahan offline, mohon tunggu...</p>
              <UProgress />
            </div>
            <div v-else-if="searchResult === undefined" class="flex flex-col gap-2">
              <p class="text-sm">Maaf, kami tidak dapat menemukan kata yang kamu cari...</p>
            </div>
            <div v-else-if="searchResult == ''" class="flex flex-col gap-2">
              <h2 class="text-2xl font-bold">Kamus</h2>
              <p class="text-sm">Ketik kata yang ingin dicari, lalu pilih bahasa yang ingin dicari.</p>
            </div>
            <div v-else>
              <h2 class="text-2xl font-bold">{{ recentKeyword }}</h2>
              <p class="mt-4">{{ searchResult }}</p>
            </div>
          </Transition>
        </div>
      </div>
    </UCard>
  </div>
</template>

<script lang="ts" setup>
const isLoading = ref<boolean>(true)
const keyword = ref<string>('')
const selectedLanguage = ref<string>('id')
const searchResult = ref<string | undefined>("")
let recentKeyword = ref<string>('')

const languageOptions = [
  { label: 'Indonesia', value: 'id' },
  { label: 'Inggris', value: 'en' }

]

function search() {
  if (selectedLanguage.value === 'id') {
    searchResult.value = searchIdEn(keyword.value.toLowerCase())
  } else {
    searchResult.value = searchEnId(keyword.value.toLowerCase())
  }
  recentKeyword.value = keyword.value
}

onMounted(async () => {
  await initTranslation()
  isLoading.value = false
})

useHead({
  title: 'Kamus',
  meta: [
    {
      name: 'description',
      content: 'Cari terjemaahan kata dari bahasa Indonesia ke bahasa Inggris dan sebaliknya.'
    }
  ]
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>