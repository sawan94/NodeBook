'use strict';
module.exports = function(app) {
    var CommonCon = require('../controllers/CommonController');
    var authController = require('../controllers/Auth')
   
    // CommonCon Routes
    app.route('/api/v1/books')
        .get(authController.isAuthenticated,CommonCon.list_all_books)
        .post(authController.isAuthenticated,CommonCon.add_a_book);

    app.route('/api/v1/books/:bookId')
        .get(authController.isAuthenticated,CommonCon.get_a_book)
        .put(authController.isAuthenticated,CommonCon.update_a_book)
        .delete(authController.isAuthenticated,CommonCon.delete_a_book);

    app.route('/api/v1/books/request')
        .get(authController.isAuthenticated,CommonCon.list_all_requests)
        .post(authController.isAuthenticated,CommonCon.add_a_request);

    app.route('/api/v1/books/request/:requestId')
        .get(authController.isAuthenticated,CommonCon.get_a_request)
        .put(authController.isAuthenticated,CommonCon.update_a_request)
        .delete(authController.isAuthenticated,CommonCon.delete_a_request);
    
    app.route('/api/v1/users/')
        .get(authController.isAuthenticated,CommonCon.list_all_users)
        .post(CommonCon.add_a_user);
};





