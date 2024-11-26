import { createSlice } from "@reduxjs/toolkit"


const estadoIni = {
    miToken: "",
    infoDue: [],
    infoMasc: [],
    infoPase: [],
    infoPaseo:[]
} ;

const reducers = createSlice( {
    name: 'app',
    initialState: estadoIni,
    reducers: {
        setMiToken: (state,action) => {
            state.miToken = action.payload ;
        },
        setInfoDue: (state,action) => {
            state.infoDue = action.payload ;
        },
        setInfoMascota: (state,action) => {
                state.infoMasc = action.payload ;
        },
        setInfoPase: (state,action) => {
                state.infoPase = action.payload ;
        },
        setInfoPaseo: (state,action) => {
                state.infoPaseo = action.payload ;
    }
    }
} ) ;

export const {setMiToken,setInfoDue,setInfoMascota,setInfoPase,setInfoPaseo} = reducers.actions ;
export default reducers.reducer ;