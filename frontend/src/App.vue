<template>
  <div>
    <h1>User List</h1>
    <ul>
      <li v-for="user in users" :key="user.id">
        {{ user.name }} - {{ user.email }}
        <button @click="deleteUser(user.id)">Delete</button>
      </li>
    </ul>

    <h2>Add User</h2>
    <form @submit.prevent="addUser">
      <input v-model="name" placeholder="Name" />
      <input v-model="email" placeholder="Email" />
      <button type="submit">Add</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      name: '',
      email: ''
    };
  },
  methods: {
    async fetchUsers() {
      const response = await axios.get('http://localhost:5000/api/users');
      this.users = response.data;
    },
    async addUser() {
      const newUser = { name: this.name, email: this.email };
      await axios.post('http://localhost:5000/api/users', newUser);
      this.fetchUsers();
      this.name = '';
      this.email = '';
    },
    async deleteUser(id) {
      await axios.delete(`http://localhost:5000/api/users/${id}`);
      this.fetchUsers();
    }
  },
  mounted() {
    this.fetchUsers();
  }
};
</script>
