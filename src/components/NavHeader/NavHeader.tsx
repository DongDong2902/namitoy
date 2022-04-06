import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import {AppItem, SocialItem} from "./Items";
import {AppLinks, LINKS, SocialLinks} from "./Links";
import {Link, useLocation} from "react-router-dom";
import useTheme from "../../theme/useTheme";
import {useAuth} from "../../context/auth";
import GoogleLogin from "react-google-login";

const CustomStyle = styled.div`
    .nav-head {
        position: relative;
        right: 0;
        left: 0;
        top: 0;
        z-index: 1030;
        
        .logo {
            width: 50px;
        }
        
        .avt {
            width: 35px;
            height: 35px;
            object-fit: cover;
            vertical-align: text-top;
        }
        
        a {
            font-size: 25px;
            color: ${({theme}) => theme.colors.text}!important;
        }
                
        .navbar-light .navbar-nav .nav-link:hover {
            opacity: .8;
            color: unset;
            border-bottom: 4px solid ${({theme}) => theme.colors.navLinks.hover};
        }
        
        .navbar {
            background-color: ${({theme}) => theme.colors.background}!important;
            box-shadow: 0 4px 18px 0 #00000023, 0 7px 10px -5px #00000033;
            
            .nav-item {
                padding 0 5px;
        
                .nav-link {  
                    color: ${({theme}) => theme.colors.navLinks.color};
                    border-bottom: 4px solid rgba(255,255,255,0);
                }
            
                a.active {
                    opacity: .8;
                    border-color: ${({theme}) => theme.colors.navLinks.active};
                }
            }
            .nav-link {  
                text-align: center;                  
            }
        }       
    }
`
const NavHeader: React.FC = () => {
    const location = useLocation();
    const {toggleTheme, isDark} = useTheme();
    const {user, logout, login} = useAuth();
    // const [input, setInput] = useState<User>({
    //     googleId: '',
    //     displayName: '',
    //     firstName: '',
    //     lastName: '',
    //     image: '',
    //     email: '',
    // });

    const [activeLinkId, setActiveLinkId] = useState<number>(() => {
        if (location.pathname === '/')
            return 1;
    })

    const handleClick = () => {
        logout();
    }

    useEffect(() => {
        const currentPage = LINKS.find(link => {
            if (location.pathname !== '/' && link.to !== '/') {
                return location.pathname.search(link.to) >= 0;
            }

            return link.to.search(location.pathname) >= 0;
        });
        if (currentPage) {
            setActiveLinkId(currentPage.id);
        } else {
            setActiveLinkId(0);
        }
    }, [location.pathname])

    const responseGoogle = (response) => {
        login({token: response.tokenId})
    }

    return (
        <CustomStyle>
            <div className="nav-head">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid me-5 ms-5">
                        <Link className="navbar-brand" to="/">
                            <img className='logo' src='/access/CheemsHeart.png' alt='logo-collection'/>
                        </Link>
                        <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                                data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                                aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"/>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav me-auto ms-auto mb-2 mb-lg-0">
                                <AppItem links={AppLinks()} activeLinkId={activeLinkId}/>
                            </ul>
                            <ul className="navbar-nav mb-2 mb-lg-0">
                                <SocialItem links={SocialLinks()} activeLinkId={activeLinkId}/>
                                {
                                    user ? (<li className="nav-item dropdown">
                                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown"
                                           role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                            <img className='avt rounded-circle' src={user.picture} alt='logo-collection'/>
                                        </a>
                                        <ul className="dropdown-menu dropdown-menu-lg-end" aria-labelledby="navbarDropdown">
                                            <li>
                                                <Link className="dropdown-item" to="/store/edit">Chỉnh sửa sextoy</Link>
                                            </li>
                                            <li>
                                                <Link className="dropdown-item" to="/store/other">Khác...</Link>
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider"/>
                                            </li>
                                            <li>
                                                <a className="dropdown-item" type='button'
                                                   onClick={handleClick}>Logout</a>
                                            </li>
                                        </ul>
                                    </li>) : (<GoogleLogin
                                        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                                        buttonText="Log in with Google"
                                        onSuccess={responseGoogle}
                                        onFailure={responseGoogle}
                                        cookiePolicy={'single_host_origin'}
                                    />)
                                }
                            </ul>
                            <div>
                                <Link className='nav-link' to='#' onClick={toggleTheme}>
                                    {isDark ? <i className="bi bi-sun"/> : <i className="bi bi-moon"/>}
                                </Link>
                            </div>
                        </div>
                    </div>
                </nav>
            </div>
        </CustomStyle>
    )
};

export default NavHeader;