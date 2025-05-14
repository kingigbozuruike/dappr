import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaGoogle, FaApple, FaFacebook, FaEye, FaEyeSlash, FaCheck } from 'react-icons/fa';

const tiers = [
  {
    name: 'Basic',
    price: 'Free',
    perks: [
      'Basic access to platform',
      'Earn points for recycling',
      'Access to community forum',
    ],
  },
  {
    name: 'Plus',
    price: '$4.99/mo',
    perks: [
      'All Free perks',
      'Bonus points on recycling',
      'Early access to new features',
      'Priority support',
    ],
  },
  {
    name: 'Pro',
    price: '$9.99/mo',
    perks: [
      'All Plus perks',
      'Exclusive rewards',
      'Invitations to special events',
      'Personalized sustainability reports',
    ],
  },
];

function AuthPage({ setIsSignedIn }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('signin'); // 'signin' or 'signup'
  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [selectedTier, setSelectedTier] = useState('Free');
  const [loading, setLoading] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (mode === 'signup') {
      if (!form.name.trim()) newErrors.name = 'Name is required.';
    }
    if (!form.email.trim()) newErrors.email = 'Email is required.';
    else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) newErrors.email = 'Invalid email address.';
    if (!form.password) newErrors.password = 'Password is required.';
    else if (form.password.length < 6) newErrors.password = 'Password must be at least 6 characters.';
    if (mode === 'signup' && form.confirmPassword !== form.password) newErrors.confirmPassword = 'Passwords do not match.';
    return newErrors;
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: undefined });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setShowCheck(false);
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      setSuccess(false);
      setLoading(false);
    } else {
      // Simulate async
      await new Promise(res => setTimeout(res, 1200));

      // Create and store a mock auth token
      const mockToken = `mock-token-${Date.now()}`;
      localStorage.setItem('authToken', mockToken);
      localStorage.setItem('userName', form.name || 'Jane Doe');
      localStorage.setItem('userEmail', form.email);

      setSuccess(true);
      setLoading(false);
      setShowCheck(true);
      setIsSignedIn(true);

      setTimeout(() => setShowCheck(false), 1500);
      setTimeout(() => navigate('/'), 1500);
      setForm({ name: '', email: '', password: '', confirmPassword: '' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 pt-32">
      <div className={`flex ${mode === 'signup' ? 'flex-col md:flex-row gap-8 max-w-6xl' : 'max-w-md'} w-full`}>
        {/* Sign in/up form card */}
        <div className={`bg-white p-8 rounded-lg shadow-lg ${mode === 'signup' ? 'w-full md:w-1/2 flex-shrink-0' : 'w-full'}`}>
          <h2 className="text-2xl font-bold mb-6 text-center">{mode === 'signin' ? 'Sign In' : 'Sign Up'}</h2>
          {success && <div className="mb-4 text-green-600 text-center font-medium">{mode === 'signin' ? 'Sign in successful!' : 'Sign up successful! Welcome to Dappr.'}</div>}
          <form onSubmit={handleSubmit}>
            {mode === 'signup' && (
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  autoComplete="name"
                />
                {errors.name && <div className="text-red-500 text-sm mt-1" aria-live="polite">{errors.name}</div>}
              </div>
            )}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-1">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                autoComplete="email"
              />
              {errors.email && <div className="text-red-500 text-sm mt-1" aria-live="polite">{errors.email}</div>}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 mb-1">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
                  onClick={() => setShowPassword((v) => !v)}
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <div className="text-red-500 text-sm mt-1" aria-live="polite">{errors.password}</div>}
            </div>
            {mode === 'signup' && (
              <div className="mb-6">
                <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-black ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-black focus:outline-none cursor-pointer"
                    onClick={() => setShowConfirmPassword((v) => !v)}
                    tabIndex={-1}
                    aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
                {errors.confirmPassword && <div className="text-red-500 text-sm mt-1" aria-live="polite">{errors.confirmPassword}</div>}
              </div>
            )}
            {mode === 'signin' && (
              <div className="mb-6 flex justify-between items-center text-sm">
                <span>
                  Don&apos;t have an account?{' '}
                  <button type="button" className="text-black font-semibold hover:underline cursor-pointer" onClick={() => { setMode('signup'); setSuccess(false); setErrors({}); }}>
                    Sign up
                  </button>
                </span>
                <button type="button" className="text-gray-600 hover:underline cursor-pointer" onClick={() => alert('Forgot password flow coming soon!')}>
                  Forgot password?
                </button>
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded border border-gray-500 hover:bg-white hover:text-black transition duration-300 font-semibold cursor-pointer mb-4 flex items-center justify-center gap-2"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin h-5 w-5 mr-2 text-black" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g>
                      <rect x="10" y="2" width="4" height="8" rx="2" fill="currentColor"/>
                      <rect x="10" y="14" width="4" height="8" rx="2" fill="#fff"/>
                    </g>
                  </svg>
                  Signing {mode === 'signin' ? 'In' : 'Up'}...
                </span>
              ) : showCheck ? (
                <span className="flex items-center justify-center text-green-600">
                  <FaCheck className="mr-2" /> Success!
                </span>
              ) : (
                mode === 'signin' ? 'Sign In' : 'Sign Up'
              )}
            </button>
          </form>
          {/* Social sign in/up */}
          <div className="flex flex-col space-y-3 mb-4">
            <button className="flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <FaGoogle className="mr-2 text-lg" /> Continue with Google
            </button>
            <button className="flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <FaApple className="mr-2 text-lg" /> Continue with Apple
            </button>
            <button className="flex items-center justify-center border border-gray-300 rounded py-2 hover:bg-gray-100 transition-colors cursor-pointer">
              <FaFacebook className="mr-2 text-lg text-blue-600" /> Continue with Facebook
            </button>
          </div>
          
          {mode === 'signup' && (
            <div className="mt-4 md:hidden">
              <button 
                type="button" 
                onClick={() => {
                  const tierSection = document.getElementById('tier-section');
                  if (tierSection) tierSection.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-2 px-4 bg-gray-100 text-black rounded border border-gray-300 hover:bg-gray-200"
              >
                View Account Tiers
              </button>
            </div>
          )}
        </div>
        
        {/* Account tiers card - only shown for signup */}
        {mode === 'signup' && (
          <div id="tier-section" className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/2 flex-shrink-0">
            <h3 className="text-xl font-bold mb-4 text-center">Choose Your Account Tier</h3>
            <div className="grid grid-cols-1 gap-4">
              {tiers.map((tier) => {
                const isPlus = tier.name.toLowerCase() === 'plus';
                const isPro = tier.name.toLowerCase() === 'pro';
                const isBasic = tier.name.toLowerCase() === 'basic' || tier.name.toLowerCase() === 'free';
                const isSelected = selectedTier === tier.name;
                return (
                  <div
                    key={tier.name}
                    tabIndex={0}
                    onKeyDown={e => {
                      if (e.key === 'Enter' || e.key === ' ') setSelectedTier(tier.name);
                    }}
                    className={`border rounded-lg p-4 shadow-sm transition-all duration-200 cursor-pointer transform
                      ${isBasic && 'hover:scale-105'}
                      ${isPlus && (isSelected ? 'bg-red-400 bg-opacity-80 backdrop-blur-md backdrop-saturate-150 scale-105' : 'hover:bg-red-400 hover:bg-opacity-80 hover:backdrop-blur-md hover:backdrop-saturate-150 hover:scale-105')}
                      ${isPro && (isSelected ? 'bg-blue-600 bg-opacity-80 backdrop-blur-md backdrop-saturate-150 scale-105' : 'hover:bg-blue-600 hover:bg-opacity-80 hover:backdrop-blur-md hover:backdrop-saturate-150 hover:scale-105')}
                      ${isSelected ? 'scale-105 ring-2 ring-black' : ''}
                      ${isPlus && (isSelected || false) ? 'text-white' : ''}
                      ${isPro && (isSelected || false) ? 'text-white' : ''}
                    `}
                    onClick={() => setSelectedTier(tier.name)}
                  >
                    <div className={`flex items-center justify-between mb-2
                      ${((isPlus || isPro) && (isSelected || false)) ? 'text-white' : 'text-black'}
                    `}>
                      <span className="font-bold text-lg">{tier.name}</span>
                      <span className={`font-semibold ${((isPlus || isPro) && (isSelected || false)) ? 'text-white' : 'text-black'}`}>{tier.price}</span>
                    </div>
                    <ul className={`list-disc list-inside text-sm
                      ${((isPlus || isPro) && (isSelected || false)) ? 'text-white' : 'text-gray-700'}`}
                    >
                      {tier.perks.map((perk, i) => (
                        <li key={i}>{perk}</li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthPage;