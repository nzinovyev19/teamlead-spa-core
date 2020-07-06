import Vue from 'vue';
import createPersistedState from 'vuex-persistedstate';
import Vuex, { StoreOptions } from 'vuex';
import { RootState, Post, User } from './types';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    user: null,
    users: null,
    post: null,
    posts: null,
    error: null,
  },
  mutations: {
    setPost(state, post: Post) {
      state.post = post;
    },
    setPosts(state, posts: Array<Post>) {
      state.posts = posts;
    },
    addPost(state, post: Post) {
      if (state.posts !== null) {
        state.posts.push(post);
      }
    },
    deletePost(state, id: number) {
      if (state.posts !== null) {
        state.posts = state.posts.filter((post: Post) => post.id !== id);
      }
    },
    editPost(state, changedPost: Post) {
      if (state.posts !== null) {
        state.posts.splice(state.posts.findIndex((order) => order.id === changedPost.id), 1, changedPost);
      }
    },
    setUsers(state, users: Array<User>) {
      state.users = users;
    },
    setUser(state, user: User) {
      state.user = user;
    },
    unsetUser(state) {
      state.user = null;
    },
    setError(state, error: Error) {
      state.error = error;
    },
  },
  actions: {
    fetchPost({ commit }, id: string) {
      try {
        return fetch(`http://localhost:3000/posts/${id}`)
          .then((response) => response.json())
          .then((data: Post) => commit('setPost', data));
      } catch (e) {
        return commit('setError', e);
      }
    },
    deletePost({ commit }, id: string) {
      try {
        return fetch(`http://localhost:3000/posts/${id}`, {
          method: 'DELETE',
        })
          .then(() => commit('deletePost', id));
      } catch (e) {
        return commit('setError', e);
      }
    },
    editPost({ commit }, { id, changedData }: { id: number; changedData: { [key: string]: string | number } }) {
      try {
        return fetch(
          `http://localhost:3000/posts/${id}`,
          {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(changedData),
          },
        )
          .then((response) => response.json())
          .then((data: Post) => commit('editPost', data));
      } catch (e) {
        return commit('setError', e);
      }
    },
    createPost({ commit }, post: Post) {
      try {
        return fetch('http://localhost:3000/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(post),
        })
          .then((response) => response.json())
          .then((data: Post) => commit('addPost', data));
      } catch (e) {
        return commit('setError', e);
      }
    },
    fetchPosts({ commit }) {
      try {
        return fetch('http://localhost:3000/posts?_sort=id&_order=desc')
          .then((response) => response.json())
          .then((data: Array<Post>) => commit('setPosts', data));
      } catch (e) {
        return commit('setError', e);
      }
    },
    fetchUsers({ commit }) {
      try {
        return fetch('http://localhost:3000/users')
          .then((response) => response.json())
          .then((data: Array<User>) => commit('setUsers', data));
      } catch (e) {
        return commit('setError', e);
      }
    },
  },
  plugins: [createPersistedState({ paths: ['user'] })],
};

export default new Vuex.Store<RootState>(store);
