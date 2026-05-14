import { useState, useEffect } from "react"

import { useParams } from "react-router-dom"

import { useNavigate } from "react-router-dom"

import { addBlog, getBlogById, updateBlog } from "../../services/blogService"

import { useAuth } from "../../context/AuthContext"

import { Button } from "../../components/ui/Button"
import { Input } from "../../components/ui/Input"
import { Textarea } from "../../components/ui/Textarea"
// import { Loader } from "../../components/ui/Loader"


import { toast } from "react-toastify";

import "./AddEditBlogPage.css";


export const AddEditBlogPage = () => {

    const [title, setTitle] = useState("")

    const [content, setContent] = useState("")

    const [loading, setLoading] = useState(false)

    const [error, setError] = useState("")

    const navigate = useNavigate()

    const { user } = useAuth();

    const { id } = useParams();

    const isEditMode = Boolean(id);


    const handleSubmit = async (e) => {
        e.preventDefault()

        setError("")

        setLoading(true)

        try {
            const blogData = { 
                title,
                content,
            };

            if (isEditMode) {
                await updateBlog(id, blogData);
                toast.success("Blog updated successfully");
            }else {
            await addBlog({
                ...blogData,
                authorId: user.uid,
                createdAt: new Date(),
            });
            toast.success("Blog added successfully");
            
         }
            navigate("/blogs");
        } catch (err) {
            setError(err.message)
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    }

    // edit- link with id -> form input shows existing values after fetch to edit
    useEffect(() => {
        if (!isEditMode) return;

        const fetchBlog = async () => {
            try {
                const blog = await getBlogById(id);

                setTitle(blog.title)

                setContent(blog.content)
            } catch (err) {
                setError(err.message)
            }
        };

        fetchBlog();
    }, [id, isEditMode])

    const buttonText = loading ? isEditMode ? "Updating..." : "Adding..."
                               :  isEditMode ? "Update Blog" : "Adding Blog";


return (
    <div className="container blog-form-page">

        <div className="blog-form-card">

            <h1>
                {isEditMode
                    ? "Edit Blog"
                    : "Create Blog"}
            </h1>

            <p className="blog-form-subtitle">

                {isEditMode
                    ? "Update your blog post"
                    : "Share your thoughts with the world"}

            </p>

            <form onSubmit={handleSubmit} className="blog-form">

                <Input
                    type="text"
                    placeholder="Enter Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <Textarea
                    placeholder="Enter Content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />

                <Button type="submit" disabled={loading}>
                    {buttonText}
                </Button>

            </form>

            {error && (
                <p className="blog-error">
                    {error}
                </p>
            )}

        </div>

    </div>
);
}