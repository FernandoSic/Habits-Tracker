import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //Importar createSlice de redux toolkit
import {fetchHabits} from "./habitAPI"; //Importar fetchHabits de habitAPI

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

export const fetchHabitsThunk = createAsyncThunk("habit/fetchHabits", async () => {
    return await fetchHabits();
}); //Crear el thunk fetchHabitsThunk


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
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        }); //Agregar el caso fetchHabitsThunk.fulfilled al reducer de habitSlice
    },
}); //Crear el slice de habit con las acciones addHabits, addHabit y removeHabit

export const { addHabits, addHabit, removeHabit } = habitSlice.actions; //Exportar las acciones
export default habitSlice.reducer; //Exportar el reducer

