import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';
import {ToastContainer} from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import SectionBlurWrapper from './components/SectionBlurWrapper';

function App() {
  return (
    <div className='bg-white dark:bg-gray-900 text-gray-900 dark:text-white'>
      <Navbar />
      <main className='pt-40'>
        <SectionBlurWrapper>
          <div className='mb-16'><Hero /></div>
          <div className='mb-16'><Skills /></div>
          <div className='mb-16'><Projects /></div>
          <div><Contact /></div>
        </SectionBlurWrapper>
      </main>
      <Footer />
      <ToastContainer position='top-right' />
    </div> 
  )
}

export default App