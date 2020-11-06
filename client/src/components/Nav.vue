<template>
    <div>
        <b-navbar v-if="userName" toggleable="lg" type="light" variant="light">
            <b-navbar-brand :to="{ name: 'dashboard'}" tag="h1">Github Search Application</b-navbar-brand>
            <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
            <b-collapse id="nav-collapse" is-nav>
            <!-- <b-nav-form>                
            <b-form-input v-model="queries" size="sm" class="mr-sm-2" placeholder="Search Repo"></b-form-input>
            <b-form-input v-model="lang" size="sm" class="mr-sm-2" placeholder="language"></b-form-input>
            <b-button size="sm" class="mr-sm-2" variant="outline-success">Search</b-button>
            </b-nav-form> -->
            <!-- Right aligned nav items -->
                    <b-navbar-nav class="ml-auto">
                        <b-button :to="{ name: 'search-history'}">Search History</b-button>

                        <b-nav-item-dropdown right>
                        <!-- Using 'button-content' slot -->
                        <template #button-content>
                            <em>Hello {{userName}}</em>
                        </template>
                        <b-dropdown-item><h4 class="title" v-if="userName"><a href='http://localhost:5000/api/auth/logout'>Sign Out</a></h4></b-dropdown-item>    
                        </b-nav-item-dropdown>


                    </b-navbar-nav>
            </b-collapse>
        </b-navbar>
            
        <b-jumbotron 
        v-else   

        bg-variant="info" content="center" text-variant="white" border-variant="dark">
            <template #header>Github Search Application</template>

            <template #lead>
            Login With Github
            </template>

            <hr class="my-4">

            <p>
            <router-link to="/login">Login</router-link>
            </p>
        </b-jumbotron>
        </div>    
</template>

<script>

export default {
  name: 'Nav',
  props: ['userName'],
  components: {
  },
};

</script>