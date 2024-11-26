import axios from 'axios' ;
import store from './store' ;

const iAX = axios.create(
    {
        baseURL: 'http://localhost:2001',
        headers: {
            'Content-Type': 'application/json'
        }
    }
) ;

iAX.interceptors.request.use(

    config => {
        const mt = store.getState().app.miToken ;
        console.log( "Estoy en el interceptor - request:" + mt ) ;
        config.headers['mitoken'] = mt ;
        return( config ) ;
    },
    error  => {
        return( Promise.reject(error) ) ;
    }
) ;

iAX.interceptors.response.use(
   
    response => {
        console.log( "Estoy en el interceptor response:::>" + JSON.stringify(response.data.results) ) ;
        return( response ) ;
    },
    error    => {
        if( error.response && error.response.status === 401 ) {
            window.location.href = '/Pprincipal' ;
        }
        return( Promise.reject(error) ) ;
    }
) ;

export default iAX ;