/*
 *  Api: contains all API calls that are used in the application
 */

import ApiUtils from './ApiUtils'

const config = require('../config/config.json');

let Api = {

    // Books
    getAllBooks: function ( page = 1 ) {
        return fetch(config.API_SERVER + '/books.json?page=' + page,
            {
                method: 'GET'
            })
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .catch(e => console.log(e))
    },
    getBookById: function ( uuid ) {
        return fetch(config.API_SERVER + '/books/'+uuid+'.json', {method: 'GET'})
            .then(ApiUtils.checkStatus)
            .then(response => response.json())
            .catch(e => console.log(e))
    },
    getBooksByCategory( idCat , page = 1 ){
        return fetch(config.API_SERVER + '/categories/'+idCat+'/books.json?page=' + page, {method: 'GET'})
                .then(ApiUtils.checkStatus)
                .then(response => response.json())
                .catch(e => console.log(e))
    },

    //Categories
    getAllCategories : function () {
            return fetch(config.API_SERVER + '/categories.json?per_page='+config.MAX_CATEGORIES, {method: 'GET'})
                .then(ApiUtils.checkStatus)
                .then(response => response.json())
                .catch(e => console.log(e))
    },
}

export { Api as default };
