import React from 'react'

export default function Header() {
  return (
    <header>
        <img src="logo.png" alt="My Store Logo"/>
        <span style={{fontSize: "1.5rem"}}>My Store</span>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="/" className="hover:underline">Home</a></li>
            <li><a href="/products" className="hover:underline">Products (SSR)</a></li>
            <li><a href="/posts" className="hover:underline">Posts (SSG)</a></li>
          </ul>
        </nav>
    </header>
  )
}