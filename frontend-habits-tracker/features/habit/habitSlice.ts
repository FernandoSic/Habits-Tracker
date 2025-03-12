import { createSlice } from "@reduxjs/toolkit"; //Importar createSlice de redux toolkit

type Habit = {
    id: string;
    title: string;
    description: string;
    createdAt: string;
}; //Definir el tipo Habit

type HabitState = {
    habits: Habit[];
}; //Definir el tipo HabitState

const initialState: HabitState = {
    habits: [],
}; //Definir el estado inicial

const habitSlice = createSlice({
    name: "habit",
    initialState,
    reducers: {
        addHabits: (state, action) => {
            state.habits = action.payload;
        },
        addHabit: (state, action) => {
            state.habits.push(action.payload);
        },
        removeHabit: (state, action) => {
            state.habits = state.habits.filter((habit) => habit.id !== action.payload);
        },
    },
}); //Crear el slice de habit con las acciones addHabits, addHabit y removeHabit

export const { addHabits, addHabit, removeHabit } = habitSlice.actions; //Exportar las acciones
export default habitSlice.reducer; //Exportar el reducer

