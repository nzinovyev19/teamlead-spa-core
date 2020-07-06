<template>
  <section class="section">
    <div class="container">
      <form
        v-if="post"
        class="card has-text-left"
        @submit="saveChangedData"
      >
        <div class="card-content">
          <b-field label="Title">
            <b-input v-model="formValues.title" required />
          </b-field>
          <b-field label="Description">
            <b-input
              type="textarea"
              required
              v-model="formValues.description"
            />
          </b-field>
          <b-field>
            <button
              type="submit"
              expanded
              class="mt-4 button is-primary expanded"
              :disabled="!post"
            >
              Save
            </button>
          </b-field>
        </div>
      </form>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import { Action, State } from 'vuex-class';
import { Post, Omit } from '../store/types';

@Component({
  name: 'PostsEditing',
})
export default class extends Vue {
  @State post!: Post | null

  @Action fetchPost!: (id: string) => Promise<void>

  @Action editPost!: (
    data: {
      id: number;
      changedData: Omit<Post, 'id' | 'claps' | 'createdAt' | 'updatedAt' | 'userId'>; // TODO: With only Pick
    }
  ) => Promise<void>

  formValues = {
    title: '',
    description: '',
  }

  initFormValues() {
    if (this.post) {
      this.formValues.title = this.post.title;
      this.formValues.description = this.post.description;
    }
  }

  async saveChangedData(e: Event) {
    e.preventDefault();
    if (this.post) {
      await this.editPost({
        id: this.post.id,
        changedData: Object.assign(this.formValues, { updatedAt: new Date().toISOString() }),
      });
      this.$router.push({ name: 'Posts' });
    }
  }

  async created() {
    await this.fetchPost(this.$route.params.id);
    this.initFormValues();
  }
}
</script>
