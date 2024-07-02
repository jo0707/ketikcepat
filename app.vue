<template>
  <div class="font-[Poppins] antialiased">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <UNotifications />
  </div>
</template>

<script lang="ts" setup>
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