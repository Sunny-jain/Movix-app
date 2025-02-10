import React, { useEffect, useState } from "react";
import "./header.scss";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../images/movix-logo.svg";
import "./header.scss";
import ContentWrapper from "../contentWrapper/contentWrapper";

export default function Header() {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [query, setQuery] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location])
  

  const controlNavbar = () => {
    // console.log(window.scrollY);
    if (window.scrollY > 300) {
      if (window.scrollY > lastScrollY && mobileMenu === false) {
        setShow("hide");
      } else {
        setShow("show");
      }
      setLastScrollY(window.scrollY);
    } else {
      setShow("top");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const openMobileMenu = () => {
    setMobileMenu(!mobileMenu);
    setShowSearch(false);
  };

  const Opensearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const searchQueryHandle = (event) => {
    if (event.key === "Enter" && query.length !== 0) {
      navigate("/search/" + query);
    }
  };

  const handleQueryValue = (event) => {
    setQuery(event.target.value);
    // console.log(query);
  };

  const navigateHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt="movix" onClick={() => {navigate("/")}}/>
        </div>
        <ul className="menuItems">
          <li
            className="menuItem"
            onClick={() => {
              navigateHandler("movie");
            }}
          >
            Movies
          </li>
          <li
            className="menuItem"
            onClick={() => {
              navigateHandler("tv");
            }}
          >
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={Opensearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={Opensearch} />
          {!mobileMenu ? (
            <SlMenu onClick={openMobileMenu} />
          ) : (
            <VscChromeClose onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movies or TV shows..."
              onChange={handleQueryValue}
              onKeyUp={searchQueryHandle}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </header>
  );
}
