<template>
    <div data-aos="fade-in" class="h-full prose-sm overflow-y-auto text-white">
        <UCard class="m-4 backdrop-blur bg-black/30">
            <NuxtImg class="rounded-lg h-48 w-96 object-cover" :src="`/img/${slug}.png`" alt="background" />
            <div class="flex flex-col">
                <span>Penulis: {{ article.author }}</span>
                <span>{{ article.createdAt }}</span>
            </div>
            <MDC class="mt-4" :value="content" />
        </UCard>
    </div>
</template>

<script lang="ts" setup>
import { articles } from '~/data/articles';

const route = useRoute()
const slug = route.params.slug as string

const { data: content, error } = useFetch<string>("/md/" + slug + ".md", { server: false })
const article = articles.filter((a) => a.mdfile == slug)[0]

useHead({
    title: article.title,
    meta: [
        { name: 'description', content: article.description },
        { name: 'author', content: article.author },
        { name: 'keywords', content: article.title },
    ]
})
</script>