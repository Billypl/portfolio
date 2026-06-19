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
import Hobby from './sections/Hobby'
import { LanguageProvider } from "./context/LanguageContext";
import Test from './sections/Test';

function App() {

  return (
    <>
      <LanguageProvider>
        <Navbar/>
        <div className={style.mainContainer}>
          <Test/>ddasdsa
          <Hero/>
          <Wave1 width="150px"/>
          <Experience/> {/* edu, work, github, skills */}
          <Skills/>
          <Wave1 color='var(--dark-red)' width="150px"/>
          <Projects/>
          <Wave1 color='var(--dark-red)' width="150px"/>
          <Timeline/>
          <Wave1 color='var(--dark-red)' width="150px"/>
          <Hobby/>
          <Wave1 color='var(--dark-red)' width="150px"/>
          <Contact/>
          <Wave1 color='var(--dark-red)' width="150px"/>
          <Footer/> 
        </div>
      </LanguageProvider>
    </>
  )
}

export default App