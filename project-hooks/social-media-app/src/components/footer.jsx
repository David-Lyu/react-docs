import React from 'react';
import { Link } from 'react-router-dom'

export default function Footer() {
    return (
        <footer className="border-top text-center small text-muted py-3">
            <p>
                <Link to="/dist/index.html" className="mx-1">Home</Link> |
                <Link className="mx-1" to="/dist/index.html/about">About Us</Link> |
                <Link className="mx-1" to="/dist/index.html/terms">Terms</Link>
            </p>
            <p className="m-0">
                Copyright &copy; 2020
                <a href="/" className="text-muted">ComplexApp</a>. All rights
                    reserved.
            </p>
        </footer>
    )
}