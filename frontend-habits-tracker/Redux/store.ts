import { configureStore } from "@reduxjs/toolkit"; //Importar configureStore de redux toolkit
import habitReducer from "../features/habit/habitSlice"; //Importar el reducer de habit
import userReducer from "../features/user/userSlice"; //Importar el reducer de user

export const makeStore = () => {
    return configureStore({
        reducer: {
            habits: habitReducer,
            user: userReducer
        }, //Configurar la store con el reducer de habit
    });
}; //Crear la store

export type AppStore = ReturnType<typeof makeStore>; //Aseguar que store este creada correctamente
export type AppState = ReturnType<AppStore["getState"]>; //Manejar el estado de la store
export type AppDispatch = AppStore["dispatch"]; //Manejar las acciones de la store
export type RootState = ReturnType<AppStore["getState"]>; //Manejar el estado de la store