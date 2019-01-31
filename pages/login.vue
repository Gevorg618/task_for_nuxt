<template>

  <section>
    <div class="auth-section">

      <div class="container text-center">
        <form v-on:submit.prevent="login(loginForm)" :model="loginForm" class="d-inline-block">
          <h5 class="text-uppercase text-left font-weight-bold mb-3">login</h5>
          <div class="form-group">
            <input v-model="loginForm.email" id="email" type="email" name="email" placeholder="Email">
          </div>
          <label class="errors" v-if="this.errors.email" for="email">Email does not match any record's</label>

          <div class="form-group">
            <input v-model="loginForm.password" id="password" type="password" name="password" placeholder="Password">
          </div>
          <label class="errors" v-if="!this.errors.email && this.errors.password" for="password">Incorrect Password</label>

          <div class="text-left ">
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>


  </section>

</template>

<script>
import axios from 'axios'
export default {
  middleware: 'checkAuth',
  data(){
    return{
      getProjects: {},
      loginForm: {
        email: '',
        password: ''
      },
      errors: {},
      token: ''
    }
  },

  methods: {
    login(loginForm){
      axios.post('https://api.quwi.com/v2/auth/login',{
        email: loginForm.email,
        password: loginForm.password,

      }).then(response => {
        this.token = response.data.token;
        this.$store.commit('SET_AUTH_DATA', {token: response.data.token, userId: response.data.app_init.user.id});
        this.$router.push('home', response.data.app_init.user.id)
      }).catch(error => {
        console.log(error);
        this.errors = error.response.data.first_errors
      });
    },
    projects(){
      axios.get('https://api.quwi.com/v2/projects',{
        headers: {
          'Authorization': 'Bearer '+ this.token
        }
      }).then(response => {
        this.getProjects = response.data.projects
      })
    },
    mounted() {
      this.projects();
    }

  },
}
</script>

<style>
  .errors{
    color: red;
  }
  .auth-section{
    background-color:#f4f4f4;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .auth-section input{
    width: 300px;
    padding: 5px 10px;
    border: 1px solid #d3d3d3;
    border-radius: 3px;
  }
  .auth-section input::placeholder{
    color: #d3d3d3;
  }
  .auth-section button{
    background-color: #395378;
    border-radius: 5px;
    border: none;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    padding: 7px 27px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
