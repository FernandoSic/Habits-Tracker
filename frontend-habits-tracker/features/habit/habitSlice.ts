import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //Importar createSlice de redux toolkit
import {fetchHabits} from "./habitAPI"; //Importar fetchHabits de habitAPI

type Habit = {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdate: Date;
    startedAt: Date;
}; //Definir el tipo Habit

type HabitState = {
    habits: Habit[];
    status: Record <string, "idle" | "loading" | "success" | "failed">;
    error: Record <string, string | null>;

}; //Definir el tipo HabitState

const initialState: HabitState = {
    habits: [],
    status: {},
    error: {}
}; //Definir el estado inicial

export const markAsDoneThunk = createAsyncThunk("habit/markAsDone", async (habitId: string, {rejectWithValue}) => {
    const response = await fetch(`http://localhost:3001/habits/markasdone/${habitId}`, {
        method: "PATCH",
    });
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to mark habit as done");
    }else if (responseJson.message.toString() === "Habit restarted") {
        return rejectWithValue(responseJson.message);
    }else {
        return responseJson.message;
    }
}); //Crear el thunk markAsDoneThunk



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
            state.habits = state.habits.filter((habit) => habit._id !== action.payload);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHabitsThunk.fulfilled, (state, action) => {
            state.habits = action.payload;
        }).addCase(markAsDoneThunk.fulfilled, (state, action) => {
            state.status[action.meta.arg] = "success";
            state.error[action.meta.arg] = null;
            
        }).addCase(markAsDoneThunk.rejected, (state, action) => {
            state.status[action.meta.arg] = "failed";
            state.error[action.meta.arg] = action.payload as string;
        });
    }
}); 

export const { addHabits, addHabit, removeHabit } = habitSlice.actions; //Exportar las acciones
export default habitSlice.reducer; //Exportar el reducer

