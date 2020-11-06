import axios from 'axios'


const searchGithub = async (query, topic, language, page, itemsPerPage) => {
            query = query || '';
            language = language || '';
            topic = topic || '';
            itemsPerPage = itemsPerPage || 10;
            page = page || 1;

            query = query.replace(/\s+/g, '+');
            topic = topic.replace(/\s+/g, '+');
            language = language.replace(/\s+/g, '+');

            console.log(query, topic, language, page, itemsPerPage);

            return await axios.get('/search', { params: { query: query, language: language, topic: topic, page: page, itemsPerPage: itemsPerPage } })
            // .then(result => {
            //     console.log('*******')
            //     console.log(result);
            //     return result.status(200).json(result.data)
            //   })
            //   .catch(err => err);
}

const searchHistory = async (page, itemsPerPage) => {
    return await axios.get('/search/history', { params: { page: page, itemsPerPage: itemsPerPage}})
}

export default {
    searchHistory,
    searchGithub
}