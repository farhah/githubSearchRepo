<template>
  <div>
  <v-data-table
    :headers="headers"
    :items="searchResults"
    :page="page"
    :pageCount="numberOfPages"
    :options.sync="options"
    :server-items-length="totalSearchResults"
    :loading="loading"
    class="elevation-1"
  >
      <template v-slot:item.result="{ item }">
        <v-btn
         icon color="primary" small
          v-model="item.result"
          @click.stop="$set(dialogNote, item.result._id, true)"
        >Result</v-btn>
          <v-dialog v-model="dialogNote[item.result._id]" scrollable max-width="500" :key="item.result._id">
          <v-card>
      <v-card-title>
        <span>Github search query result</span>
      </v-card-title>
      <v-card-text v-model="item.result" rows="8" cols="40">
        <pre>{{ item.result | pretty }}</pre>
      </v-card-text>
      <v-card-actions>
        <v-btn color="primary" text @click.stop="$set(dialogNote, item.result._id, false)">Close</v-btn>
      </v-card-actions>
    </v-card>
          </v-dialog>
      </template>      
  </v-data-table>   
  </div>
</template>

<script>
import search from '../services/search'

export default {
  
  name: 'SearchHistory',
  props: {
     userName: {
         type: String,
     },
  },
  components: {
  },
  data() {

    return {
      dialogNote: {},
      page: 0,
      totalSearchResults: 0,
      numberOfPages: 0,
      searchResults: [],
      loading: true,
      options: {},
      headers: [
        { text: 'Url', value: 'url', sortable: false },
        { text: 'Language', value: 'language', sortable: false },
        { text: 'Topic', value: 'topic', sortable: false },
        { text: 'Page', value: 'page', sortable: false },
        { text: 'Items per page', value: 'itemsPerPage', sortable: false },
        { text: 'Result', value: 'result', sortable: false },
        { text: 'Queried at', value: 'timestamp', sortable: false }


      ],

    };
  },
  watch: {
    options: {
      handler() {
        this.getSearchHistoryResults();
      },
    },
    deep: true,
  },
  methods: {
     getSearchHistoryResults() {
        this.loading = true;
        const { page, itemsPerPage } = this.options;
        let pageNumber = page + 1;

        search.searchHistory(pageNumber, itemsPerPage)
        .then(result => {
          this.loading = false;
          this.searchResults = result.data.history.map(this.displayResult);
          this.totalSearchResults = result.data.total_count;

          this.numberOfPages = Math.ceil(this.totalSearchResults / itemsPerPage);
        })
        .catch(err => console.log({ error: err})); 
      },

      displayResult(searchResult) {
        let convertData = new Date(searchResult.createdAt)
        return {
          url: searchResult.url,
          language: searchResult.language,
          topic: searchResult.topic,
          itemsPerPage: searchResult.itemsPerPage,
          result: searchResult.result,
          timestamp: convertData.toString(),
          page: searchResult.page
        };
      },

  },
  filters: {
    pretty: (value) => {
      return JSON.stringify(value, null, 2);
    }
  }
};
</script>