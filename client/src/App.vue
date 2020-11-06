<template>
  <div id="app" data-app>
    
    <Nav v-bind:userName="userName"></Nav>



    <b-container class="bv-example-row mb-3">
    <v-main>
      <router-view></router-view>
    </v-main>
      <b-row cols="2">
        <b-col cols="12">
          <!-- <Searchbar
          v-bind:userName="userName"
          ></Searchbar> -->
        </b-col>
      </b-row>
      <b-row cols="2">
        <b-col cols="4">
          
          

        </b-col>
        <b-col cols="8">
          
        </b-col>
      </b-row>
    </b-container>
    
    </div>
</template>

<style >
@import url('https://fonts.googleapis.com/css?family=Comfortaa');
</style>
<script>
import { mapGetters } from 'vuex'
import Nav from './components/Nav'
// import Searchbar from './components/Searchbar'

export default {
  name: "app",
  components: {
    Nav,
    // Searchbar
  },
  computed: {
    ...mapGetters(['userName', 'userId'])
  },
  methods: {
    
      // console.log(this.userName, this.userId);
      // GithubSearch.search('tetris', 'jekyll', 'python')
      // .then(result => {
      //   console.log('*******')
      //   console.log(result);
      // })
      // .catch(err => err);
    // GithubAuth.getUser().then(res => {
    //   console.log(res.data.username);
    //   // this.username = res.data.username;
    // });
  }
};
</script>


