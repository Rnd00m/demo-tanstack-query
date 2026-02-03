<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Liste des Articles <Button @click="refetch">Refetch</Button></h1>

    <Tag severity="info" v-if="isPending">Chargement initial...</Tag>
    <Tag severity="info" v-if="isFetching">En cour de fetch...</Tag>
    <Tag severity="danger" v-else-if="isError">Erreur : {{ error.message }}</Tag>
    <div v-else>
      <DataTable :value="data">
        <Column field="id" header="ID"></Column>
        <Column field="title" header="Titre"></Column>
        <Column field="body" header="Contenu"></Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup lang="js">
import { useQuery } from "@tanstack/vue-query";
import { PostsApi } from "@/server/apis/PostsApi.js";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Tag from "primevue/tag";

const { isPending, isFetching, isError, data, error, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: PostsApi.list,
})
</script>



