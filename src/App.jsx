import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import style from './App.module.css'
import Timeline from './sections/Timeline'



function App() {

  return (
    <>
      <Navbar/>
      <div className={style.mainContainer}>
        <Hero/>
        <Timeline/>
      </div>
    </>
  )
}

export default App
// first payment do usunięcia z finance