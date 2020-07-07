<template>
  <div class="card has-text-left">
    <div class="card-content">
      <h2 class="title">{{ post.title }}</h2>
      <div class="content">{{ post.description }}</div>
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <span>{{ formattedDate }}</span>
          </div>
        </div>
        <div v-if="user" class="level-right">
          <div v-if="!isUserPost" class="level-item">
            <b-button
              icon-left="glass-mug-variant"
              @click="addClap"
            >
              {{ post.claps }}
            </b-button>
          </div>
          <div v-if="isUserPost" class="level-item">
            <b-button
              class="mr-2"
              icon-left="comment-edit"
              @click="pushOnEditingPost"
            >
              Изменить
            </b-button>
            <b-button
              icon-left="delete"
              @click="deletePost(post.id)"
            >
              Удалить
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Mutation, Action } from 'vuex-class';
import { Component, Prop } from 'vue-property-decorator';
import { Post, User } from '../store/types';
import { formatDates } from '../helpers';

@Component({
  name: 'PostsCard',
})
export default class extends Vue {
  @Prop() post!: Post

  @State user!: User | null

  @Action deletePost!: (id: number) => Promise<void>

  @Action editPost!: (data: {
      id: number;
      changedData: { claps: number };
    }) => Promise<void>

  @Mutation updatePosts!: (changedPost: Post) => void

  get formattedDate(): string {
    return formatDates(Date.parse(this.post.createdAt), 'DD.MM.YYYY hh:mm');
  }

  get isUserPost(): boolean {
    return this.post.userId === this.user?.id;
  }

  addClap() {
    this.editPost({ id: this.post.id, changedData: { claps: this.post.claps += 1 } });
  }

  pushOnEditingPost() {
    this.$router.push({ name: 'EditPost', params: { id: String(this.post.id) } });
  }
}
</script>
