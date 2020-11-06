<template>
  <div>

    <v-text-field
      v-model="searchTerms.query"
      :counter="255"
      label="Query"
      required
    ></v-text-field>

    <v-text-field
      v-model="searchTerms.topic"
      label="Topic"
    ></v-text-field>

    <v-text-field
    v-model="searchTerms.language"
      label="Language"
      required
    ></v-text-field>
    <v-btn @click="getSearchResults()">Search</v-btn>
  
    <!-- <v-btn type="submit" @click.native.prevent="submitItem($event)">Search</v-btn> -->
  <!-- <ResultTable :searchTerms='searchTerms'></ResultTable> -->
  <v-data-table
    :headers="headers"
    :items="searchResults"
    :page="page"
    :pageCount="numberOfPages"
    :options.sync="options"
    :server-items-length="totalSearchResults"
    :loading="loading"
    class="elevation-1"
  ></v-data-table>   
  </div>
</template>

<script>
import search from '../services/search'

export default {
  
  name: 'Searchbar',
  props: {
     userName: {
         type: String,
     },
  },
  components: {
  },
  data() {

    return {
      searchTerms: {
        query: '',
        topic: '',
        language: '',
      },
      page: 0,
      totalSearchResults: 0,
      numberOfPages: 0,
      searchResults: [],
      loading: true,
      options: {},
      headers: [
        { text: 'Owner', align: 'start', sortable: false, value: 'owner' },
        { text: 'Url', value: 'url', sortable: false },
        { text: 'Language', value: 'language', sortable: false },
        { text: 'Description', value: 'desc', sortable: false }
      ],

    };
  },
  watch: {
    options: {
      handler() {
        this.getSearchResults();
      },
    },
    deep: true,

  },
  methods: {
     getSearchResults() {
        console.log('--- get search results ---')
        this.loading = true;
        const { page, itemsPerPage } = this.options;
        let pageNumber = page;

        search.searchGithub(this.searchTerms.query, this.searchTerms.language, this.searchTerms.topic, pageNumber, itemsPerPage)
        .then(result => {
          console.log(' -- inside search bar search')
          console.log(result)
          console.log(result.data.items)
          this.loading = false;
          this.searchResults = result.data.items.map(this.displayResult);
          this.totalSearchResults = result.data.total_count;

          this.numberOfPages = Math.ceil(this.totalSearchResults / itemsPerPage);
          console.log(this.numberOfPages, this.totalSearchResults, itemsPerPage);
        })
        .catch(err => console.log({ error: err})); 
      },

      displayResult(searchResult) {
        return {
          owner: searchResult.owner.html_url,
          url: searchResult.html_url,
          language: searchResult.language,
          desc: searchResult.description
        };
      },

  },
};
</script>