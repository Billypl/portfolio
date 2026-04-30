import Wave1 from './components/waves/Wave1'
import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import style from './App.module.css'
import Timeline from './sections/Timeline'
import Projects from './sections/Projects'
import Experience from './sections/Experience'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

function App() {

  return (
    <>
      <Navbar/>
      <div className={style.mainContainer}>
        <Hero/>
        <Wave1 width="150px"/>
        <Timeline/>
        <Wave1 color='var(--dark-red)' width="150px"/>
        <Projects/>
        <Wave1 color='var(--dark-red)' width="150px"/>
        <Experience/>
        <Wave1 color='var(--dark-red)' width="150px"/>
        <Skills/>
        <Wave1 color='var(--dark-red)' width="150px"/>
        <Contact/>
        <Wave1 color='var(--dark-red)' width="150px"/>
        <Footer/>
      </div>
    </>
  )
}

export default App
// first payment do usunięcia z Wave1 color="var(--content1)" height="150px"/>