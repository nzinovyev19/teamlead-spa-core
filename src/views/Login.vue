<template>
  <section class="section">
    <div class="container">
      <div class="columns">
        <div class="column is-4 is-offset-4">
          <form @submit="signIn" class="box">
            <b-field label="Login">
              <b-input v-model="login" required />
            </b-field>
            <b-field label="Password">
              <b-input
                type="password"
                required
                password-reveal
                v-model="password"
              />
            </b-field>
            <span class="mt-4" v-if="loginError">{{ loginError }}</span>
            <b-field>
              <button
                type="submit"
                expanded
                class="mt-4 button is-primary expanded"
              >
                Sign in
              </button>
            </b-field>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import Vue from 'vue';
import { State, Action, Mutation } from 'vuex-class';
import Component from 'vue-class-component';
import { User } from '../store/types';

@Component
export default class extends Vue {
  private login = '';

  private password = '';

  private loginError = '';

  @State users!: Array<User> | null

  @Mutation setUser!: (user: User) => void

  @Action fetchUsers!: () => Promise<void>

  async signIn(e: Event) {
    e.preventDefault();
    await this.fetchUsers();
    if (this.users) {
      const currentUser: User | undefined = this.users.find((user) => this.login.includes(user.login));
      if (currentUser?.password === this.password) {
        this.setUser(currentUser);
        this.$router.push({ name: 'Posts' });
      } else {
        this.loginError = 'Incorrect login or password';
      }
    }
  }
}
</script>
