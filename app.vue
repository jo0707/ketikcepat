<template>
  <div class="font-[Poppins] antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UModal v-model="isMobileWarningOpen">
      <UCard>
        <h2 class="text-lg">Perhatian</h2>
        <p class="text-sm">Website ini tidak mendukung tampilan mobile. Silakan gunakan perangkat dengan layar lebih
          lebar.</p>
      </UCard>
    </UModal>

    <UNotifications />
  </div>
</template>

<script lang="ts" setup>
const isMobileWarningOpen = ref(false)

onMounted(() => {
  if (window.innerWidth < 768) {
    isMobileWarningOpen.value = true
  }
})

useHead({
  meta: [
    {
      name: 'dicoding:email',
      content: 'josua123690707@gmail.com'
    }
  ]
})
</script>

<style>
/* create custom rounded thin scrollbar */
::-webkit-scrollbar {
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  background: #99999999;
  border-radius: 6px;
}

::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.2);
  border-radius: 6px;
}
</style>