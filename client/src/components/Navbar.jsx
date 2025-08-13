import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavBar = () => {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  const handleLogout = () => {
    fetch('http://localhost:5000/logout', {
      credentials: 'include',
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.removeItem('isAuthenticated'); 
        setIsAuth(false); 
        window.location.href = data.redirect_to; 
      })
      .catch((err) => {
        console.error('Erro ao fazer logout:', err);
      });
  };

  return (
    <Navbar bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">PedeDieta</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Link href="/">Home</Nav.Link>
          {!isAuth && (
            <>
              <Nav.Link href="/signup">Cadastro</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
            </>
          )}
          <Nav.Link href="/dieta">Dietas</Nav.Link>
          {isAuth && <button onClick={handleLogout}>Logout</button>}
        </Nav>
      </Container>
    </Navbar>
  );
};

export default NavBar;
