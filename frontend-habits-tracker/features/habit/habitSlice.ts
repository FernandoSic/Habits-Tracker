import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"; //Importar createSlice de redux toolkit
import {fetchHabits, fetchAddHabit} from "./habitAPI"; //Importar fetchHabits de habitAPI

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

type markAsDoneThunkParams = {
    habitId: string;
    token: string;
}; //Definir el tipo markAsDoneThunkParams
type addHabitThunkParams = {
    token: string;
    title: string;
    description: string;
}; //Definir el tipo addHabitThunkParams

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

export const markAsDoneThunk = createAsyncThunk("habit/markAsDone", async ({habitId,token} : markAsDoneThunkParams, {rejectWithValue}) => {
    const response = await fetch(`http://localhost:3001/habits/markasdone/${habitId}`, {
        method: "PATCH",
        headers: {
            Authorization: "Bearer " + token
        }
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



export const fetchHabitsThunk = createAsyncThunk("habit/fetchHabits", async (token:string, {rejectWithValue}) => {
    const response = await fetchHabits(token);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to fetch habits");
    }
    return responseJson;
}); //Crear el thunk fetchHabitsThunk

export const fetchAddHabitThunk = createAsyncThunk("habit/fetchAddHabit", async ({token, title, description}: addHabitThunkParams, {rejectWithValue}) => {
    const response = await fetchAddHabit(token, title, description);
    const responseJson = await response.json();
    if (!response.ok) {
        return rejectWithValue("Failed to add habit");
    }else if(responseJson.message.toString() === "Error creating habit") {
        return rejectWithValue(responseJson.message);
    }else {
        return responseJson.token;
    }
}); //Crear el thunk fetchAddHabitThunk


const habitSlice = createSlice({
    name: "habits",
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
            state.status[action.meta.arg.habitId] = "success";
            state.error[action.meta.arg.habitId] = null;
            
        }).addCase(markAsDoneThunk.rejected, (state, action) => {
            state.status[action.meta.arg.habitId] = "failed";
            state.error[action.meta.arg.habitId] = action.payload as string;
        }).addCase(fetchAddHabitThunk.fulfilled, (state, action) => {
            state.habits.push(action.payload);
        });
    }
}); 

export const { addHabits, addHabit, removeHabit } = habitSlice.actions; //Exportar las acciones
export default habitSlice.reducer; //Exportar el reducer

