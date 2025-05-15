import { useNavigate } from 'react-router-dom';

function FloatingAIButton() {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate('/ai-assistant')}
      className="md:hidden fixed bottom-4 left-4 z-50 flex items-center justify-center w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg hover:from-purple-700 hover:to-blue-700 transition-all duration-300 hover:scale-110 active:scale-95"
      aria-label="AI Stylist Assistant"
    >
      <div className="relative">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M14.243 5.757a6 6 0 10-.986 9.284 1 1 0 111.087 1.678A8 8 0 1118 10a3 3 0 01-4.8 2.401A4 4 0 1114 10a1 1 0 102 0c0-1.537-.586-3.07-1.757-4.243zM12 10a2 2 0 10-4 0 2 2 0 004 0z" clipRule="evenodd" />
        </svg>
        <span className="absolute -top-2 -right-2 animate-pulse bg-red-500 rounded-full w-3 h-3"></span>
      </div>
    </button>
  );
}

export default FloatingAIButton;