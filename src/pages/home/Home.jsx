import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"


import "./Home.css"

export const Home = () => {

    const { user } = useAuth();

  return (
    <section className="home">
      <div className="container home-content">

        <div className="home-text">
          <h1>Share Your Ideas With The World</h1>

          <p>
            A simple modern blogging platform built with
            React and Firebase.
          </p>


          <div className="home-buttons">

            {!user ? (

             <>
                <Link to="/login" className="primary-btn">
                    Login
                </Link>

                <Link to="/signup" className="secondary-btn">
                    Create Account
                </Link>
             </>
            ): (
              <>
                <Link to="/blogs" className="primary-btn">
                    Go To Blogs
                </Link>

                <Link to="/blogs/new" className="secondary-btn">
                    Create Post
                </Link>                
                
              </>
            )}

          </div>


        </div>

      </div>
    </section>
  )
}

