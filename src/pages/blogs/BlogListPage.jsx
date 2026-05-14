import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { getBlogs, deleteBlogById } from "../../services/blogService"

import "./BlogListPage.css"

import { Button } from "../../components/ui/Button"
import { Loader } from "../../components/ui/Loader"

import { toast } from "react-toastify"

export const BlogListPage = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const data = await getBlogs()

                setBlogs(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        };

        fetchBlogs();
    }, []);


    if (loading) {
        return (
            <Loader text="Loading blogs..." />
        )
    }

    if (error) {
        return <h1>{error}</h1>
    }


    const handleDelete = async (id) => {

        const confirmed = window.confirm(
            "Are you sure you want to delete this blog?"
        );

        if (!confirmed) {
            return ;
        }

        try {
            await deleteBlogById(id);

            toast.success("Blog deleted successfully");

            setBlogs((prev) => prev.filter((blog) => blog.id !== id))
        } catch (err) {
            setError(err.message)
            toast.error(err.message);
        }
    }

    if (blogs.length === 0) {
        return (
            <div className="blog-empty"> 
                <h2>No blogs found</h2>

                <Link to="/blogs/new">
                    <Button> 
                        Create First Blog
                    </Button>
                </Link>
            </div>
        )
    }


    return (
        <div className="container blog-page">
    
            <div className="blog-header">
    
                <h1>Blogs</h1>
    
                <Link to="/blogs/new">
                    <Button>
                        Add Blog
                    </Button>
                </Link>
    
            </div>
    
            <div className="blog-grid">
    
                {blogs.map((blog) => (
                    <div key={blog.id} className="blog-card"> 

                        <h3>{blog.title}</h3>
    
                        <p>{blog.content}</p>
    
                        <div className="blog-actions">
    
                            <Link to={`/blogs/edit/${blog.id}`}>
                                <Button>
                                    Edit
                                </Button>
                            </Link>
    
                            <Button onClick={() => handleDelete(blog.id) }>
                                Delete
                            </Button>
    
                        </div>
    
                    </div>
    
                ))}
    
            </div>
    
        </div>
    );
}