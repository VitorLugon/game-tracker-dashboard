import React from 'react';
import { FaWindows, FaPlaystation, FaXbox, FaApple, FaLinux, FaAndroid, FaGamepad } from 'react-icons/fa';
import { MdGamepad } from 'react-icons/md';

const getPlatformType = (slug) => {
  const normalizedSlug = typeof slug === 'string' ? slug.toLowerCase() : '';

  if (normalizedSlug.includes('playstation')) return 'playstation';
  if (normalizedSlug.includes('xbox')) return 'xbox';
  if (normalizedSlug.includes('pc') || normalizedSlug.includes('windows')) return 'pc';
  if (normalizedSlug.includes('mac')) return 'mac';
  if (normalizedSlug.includes('linux')) return 'linux';
  if (normalizedSlug.includes('nintendo')) return 'nintendo';
  if (normalizedSlug.includes('android')) return 'android';

  return 'other';
};

const getPlatformLogo = (type) => {
  if (type === 'playstation') return <FaPlaystation title="PlayStation" />;
  if (type === 'xbox') return <FaXbox title="Xbox" />;
  if (type === 'pc') return <FaWindows title="PC" />;
  if (type === 'mac') return <FaApple title="Mac" />;
  if (type === 'linux') return <FaLinux title="Linux" />;
  if (type === 'nintendo') return <FaGamepad title="Nintendo" />;
  if (type === 'android') return <FaAndroid title="Android" />;
  return <MdGamepad title="Plataforma" />;
};

const GameCard = ({
  game: { name, background_image, rating, platforms, released },
}) => {
  const uniquePlatformTypes = Array.isArray(platforms)
    ? [...new Set(platforms.map((item) => getPlatformType(item?.platform?.slug)))]
    : [];

  return (
    <div className="game-card">
      <img src={background_image || './no-game.png'} alt={name} />

      <div className="mt-4">
        <h3>{name}</h3>
      </div>

      <div className="content">
        <div className="rating">
          <img src="star.svg" alt="Star Icon" />
          <p>{typeof rating === 'number' ? rating.toFixed(1) : 'N/A'}</p>
          </div>

        <span>&bull;</span>

        <div className="flex flex-wrap gap-3 mt-2 text-light-200">
          {uniquePlatformTypes.length > 0 ? (
            uniquePlatformTypes.map((type) => (
              <span
                key={type}
                className="text-lg hover:text-white transition-colors"
                aria-label={type}
              >
                {getPlatformLogo(type)}
              </span>
            ))
          ) : (
            <span className="platform-tag">N/A</span>
          )}
        <span>&bull;</span>
        <p className='year'>{released ? released.split('-')[0] : 'N/A'}</p>
          </div>
        
      </div>
    </div>
  );
};

export default GameCard;
