<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Mise à jour Optimiste (Optimistic Update)</h1>

    <div class="max-w-md p-6 rounded-lg shadow-md mb-4 bg-gray-800">
      <h2 class="text-xl font-bold mb-4">Modifier le titre de l'article #1</h2>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="title" class="font-semibold">Nouveau Titre</label>
          <InputText id="title" v-model="newTitle" placeholder="Entrez le nouveau titre" />
        </div>

        <div class="flex items-center gap-2">
          <ToggleSwitch v-model="shouldFail" inputId="shouldFail" />
          <label for="shouldFail">Simuler une erreur serveur</label>
        </div>

        <div class="flex gap-2 items-center">
          <Button 
            label="Mettre à jour"
            @click="mutate(newTitle)" 
            :loading="isPending"
          />
        </div>
        <small class="text-slate-500">Note: Le serveur jsonplaceholder ne sauvegarde pas réellement.</small>
      </div>
    </div>

    <div class="max-w-md p-6 rounded-lg shadow-md bg-gray-800">
      <h2 class="text-xl font-bold mb-4">Visualisation de la donnée (Query: ['posts', 1])</h2>
      
      <div v-if="isQueryPending">
        <Skeleton width="100%" height="2rem" class="mb-2"></Skeleton>
        <Skeleton width="80%" height="1.5rem"></Skeleton>
      </div>
      <div v-else-if="isQueryError">
        <Message severity="error">Erreur lors du chargement de l'article.</Message>
      </div>
      <div v-else>
        <div class="p-3 rounded">
          <p class="font-bold text-lg text-blue-700">{{ post?.title }}</p>
          <p class="text-slate-600 mt-2">{{ post?.body }}</p>
        </div>
        <p class="text-xs text-slate-400 mt-4">ID: {{ post?.id }}</p>
      </div>
    </div>

    <div v-if="isError" class="mt-4">
       <Message severity="error">La mutation a échoué, l'état a été restauré : {{ error.message }}</Message>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from "vue";
import { useQuery, useMutation, useQueryClient } from "@tanstack/vue-query";
import { PostsApi } from "@/server/apis/PostsApi.js";
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import Skeleton from "primevue/skeleton";
import Message from "primevue/message";
import ToggleSwitch from "primevue/toggleswitch";

const queryClient = useQueryClient();
const newTitle = ref("");
const shouldFail = ref(false);

const { data: post, isPending: isQueryPending, isError: isQueryError } = useQuery({
  queryKey: ["posts", 1],
  queryFn: () => PostsApi.get(1),
});

const { mutate, isPending, isError, error } = useMutation({
  mutationFn: (title) => {
    // On simule un délai pour bien voir l'effet optimiste
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (shouldFail.value) {
              reject(new Error('Erreur simulée pour le test'));
              return;
            }
            PostsApi.update(1, { title })
            .then(resolve)
            .catch(reject);
        }, 2000);
    });
  },
  onMutate: async (newTitleValue) => {
    // Annuler les refetchs en cours pour ne pas écraser notre mise à jour
    await queryClient.cancelQueries({ queryKey: ["posts", 1] });

    // Snapshot de la valeur précédente
    const previousPost = queryClient.getQueryData(["posts", 1]);

    // Mise à jour optimiste du cache
    queryClient.setQueryData(["posts", 1], (old) => ({
      ...old,
      title: newTitleValue,
    }));

    // Retourner le snapshot pour le rollback en cas d'erreur
    return { previousPost };
  },
  // En cas d'erreur, on restaure la valeur précédente
  onError: (err, newTitleValue, context) => {
    queryClient.setQueryData(["posts", 1], context.previousPost);
  },
});
</script>
