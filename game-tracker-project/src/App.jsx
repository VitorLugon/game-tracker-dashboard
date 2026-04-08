import { useEffect, useState } from 'react'
import Search from './components/Search.jsx'
import Spinner from './components/Spinner.jsx';
import GameCard from './components/GameCard.jsx';

const API_BASE_URL = 'https://api.rawg.io/api/games';

const API_KEY = import.meta.env.VITE_RAWG_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
  }
}

const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gameList, setGameList] = useState([]);
  const[isLoading, setIsLoading] = useState(false);

  const fetchGames = async()=> {
    setIsLoading(true);
    setErrorMessage('');

    try{
      const endpoint = `${API_BASE_URL}?key=${API_KEY}&ordering=-added`;
      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok){
        throw new Error('Failed to fetch games');
      }

      const data = await response.json();

      if(data.response === 'False'){
        setErrorMessage(data.Error || 'Failed to fetch games');
        setGameList([]);
        return;
      }

      setGameList(data.results || []);
      console.log(data);
    } catch (error) {
      console.error(`Error fetching games: ${error}`);
      setErrorMessage('Error fetching games. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    
    fetchGames();
  }, []);


  return (
    <main>
     
      <div className='pattern'/>

      <div className='wrapper'>
        <header>
          <img className='hero-image' src='./public/hero.png' alt='Hero Banner' />
          <h1>
            Seus próximos <span className='text-gradient'>Jogos</span> favoritos,
            filtrados pela comunidade</h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        <section className='all-games'>
            <h2 className='mt-10'>Todos os Jogos</h2>

            {isLoading ? (
              <Spinner />
            ) : errorMessage ? (
              <p className='text-red-500'>{errorMessage}</p>
            ): (
              <ul>
                {gameList.map((game)=> (
                  <GameCard key={game.id} game={game} />
                ))}
              </ul>
            )}
        </section>
        
      </div>
    </main>
  )
}

export default App
