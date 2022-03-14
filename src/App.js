import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AuthRoute from './components/routes/AuthRoute';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import StripeSuccess from './pages/stripe-success';
import StripeCancel from './pages/stripe-cancel';
import Account from './pages/Account';
import Basic from './pages/plans/Basic';
import Standard from './pages/plans/Standard';
import Premium from './pages/plans/Premium';


function App() {
    return (
        <BrowserRouter>
            <Nav />
            <Toaster position="bottom-right" toastOptions={{
                duration: 2000
            }} />
            <Routes>
                <Route exact path="/" element={<Home />} />
                <Route exact path="/register" element={<Register />} />
                <Route exact path="/login" element={<Login />} />
                <Route path="/stripe/success" element={
                    <AuthRoute>
                        <StripeSuccess />
                    </AuthRoute>
                } />
                <Route path="/stripe/cancel" element={
                    <AuthRoute>
                        <StripeCancel />
                    </AuthRoute>
                } />
                <Route exact path="/account" element={<Account />} />
                {/* <Route path="/account" element={
                    <AuthRoute>
                        <Account />
                    </AuthRoute>
                } /> */}
                <Route path="/basic" element={
                    <AuthRoute>
                        <Basic />
                    </AuthRoute>
                } />
                <Route path="/standard" element={
                    <AuthRoute>
                        <Standard />
                    </AuthRoute>
                } />
                <Route path="/premium" element={
                    <AuthRoute>
                        <Premium />
                    </AuthRoute>
                } />
            </Routes>
        </BrowserRouter>

    );
}

export default App;
