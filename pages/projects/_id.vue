<template>
  <section class="edit-page" style="background-color: #f4f4f4; height: 780px;">
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
              <a class="nav-link text-uppercase" @click="toHome()" href="#">projects</a>
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
        <div class="col-12 col-md-8">
          <div class="edit-box d-flex justify-content-between p-4 flex-wrap">
            <!--Loader-->
            <transition v-if="loadingRequest" leave-active-class="animated fadeOut">
              <div class="preloader">
                <svg class="loader-img" width="64px" height="64px" viewBox="0 0 128 128" xml:space="preserve">
                               <g><path d="M75.4 126.63a11.43 11.43 0 0 1-2.1-22.65 40.9 40.9 0 0 0 30.5-30.6 11.4 11.4 0 1 1 22.27 4.87h.02a63.77 63.77 0 0 1-47.8 48.05v-.02a11.38 11.38 0 0 1-2.93.37z" fill="#898989" fill-opacity="1"/>
                                 <animateTransform attributeName="transform" type="rotate" from="0 64 64" to="360 64 64"
                                                   dur="1000ms" repeatCount="indefinite"></animateTransform>
                               </g>
                           </svg>
              </div>
            </transition>
            <div>

              <div class="d-flex align-items-center mt-4">
                <span>{{ projectInfo.name }}</span>
                <div class="input-group ml-5">
                  <input type="text" v-model="projectName" class="form-control" placeholder=""
                         aria-label="Recipient's username"
                         aria-describedby="basic-addon2">
                  <div class="input-group-append">
                    <button @click="edit()" v-if="button" class="btn btn-outline-secondary" type="button">Ok</button>
                  </div>
                </div>
              </div>

            </div>
            <div class="ml-auto">
              <img
                :src="projectInfo.logo_url">
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
    name: "id",
    data() {
      return {
        loadingRequest: false,
        button: true,
        projectName: '',
        projectId: '',
        projectInfo: {}
      }
    },
    mounted() {

      console.log(this.$router.history.current.params.id)
      this.projectId = this.$router.history.current.params.id
      var self = this
      axios.get('https://api.quwi.com/v2/projects-manage/' + this.projectId, {
        headers: {
          'Authorization': 'Bearer ' + this.$cookies.get('_token')
        }
      }).then(response => {
        self.projectInfo = response.data.project
      })
    },
    methods: {
      toHome(){
        this.$router.push('/home')
      },
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
      edit() {
        this.$nuxt.$loading.start()
        var self = this
        console.log(this.projectName)
        if (this.projectName != '') {
          this.button = false
          this.loadingRequest = true
          axios.post('https://api.quwi.com/v2/projects-manage/update?id=' + this.projectInfo.id, {name: self.projectName}, {
            headers: {
              'Authorization': 'Bearer ' + this.$cookies.get('_token')
            }
          }).then(response => {
            this.$nuxt.$loading.finish()
            this.button = true
            this.loadingRequest = false
            this.projectInfo = response.data.project
          })
        }


      }
    }
  }
</script>

<style scoped>
  .edit-page {
    background-color: #f4f4f4;
  }

  .edit-box {
    background-color: #fff;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, .44);
    position: relative;
  }

  .edit-box img {
    max-width: 70px;
  }

  .switch {
    position: relative;
    display: inline-block;
    width: 45px;
    height: 25px;
  }

  .preloader {
    background: #fff;
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 9;
    display: flex;
    align-items: center;
    justify-content: center;
    left: 0;
    top: 0;
  }

  .switch input {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: .4s;
    transition: .4s;
  }

  .slider:before {
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    left: 4px;
    bottom: 3px;
    background-color: white;
    -webkit-transition: .4s;
    transition: .4s;
  }

  input:checked + .slider {
    background-color: #2196F3;
  }

  input:focus + .slider {
    box-shadow: 0 0 1px #2196F3;
  }

  input:checked + .slider:before {
    -webkit-transform: translateX(17px);
    -ms-transform: translateX(17px);
    transform: translateX(17px);
  }

  /* Rounded sliders */
  .slider.round {
    border-radius: 34px;
  }

  .slider.round:before {
    border-radius: 50%;
  }
</style>
