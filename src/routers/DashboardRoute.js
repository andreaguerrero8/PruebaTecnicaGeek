import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import CardsIngrediente from '../components/CardsIngrediente';
import Home from '../components/Home';
import NavBars from '../components/NavBars';



const DashboardRoute = () => {
    return (
       
             <>
            <NavBars/>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/add" element={<CardsIngrediente/>} />
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </>
    
    );
};

export default DashboardRoute;