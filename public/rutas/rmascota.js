module.exports = (app) => {

    var masCtrl = require('../controlador/cmascota') ;

    app.route('/masc/getAllMasc')
        .get( masCtrl.getAllMasc ) ;

    app.route('/masc/insMasc')
        .post( masCtrl.insMasc ) ;

    app.route('/masc/getMasc')
        .post( masCtrl.getMasc ) ;

    app.route('/masc/updMasc')
        .post( masCtrl.updMasc ) ;

    app.route('/masc/eliMasc')
        .post( masCtrl.eliMasc ) ;
}