import React from "react";

export default function Header() {
  return (
    <header>
      <div className="header-inner">
        <div className="logo">CHAIR.</div>
        <nav>
          <ul>
            <li>
              <a href="/">Discover</a>
            </li>
            <li>
              <a href="/">Products</a>
            </li>
            <li>
              <a href="/">Solutions</a>
            </li>
            <li>
              <a href="/">Reach</a>
            </li>
            <li className="btn">
              <a href="/">Order</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
