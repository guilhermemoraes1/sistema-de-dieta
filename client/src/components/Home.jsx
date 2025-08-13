import React from 'react'

const HomePage = () => {
    return (
        <div className="home container container-main">
            <h1 className='heading'>Bem vindo ao site PedeDieta!</h1>
            <a href='/signup'><button className='btn btn-primary'>Cadastre-se</button></a>
            <a href='/login'><button className='btn btn-primary'>Login</button></a>
        </div>
    )
}

export default HomePage;