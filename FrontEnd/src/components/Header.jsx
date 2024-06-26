import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Header.css';

const Header = ({ signedIn, numberOfItems }) => {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        navigate(`/search?q=${searchQuery}`);
    };

    const profileLink = signedIn ? '/profile' : '/signin';

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
                                <a className="nav-link" href="#">Our Story</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">Skincare Blog</a>
                            </li>
                        </ul>
                        <form className="d-flex" onSubmit={handleSearchSubmit}>
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn" type="submit"><ion-icon name="search-outline"></ion-icon></button>
                        </form>
                        <a className='nav-item mx-2' href={profileLink}><ion-icon name="person-outline"></ion-icon></a>
                        <a className='nav-item mx-2' href='/basket'>
                            <div className="position-relative">
                                <ion-icon name="bag-outline"></ion-icon>
                                {numberOfItems > 0 && <span className="badge bg-dark position-absolute top-0 start-100 translate-middle">{numberOfItems}</span>}
                            </div>
                        </a>
                    </div>
                </div >
            </nav >
        </div >
    );
}

export default Header;