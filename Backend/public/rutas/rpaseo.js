module.exports = (app) => {

    var paseoCtrl = require('../controlador/cpaseo') ;

    app.route('/paseo/getAllPaseo')
        .get( paseoCtrl.getAllPaseo) ;

    app.route('/paseo/insPaseo')
        .post( paseoCtrl.insPaseo ) ;

    app.route('/paseo/getPaseo')
        .post( paseoCtrl.getPaseo ) ;

    app.route('/paseo/getAllPaseoMascota')
        .get( paseoCtrl.getAllPaseoMascota) ;


}