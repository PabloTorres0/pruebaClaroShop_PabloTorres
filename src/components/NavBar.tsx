import React from 'react'

const NavBar: React.FC = () => {
  return (
    <div className="mx-auto w-100">
      <nav
        className="navbar navbar-dark border-bottom border-body navbar-expand-lg"
        data-bs-theme="dark"
        // bg = "primary"
        // style={{ backgroundColor: '#1A5BA2' }}
      >
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            HOME
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  aria-current="page"
                  href="/tasks"
                >
                  TAREAS
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

export default NavBar
