import Header from './components/Header'
import About from './components/About'

function App() {

  return (
    <>
      <Header />

      <div className="mx-auto max-w-[1300px]">
        <section id="about" className="scroll-mt-20 pt-20 pb-20">
          <About />
        </section>
      </div>
    </>
  )
}

export default App