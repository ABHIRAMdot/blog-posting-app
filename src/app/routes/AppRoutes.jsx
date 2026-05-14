import { BrowserRouter, Routes, Route } from "react-router-dom"

import { LoginPage } from "../../pages/auth/LoginPage"
import { BlogListPage } from "../../pages/blogs/BlogListPage"
import { AddEditBlogPage } from "../../pages/blogs/AddEditBlogPage"


import { Home } from "../../pages/home/Home"

import { SignupPage } from "../../pages/auth/SignupPage"

import { MainLayout } from "../../components/layout/MainLayout"

import { ProtectedRoute } from "./ProtectedRoute"

import { PublicRoute } from "./PublicRoute"

import { NotFound } from "../../utils/NotFound"



export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Home />} />
             
                    <Route path="/login" element= {
                        <PublicRoute>
                            <LoginPage />
                        </PublicRoute>
                        } />
                        
                    <Route path="/signup" element={
                        <PublicRoute>
                            <SignupPage />
                        </PublicRoute>   
                        } />

                </Route>


                <Route element={
                    <ProtectedRoute>
                    <MainLayout />
                    </ProtectedRoute>
                }>
                    <Route path="/blogs"  element={<BlogListPage /> } />
                    <Route path="/blogs/new" element={ <AddEditBlogPage /> } />
                    <Route path="/blogs/edit/:id"  element={ <AddEditBlogPage /> }/>
                </Route>

                <Route path="*" element={<NotFound />} />

            </Routes>
        </BrowserRouter>
    );
}