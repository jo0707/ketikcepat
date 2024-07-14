<template>
  <div
    class="w-screen h-screen flex max-lg:flex-col-reverse bg-[url('/img/background.svg')] bg-cover bg-center place-content-center place-items-center overflow-hidden">
    <nav data-aos="fade-in" class="p-4">
      <UCard class="rounded-lg h-fit bg-white/50 backdrop-blur">
        <div class="flex lg:flex-col gap-2 sm:gap-4 md:gap-8">
          <UPopover v-for="nav, i in navigation" mode="hover" :popper="{ placement: 'top', strategy: 'absolute' }">
            <UButton class="" size="lg" variant="soft" :icon="nav.icon" :to="nav.to" />
            <template #panel>
              <p class="w-full text-sm text-nowrap p-2">{{ nav.text }}</p>
            </template>
          </UPopover>
        </div>
      </UCard>
    </nav>

    <div class="grow h-full">
      <header>

      </header>

      <main class="w-full h-full rounded p-2">
        <slot />
      </main>

      <footer>

      </footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
const navigation = ref([
  { icon: 'i-heroicons-home-solid', text: 'Halaman Utama', to: '/' },
  { icon: 'i-heroicons-rocket-launch-solid', text: 'Latihan', to: '/learn' },
  { icon: 'i-heroicons-play-solid', text: 'Main!', to: '/typing/1' },
  { icon: 'i-heroicons-bars-3', text: 'Pilih Level', to: '/select' },
  { icon: 'i-heroicons-globe-alt-solid', text: 'Informasi', to: '/info' },
  { icon: 'i-heroicons-language', text: 'Kamus', to: '/dictionary' },
])
</script>