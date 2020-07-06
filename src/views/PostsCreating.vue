<template>
  <section class="section">
    <div class="container">
      <form
        class="card has-text-left"
        @submit="addNewData"
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
            >
              Create
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
import { Post, Omit, User } from '../store/types';

@Component({
  name: 'PostsCreating',
})
export default class extends Vue {
  @State user!: User | null

  @Action createPost!: (post: Omit<Post, 'id'>) => Promise<void>

  formValues = {
    title: '',
    description: '',
  }

  async addNewData(e: Event) {
    e.preventDefault();
    if (this.user?.role === 'writer') {
      await this.createPost(Object.assign(this.formValues, {
        claps: 0,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: this.user.id,
      }));
      this.$router.push({ name: 'Posts' });
    }
  }
}
</script>
