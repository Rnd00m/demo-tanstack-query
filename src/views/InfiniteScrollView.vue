<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Infinite Scroll (Infinite Queries)</h1>

    <div v-if="isPending">
      <Skeleton v-for="i in 5" :key="i" height="4rem" class="mb-2" />
    </div>
    
    <div v-else-if="isError">
      <Message severity="error">Erreur : {{ error.message }}</Message>
    </div>

    <div v-else>
      <div class="flex flex-col gap-4">
        <template v-for="(page, index) in data.pages" :key="index">
          <div v-for="post in page" :key="post.id" class="p-4 bg-gray-800 rounded-lg shadow border">
            <h3 class="font-bold text-lg">{{ post.id }}. {{ post.title }}</h3>
            <p class="text-slate-500">{{ post.body }}</p>
          </div>
        </template>
      </div>

      <div class="mt-8 flex justify-center pb-10">
        <Button 
          v-if="hasNextPage"
          @click="fetchNextPage()" 
          :loading="isFetchingNextPage"
          label="Charger plus d'articles"
          class="p-button-outlined"
        />
        <p v-else class="text-slate-500 italic">Plus d'articles à charger.</p>
      </div>

      <div v-if="isFetching && !isFetchingNextPage" class="fixed bottom-4 right-4">
        <ProgressSpinner style="width: 40px; height: 40px" strokeWidth="4" />
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
import { useInfiniteQuery } from "@tanstack/vue-query";
import { PostsApi } from "@/server/apis/PostsApi.js";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";

const {
  data,
  fetchNextPage,
  hasNextPage,
  isFetching,
  isFetchingNextPage,
  isPending,
  isError,
  error,
} = useInfiniteQuery({
  queryKey: ["posts", "infinite"],
  queryFn: ({ pageParam }) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        PostsApi.listPaginated(pageParam, 10)
          .then(resolve)
          .catch(reject);
      }, 1500);
    });
  },
  initialPageParam: 1,
  getNextPageParam: (lastPage, allPages, lastPageParam) => {
    if (lastPage.length < 10) {
      return undefined;
    }
    return lastPageParam + 1;
  },
  maxPages: 3
});
</script>
