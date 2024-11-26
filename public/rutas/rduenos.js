module.exports = (app) => {

    var duenCtrl = require('../controlador/cdueno') ;

    app.route('/due/getAllDuen')
        .get( duenCtrl.getAllDuen ) ;

    app.route('/due/insDuen')
        .post( duenCtrl.insDuen ) ;

    app.route('/due/getDuen')
        .post( duenCtrl.getDuen ) ;

    app.route('/due/updDuen')
        .post( duenCtrl.updDuen ) ;

    app.route('/due/eliDuen')
        .post( duenCtrl.eliDuen ) ;
}