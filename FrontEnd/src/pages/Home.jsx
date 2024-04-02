import React from 'react';
import "./Home.css";
import ProductCard from '../components/ProductCard';

const Home = ({ productData, signedIn, user }) => {
    const firstThreeProducts = productData.length > 0 ? productData.slice(0, 3) : [];

    return (
        <>
            <div id="hero" className="container-fluid img-container">
                <div className="row">
                    <div className="col-6 cropped-image">
                        <img className="img-fluid" src="https://images.unsplash.com/photo-1581182786510-168e6bc0013d?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=3110" alt="" />
                    </div>
                    <div className="col-6 cropped-image">
                        <img className="img-fluid" src="https://images.unsplash.com/photo-1573461160327-b450ce3d8e7f?auto=format&fit=crop&q=80&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&w=3165" alt="" />
                    </div>
                </div>
                <div className="hero-content">
                    <h1 className='fs mt-5'>Discover Beauty Simplified</h1>
                    <p className="sec-font">We're dedicated to simplifying your skincare routine, bringing you a range of high-quality products to enhance your natural beauty.</p>
                    <button className="shop-btn mt-3"><a href="/shop">Shop Now</a></button>
                </div>
                <div className="divider">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 260"><path fill="#fefbf6" fillOpacity="1" d="M0,256L1440,160L1440,320L0,320Z"></path></svg>
                </div>
            </div>
            <section className='container text-center my-5'>
                <h4 className="fs">Explore Our Collections</h4>
                <p className="sec-font">find your favourites</p>
                <div className='d-flex justify-content-around flex-wrap mt-4'>
                    {firstThreeProducts.map((product, id) => (
                        <div key={product._id}>
                            <ProductCard productData={product} />
                        </div>
                    ))}
                </div>
                <button className="shop-btn mt-3"><a href="/shop">Shop All Products</a></button>
            </section>
            <section className="quiz container-fluid py-5 my-5">
                <div className="container d-flex justify-content-between align-items-center flex-wrap">
                    <div>
                        <h3 className="fs">Discover Your Perfect Skincare Routine</h3>
                        <p className="sec-font">Not sure where to start? Take our personalised skincare quiz to find products tailored just for you.</p>
                    </div>
                    <button className="shop-btn"><a href="#">Take The Quiz</a></button>
                </div>
            </section>
            <section className='container my-5'>
                <h4 className="text-center fs">Skincare Insights from the Experts</h4>
                <p className="sec-font text-center mb-5">At GlossBox, we're more than a store. We're your skincare partners, guiding you every step of the way. Join us in exploring the world of skincare, learning together, and sharing your beauty journey.</p>
                <div className="d-flex justify-content-around flex-wrap">
                    <div className="expert-help">
                        <div className="expert-help-img">
                            <img src="https://images.pexels.com/photos/14996839/pexels-photo-14996839/free-photo-of-woman-getting-a-face-massage.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        </div>
                        <div className="expert-help-desc mt-3">
                            <h4 className="fs">Expert Advice</h4>
                            <p className="sec-font-sm">Our team of skincare specialists is dedicated to bringing you the latest trends, tips, and advice. Stay informed about the best practices for glowing, healthy skin.</p>
                        </div>
                    </div>
                    <div className="expert-help">
                        <div className="expert-help-img">
                            <img src="https://images.pexels.com/photos/14920154/pexels-photo-14920154.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        </div>
                        <div className="expert-help-desc mt-3">
                            <h4 className="fs">Product Reviews</h4>
                            <p className="sec-font-sm">Read and contribute to our product reviews. Hear from customers like you who have experienced the benefits of our products firsthand.</p>
                        </div>
                    </div>
                    <div className="expert-help">
                        <div className="expert-help-img">
                            <img src="https://images.pexels.com/photos/7520462/pexels-photo-7520462.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        </div>
                        <div className="expert-help-desc mt-3">
                            <h4 className="fs">Skin Care Blog</h4>
                            <p className="sec-font-sm">Dive into our informative blog, where we share in-depth articles on skincare routines, ingredient breakdowns, and more.</p>
                        </div>
                    </div>
                    <div className="expert-help">
                        <div className="expert-help-img">
                            <img src="https://images.pexels.com/photos/4056458/pexels-photo-4056458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
                        </div>
                        <div className="expert-help-desc mt-3">
                            <h4 className="fs">Customer Stories</h4>
                            <p className="sec-font-sm">We love hearing about your GlossBox experiences. Share your journey with us and inspire others on their path to beauty.</p>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;
