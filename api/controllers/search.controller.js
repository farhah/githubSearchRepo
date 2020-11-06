import searchService from '../services/search.services'

exports.saveSearchQuery =  async (userId, query, language, topic, url, page, itemsPerPage, result) => {
    try{
        return await searchService.saveSearchQuery(userId, query, language, topic, url, page, itemsPerPage, result)
    }
    catch (e) {
        throw new Error(e)
    }
    
}

exports.getSearchHistories = async (userId, page, itemsPerPage) => {
    try{
        page = parseInt(page, 10) || 0
        if (page !== 0) { page = page - 1 } // pagination starts at 0
        itemsPerPage = parseInt(itemsPerPage, 10) || 1
        return await searchService.getSearchHistories(userId, page, itemsPerPage)
    }
    catch (e) {
        throw new Error(e)
    }
}
