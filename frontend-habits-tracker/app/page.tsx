'use client';
import Image from "next/image";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchHabitsThunk } from "../features/habit/habitSlice";
import { RootState, AppDispatch } from "../Redux/store";
import Habits from "@/app/habits";
import { fetchRegisterUserThunk, fetchLoginUserThunk, addUser } from "../features/user/userSlice";
import { getCookie } from 'cookies-next';

export default function Home() {
  const dispatch = useDispatch<AppDispatch>(); //Dispatch de la store
  const habits = useSelector((state: RootState) => state.habits.habits);
  const user = useSelector((state: RootState) => state.user.user);
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const token = getCookie('habitToken');
    if (token){
      dispatch(addUser(token));
    }
    if (user) {
      dispatch(fetchHabitsThunk(user.toString()));
    }
  }, [dispatch, user]); 

  const handleLogin = () => {
    dispatch(fetchLoginUserThunk({username, password}));
  };


  const handleRegister = () => {
    dispatch(fetchRegisterUserThunk({username, password}));
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-8 pb-20 sm:p-20 font-sans bg-gray-100">
          {!user && (
            <div className="w-full max-w-md p-4 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold mb-4">Login / Register</h1>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Username</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
                />
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={handleLogin}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Login
                </button>
                <button
                  onClick={handleRegister}
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  Register
                </button>
              </div>
            </div>
          )}
          {user && <Habits habits={habits} />}
        </div>
      );
}
