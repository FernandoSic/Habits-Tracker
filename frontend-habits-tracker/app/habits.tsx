import { useSelector, useDispatch } from "react-redux";
import { markAsDoneThunk } from "@/features/habit/habitSlice";
import { RootState, AppDispatch } from "../Redux/store";
import { fetchHabitsThunk } from "@/features/habit/habitSlice";

interface Habit {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    days: number;
    lastDone: Date;
    lastUpdate: Date;
    startedAt: Date;
}

type HabitsProp = {
    habits: Habit[];
}; //Definir el tipo de la prop

const handleMarkAsDone = (dispatch: AppDispatch, habitId: string) => {
    dispatch(markAsDoneThunk(habitId));
    dispatch(fetchHabitsThunk());
}

export default function Habits({habits}: HabitsProp) {
    const dispatch = useDispatch<AppDispatch>();
    const status = useSelector((state: RootState) => state.habits.status);
    const error = useSelector((state: RootState) => state.habits.error);

    const calculateProgress = (days: number):number => {
        return Math.min((days/66)*100,100);
    } //Calcular el progreso de la habito


    return (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2x1 font-bold mb-4">Habits</h1>
            <ul className="space-y-4">
                {habits.map((habit: any) => (
                    <li key={habit._id} className="flex justify-between items-center">
                        <span className="text-black">{habit.title}</span>
                        <div className="flex items-center space-x-2">
                            <progress className="w-24" value={calculateProgress(habit.days)} max="100"></progress>
                            <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded" onClick={() => handleMarkAsDone(dispatch, habit._id)}>{status[habit._id] === "loading" ? "Processing": "Mark as Done"}</button>
                            {status[habit._id] === "failed" && <span className="text-red-500">{error[habit._id]}</span>}
                            {status[habit._id] === "success" && <span className="text-green-500">Already marked as done!</span>}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
