<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Pagination</h1>

    <div class="mb-4 flex items-center gap-4">
      <Button
        @click="page--" 
        :disabled="page === 1 || isPlaceholderData" 
        label="Précédent"
      />
      <span class="font-bold">Page {{ page }}</span>
      <Button
        iconPos="right"
        @click="page++" 
        :disabled="isPlaceholderData || !data?.length" 
        label="Suivant"
      />
      <ProgressSpinner v-if="isFetching" style="width: 20px; height: 20px" strokeWidth="8" />
    </div>

    <div v-if="isPending">
      <Skeleton v-for="i in 10" :key="i" height="4rem" class="mb-2" />
    </div>
    <div v-else-if="isError">
      <Message severity="error">Erreur : {{ error.message }}</Message>
    </div>
    <div v-else>
      <div :class="{ 'opacity-50 transition-opacity': isPlaceholderData }">
        <DataTable :value="data">
          <Column field="id" header="ID" style="width: 10%"></Column>
          <Column field="title" header="Titre" style="width: 30%"></Column>
          <Column field="body" header="Contenu" style="width: 60%"></Column>
        </DataTable>
      </div>
    </div>
    
    <div class="mt-4 text-sm text-slate-500">
      <p v-if="isPlaceholderData">Chargement de la page suivante en arrière-plan...</p>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from "vue";
import { useQuery, keepPreviousData } from "@tanstack/vue-query";
import { PostsApi } from "@/server/apis/PostsApi.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Message from "primevue/message";
import ProgressSpinner from "primevue/progressspinner";

const page = ref(1);
const limit = 10;

const { 
  data, 
  isPending, 
  isError, 
  error, 
  isFetching, 
  isPlaceholderData 
} = useQuery({
  queryKey: ["posts", "paginated", page],
  queryFn: () => new Promise((resolve, reject) => {
    setTimeout(() => {
      PostsApi.listPaginated(page.value, limit)
        .then(resolve)
        .catch(reject);
    }, 1000);
  }),
  placeholderData: keepPreviousData,
});
</script>
