<template>
  <div id="app">
    <header>
      <div class="container">
        <b-navbar>
            <template slot="start">
              <b-navbar-item v-if="!user" href="/login">Login</b-navbar-item>
              <b-navbar-item v-else @click="logout">Logout</b-navbar-item>
              <b-navbar-item href="/">Posts</b-navbar-item>
              <b-navbar-item v-if="userRoleIsWriter" @click="pushOnCreatinPost">New Post</b-navbar-item>
            </template>
        </b-navbar>
      </div>
    </header>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { User } from '@/store/types';
import { Component } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';

@Component({
  name: 'App',
})
export default class extends Vue {
  @State user!: User | null

  @Mutation unsetUser!: () => void

  get userRoleIsWriter(): boolean {
    return this.user?.role === 'writer';
  }

  pushOnCreatinPost() {
    this.$router.push({ name: 'CreatePost' });
  }

  logout() {
    this.unsetUser();
  }
}
</script>
