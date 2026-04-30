import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import style from './App.module.css'
import Timeline from './sections/Timeline'
import Wave1 from './components/Wave1'



function App() {

  return (
    <>
      <Navbar/>
      <div className={style.mainContainer}>
        <Hero/>
        <Wave1 color="red" width="150px"/>
        <Timeline/>
      </div>
    </>
  )
}

export default App
// first payment do usunięcia z Wave1 color="var(--content1)" height="150px"/>