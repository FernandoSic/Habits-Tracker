interface Habit {
    _id: string;
    title: string;
    description: string;
    createdAt: string;
    progress: number;
}

type HabitsProp = {
    habits: Habit[];
}; //Definir el tipo de la prop
export default function Habits({habits}: HabitsProp) {
    return (
        <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md mt-8">
            <h1 className="text-2x1 font-bold mb-4">Habits</h1>
            <ul className="space-y-4">
                {habits.map((habit: any) => (
                    <li key={habit.id} className="flex items-center justify-between">
                        <span className="text-black">{habit.title}</span>
                        <div className="flex items-center space-x-2">
                            <progress className="w-24" value={habit.progress} max="100"></progress>
                            <button className="px-2 py-1 text-sm text-white bg-blue-500 rounded">Mark as done</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
