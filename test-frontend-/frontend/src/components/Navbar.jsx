// import { useState, useEffect } from 'react';
// import { Link ,useNavigate } from 'react-router-dom';

// const Navbar = () => {
//     const [scrolled, setScrolled] = useState(false);
//     const navigate = useNavigate();

//     useEffect(() => {
//         const handleScroll = () => {
//             if (window.scrollY > 10) {
//                 setScrolled(true);
//             } else {
//                 setScrolled(false);
//             }
//         };

//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     function handleSignout() {
//         localStorage.removeItem('jwt_token'); // Remove the token from local storage
//         navigate('/signin'); 
//     }


//     return (
//         <nav
//             className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 ${scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
//                 }`}
//         >
//             <div className="max-w-9xl mx-auto flex justify-between items-center">
//                 <div className="flex items-center space-x-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
//                     <Link to="/landing" className="flex items-center space-x-3 animate-fade-in cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700 transition-all duration-300" style={{ animationDelay: '0.1s' }}>
//                         <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center glow-text button-glow">
//                             <span className="text-white font-bold text-xl">I</span>
//                         </div>
//                         <span className="text-gray-400 font-semibold text-xl">Inferno</span>
//                     </Link>
//                 </div>

        

//                 <div className="flex items-center space-x-4 animate-fade-in" style={{ animationDelay: '0.3s' }}>
//                     {/* <Link 
//             to="/login" 
//             className="text-white hover:text-blue-400 transition-colors"
//           >
//             Login
//           </Link> */}
//                     {/* <Link
//                         to="/dashboard"
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         Dashboard
//                     </Link> */}
//                     <Link
//                         to="/orderhistory"
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         Order History
//                     </Link>
//                     {/* <Link
//                         to="/"
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         Sign out
//                     </Link> */}
//                     <Link
//                         to="/stocklist"
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         Stocks
//                     </Link>
//                     <Link
//                         to="/leaderboard"
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         Leaderboard
//                     </Link>
//                     <Link
//                         to="/portfolio"
//                         className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         My Portfolio
//                     </Link>


//                     <button 
//                     onClick={handleSignout}
//                     className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full button-hover-effect flex items-center justify-center"
//                     >
//                         Sign Out

//                     </button>
//                 </div>
//             </div>
//         </nav>
//     );
// };

// export default Navbar;


import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleSignout() {
    localStorage.removeItem('jwt_token');
    navigate('/signin');
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-10 ${
        scrolled ? 'bg-background/80 backdrop-blur-lg shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-9xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link
          to="/landing"
          className="flex items-center space-x-3 cursor-pointer px-3 py-2 rounded-md hover:bg-gray-700 transition-all duration-300"
        >
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
            <span className="text-white font-bold text-xl">I</span>
          </div>
          <span className="text-gray-400 font-semibold text-xl">Inferno</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-4">
          <Link
            to="/orderhistory"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            Order History
          </Link>
          <Link
            to="/stocklist"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            Stocks
          </Link>
          <Link
            to="/leaderboard"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            Leaderboard
          </Link>
          <Link
            to="/portfolio"
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            My Portfolio
          </Link>
          <button
            onClick={handleSignout}
            className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-105"
          >
            Sign Out
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 px-4 space-y-3 bg-background/80 backdrop-blur-lg shadow-md">
          <Link to="/orderhistory" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Order History</Link>
          <Link to="/stocklist" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Stocks</Link>
          <Link to="/leaderboard" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>Leaderboard</Link>
          <Link to="/portfolio" className="block text-white" onClick={() => setIsMobileMenuOpen(false)}>My Portfolio</Link>
          <button onClick={handleSignout} className="block text-white w-full text-left">Sign Out</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;