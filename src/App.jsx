import Navbar from './sections/Navbar'
import Hero from './sections/Hero'
import style from './App.module.css'



function App() {

  return (
    <>
      <Navbar/>
      <div className={style.mainContainer}>
        <Hero/>
      </div>
    </>
  )
}

export default App
// first payment do usunięcia z finance