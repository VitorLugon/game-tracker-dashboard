import Search from './components/Search.jsx'
import { useState } from 'react'

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <main>
     
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img className='hero-image' src='./public/hero.png' alt='Hero Banner' />
          <h1>
            Seus próximos <span className='text-gradient'>Jogos</span> favoritos,
            filtrados pela comunidade</h1>
        </header>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h1 className='text-white'>{searchTerm}</h1>
      </div>
    </main>
  )
}

export default App
