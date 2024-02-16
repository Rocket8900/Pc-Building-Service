import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import postDetails from './data-blog.json';


const postsPerPage = 6; // Number of posts per page

const Section = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = postDetails.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(postDetails.length / postsPerPage);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container">
      <div className="row g-4">
        {currentPosts.map((post) => (
          <div key={post.id} className="col-lg-4 col-md-6 mb10">
            <div className="bloglist item">
              <div className="post-content">
                <div className="post-image">
                  <div className="d-tagline">
                    <span>games</span>
                    <span>guide</span>
                  </div>
                  <img src={post.image} alt="" />
                </div>
                <div className="post-text">
                  <div className="d-date">{post.date}</div>
                  <h4>
                    <Link to="/">{post.title}<span></span></Link>
                  </h4>
                  <p>{post.excerpt}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
        <div className="col-md-12">
          <ul className="pagination">
            <li className={currentPage === 1 ? 'disabled' : ''}>
              <Link to="" onClick={() => paginate(currentPage - 1)} disabled={currentPage === 1}>
                Prev
              </Link>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={i + 1 === currentPage ? 'active' : ''}>
                <Link to="" onClick={() => paginate(i + 1)}>
                  {i + 1}
                </Link>
              </li>
            ))}
            <li className={currentPage === totalPages ? 'disabled' : ''}>
              <Link to="" onClick={() => paginate(currentPage + 1)} disabled={currentPage === totalPages}>
                Next
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Section;
