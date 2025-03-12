import { configureStore } from "@reduxjs/toolkit"; //Importar configureStore de redux toolkit
import habitReducer from "../features/habit/habitSlice"; //Importar el reducer de habit

export const makeStore = () => {
    return configureStore({
        reducer: {
            habit: habitReducer,
        }, //Configurar la store con el reducer de habit
    });
}; //Crear la store

export type AppStore = ReturnType<typeof makeStore>; //Aseguar que store este creada correctamente
export type AppState = ReturnType<AppStore["getState"]>; //Manejar el estado de la store
export type AppDispatch = AppStore["dispatch"]; //Manejar las acciones de la store
export type RootState = ReturnType<AppStore["getState"]>; //Manejar el estado de la store