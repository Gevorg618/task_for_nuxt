<template>
  <section class="home-page">
    <header class="mb-4">
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Q</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
                aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link text-uppercase" href="#">projects</a>
            </li>
            <li class="nav-item">
              <a class="nav-link text-uppercase" @click="logout()" href="#">logout</a>
            </li>
          </ul>
        </div>
      </nav>
    </header>
    <div class="container">
      <div class="row justify-content-center">
        <!--v-for="project in projects"-->
        <div v-for="project in projects" @click="edit(project.id)" class="col-12 col-md-8">
          <div class="d-flex justify-content-between cart-box p-4 mt-3">
            <div class="brand-nameLogo">
              <img class="img-fluid" :src="project.logo_url">
              <h6 class="m-0 ml-2 font-weight-bold">{{ project.name }}</h6>
            </div>
            <div class="cart-right-box">
              <div>
                <p v-if="project.is_active" class="active">Active</p>
                <p v-if="!project.is_active" style="color: red!important;" class="active">Inactive</p>
                <p v-if="project.users.count > 0">project.users.count()</p>
                <p v-else>No users</p>
              </div>
              <div>
                <p>
                  <span>time this week</span>
                  <span>{{ project.spent_time_week }}</span>
                </p>
                <p>
                  <span>time month</span>
                  <span>{{ project.spent_time_month }}</span>
                </p>
                <p>
                  <span>total</span>
                  <span>{{ project.spent_time_all }}</span>
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script>
  import axios from 'axios'

  export default {
    middleware: 'auth',
    name: "NavBarComponent",
    props: ['userId'],
    data() {
      props: {
        token: {
          required: true
        }
      }
      return {
        projects: []

      }
    },

    mounted() {
      axios.get('https://api.quwi.com/v2/projects', {
        headers: {
          'Authorization': 'Bearer ' + this.$cookies.get('_token')
        }
      }).then(response => {
        var self = this
        response.data.projects.forEach(function (value) {
          self.getInfo(value.id)
        })
      })
    },
    methods: {
      logout() {
        axios.post('https://api.quwi.com/v2/auth/logout', {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get('_token')
          }
        }).then(response => {
          this.$cookies.remove('_token')
          this.$cookies.remove('_userId')
          this.$router.push('/login')
        })
      },
      getInfo(id) {
        console.log()
        var self = this
        axios.get('https://api.quwi.com/v2/projects-manage/' + id, {
          headers: {
            'Authorization': 'Bearer ' + this.$cookies.get('_token')
          }
        }).then(response => {
          self.projects.push(response.data.project)
        })
      },
      edit(id) {
        this.$router.push('/projects/' + id)
      }
    }

  }

</script>

<style scoped>
  .home-page {
    background-color: #f4f4f4;
    height: 728px;
  }

  .navbar-brand {
    font-size: 30px;
    font-weight: bold;
  }

  .cart-box {
    border: 1px solid #dedede;
    border-radius: 3px;
    background-color: #fff;
  }

  .cart-box:hover {
    background-color: #ececec;
  }

  .brand-nameLogo {
    display: flex;
    align-items: center;
    width: 50%;
  }

  .brand-nameLogo img {
    max-width: 30px;
  }

  .cart-right-box {
    display: flex;
    justify-content: space-between;
    width: 50%;
  }

  .cart-right-box p {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 0px;
  }

  .cart-right-box .active {
    color: #338051;
  }
</style>
