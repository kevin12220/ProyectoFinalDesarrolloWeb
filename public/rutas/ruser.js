module.exports = (app) => {

    var userCtrl = require('../controlador/cuser') ;

    app.route('/user/login')
        .post( userCtrl.login) ;

    app.route('/user/miUser')
        .get( userCtrl.miUser ) ;

    app.route('/usr/insUser')
        .post( userCtrl.insUser ) ;
}