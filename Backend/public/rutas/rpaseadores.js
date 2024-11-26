module.exports = (app) => {

    var paseCtrl = require('../controlador/cpaseador') ;

    app.route('/pase/getAllPase')
        .get( paseCtrl.getAllPase) ;

    app.route('/pase/insPase')
        .post( paseCtrl.insPase ) ;

    app.route('/pase/getPase')
        .post( paseCtrl.getPase ) ;

    app.route('/pase/updPase')
        .post( paseCtrl.updPase ) ;

    app.route('/pase/eliPase')
        .post( paseCtrl.eliPase ) ;
}