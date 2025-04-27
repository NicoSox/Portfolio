import React from 'react'
import Header from '../components/Header.jsx'
import Main from '../components/Main.jsx'
import Footer from '../components/Footer.jsx'

const Home = () => {
  const alumno = {
    nombre: "Nicolas Soxkij",
    edad: 29,
    cursando: "Programacion III, Metodologia de sistemas, Ingles II, Base de datos II",
    facultad: "Universidad Tecnologica Nacional - Facultad regional Tucuman",
    lenguajes: "Java, Python, HTML, CSS, JavaScript y  MySQL server",
  }
  const { nombre, edad, cursando, facultad, lenguajes } = alumno;

  return (
    <>
      <Header alumno={alumno}/>
      <Main alumno={alumno} />
      <Footer />
    </>
  )
}
export default Home