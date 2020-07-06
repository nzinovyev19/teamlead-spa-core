<template>
  <div v-if="posts && posts.length">
    <div
      v-for="(post, index) in paginatedPosts"
      :key="post.id"
      :class="{ 'mt-4': index }"
    >
      <PostsCard :post="post" />
    </div>
    <div class="mt-4">
      <b-button
        class="mr-4 button is-primary"
        :disabled="pageNumber === 0"
        @click="prevPage"
      >
        Previous
      </b-button>
      <b-button
        class="button is-primary"
        :disabled="pageNumber >= pageCount -1"
        @click="nextPage"
      >
        Next
      </b-button>
    </div>
  </div>
  <div v-else>
    <p>No posts</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';
import { Post } from '../store/types';
import PostsCard from './PostsCard.vue';

@Component({
  name: 'PostsList',
  components: {
    PostsCard,
  },
})
export default class extends Vue { // Create pagination with json-server and intinity scroll or only with json-server
  size = 10

  pageNumber = 0

  @State posts!: Array<Post> | null;

  @Action fetchPosts!: () => Promise<void>

  created() {
    this.fetchPosts();
  }

  nextPage() {
    this.pageNumber += 1;
  }

  prevPage() {
    this.pageNumber -= 1;
  }

  get pageCount(): number {
    if (!this.posts) return 0;
    const s = this.size;
    const l = this.posts.length;
    return Math.ceil(l / s);
  }

  get paginatedPosts(): Array<Post> {
    if (!this.posts) return [];
    const start = this.pageNumber * this.size;
    const end = start + this.size;
    return this.posts.slice(start, end);
  }
}
</script>
