<template>
  <div class="p-4">
    <h1 class="text-3xl font-bold mb-6">Créer un Nouvel Article</h1>

    <div class="max-w-md">
      <div class="flex flex-col gap-4">
        <div class="flex flex-col">
          <label for="title" class="mb-1">Titre</label>
          <InputText id="title" v-model="newPost.title" :disabled="isPending" placeholder="Entrez le titre" />
        </div>

        <div class="flex flex-col">
          <label for="body" class="mb-1">Body</label>
          <Textarea id="body" v-model="newPost.body" :disabled="isPending" rows="4" placeholder="Entrez le contenu" />
        </div>

        <div class="flex gap-2 items-center">
          <Button 
            label="Créer l'article"
            @click="mutate(newPost)" 
            :loading="isPending"
          />
        </div>
        <Tag v-if="isSuccess" severity="success" value="Article créé avec succès !" />
        <Tag v-if="isError" severity="danger" :value="'Erreur : ' + error.message" />
      </div>
    </div>

    <div v-if="data" class="mt-8 p-4 rounded border border-slate-200">
      <h2 class="text-xl font-bold mb-2">Réponse du serveur :</h2>
      <pre class="text-sm">{{ data }}</pre>
    </div>
  </div>
</template>

<script setup lang="js">
import { ref } from "vue";
import { useMutation, useQueryClient } from "@tanstack/vue-query";
import { PostsApi } from "@/server/apis/PostsApi.js";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";
import Button from "primevue/button";
import Tag from "primevue/tag";

const queryClient = useQueryClient();

const newPost = ref({
  title: "",
  body: "",
  userId: 1,
});

const { mutate, isPending, isError, isSuccess, data, error } = useMutation({
  mutationFn: (post) => PostsApi.create(post),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ["posts"] });
  },
});


queryClient.invalidateQueries({ queryKey: ["posts"], exact: true });




</script>



