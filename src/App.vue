<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import Menubar from 'primevue/menubar';
import { ref } from 'vue';
import { VueQueryDevtools } from '@tanstack/vue-query-devtools'

const items = ref([
    {
        label: 'Use Query',
        route: '/'
    },
    {
        label: 'Use Mutation',
        route: '/use-mutation'
    },
    {
        label: 'Optimistic Update',
        route: '/optimistic-update'
    },
    {
        label: 'Pagination',
        route: '/pagination'
    },
    {
        label: 'Infinite Scroll',
        route: '/infinite-scroll'
    }
]);
</script>

<template>
  <header>
    <Menubar :model="items">
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a :href="href" v-bind="props.action" @click="navigate">
                    <span :class="item.icon" />
                    <span>{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else :href="item.url" :target="item.target" v-bind="props.action">
                <span :class="item.icon" />
                <span>{{ item.label }}</span>
            </a>
        </template>
    </Menubar>
  </header>

  <RouterView />
  <VueQueryDevtools />
</template>

<style scoped>
header {
  margin-bottom: 2rem;
}
</style>