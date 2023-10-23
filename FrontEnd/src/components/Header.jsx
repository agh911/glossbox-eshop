import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <div>
            <nav id='header' className="navbar navbar-expand-lg">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">glossbox</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <a className="nav-link" aria-current="page" href="/">Home</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/shop">Shop</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/about">Our Story</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="/blog">Skincare Blog</a>
                            </li>
                        </ul>
                        <form className="d-flex" role="search">
                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                            <button className="btn" type="submit"><ion-icon name="search-outline"></ion-icon></button>
                        </form>
                        <button className="btn"><ion-icon name="person-outline"></ion-icon></button>
                        <button className="btn"><ion-icon name="bag-outline"></ion-icon></button>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;