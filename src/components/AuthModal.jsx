import React, { useState } from 'react';
import { X, User as UserIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button, Input } from './common';

export const AuthModal = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, loginUser, registerUser } = useCart();


  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);


  const [regFirstName, setRegFirstName] = useState('');
  const [regLastName, setRegLastName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');

  if (!isAuthModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await loginUser(loginEmail, loginPassword);
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await registerUser(regFirstName, regLastName, regEmail, regPassword);
    } catch {

    } finally {
      setLoading(false);
    }
  };

  const fillDemoUser = () => {
    setLoginEmail('alexander@monzato.com');
    setLoginPassword('user123');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6">

      <div
        onClick={() => setIsAuthModalOpen(false)}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />


      <div className="relative bg-white max-w-3xl w-full shadow-2xl overflow-hidden z-10 p-6 sm:p-10 my-8">


        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 text-neutral-400 hover:text-black transition-colors p-1 cursor-pointer"
          aria-label="Close modal"
        >
          <X size={20} />
        </button>


        <div className="bg-neutral-100 p-3 mb-6 flex flex-wrap items-center justify-between gap-2 border border-neutral-200">
          <span className="text-[11px] font-bold tracking-wider uppercase text-neutral-600">
            DEMO QUICK LOGIN:
          </span>
          <div>
            <Button
              type="button"
              variant="primary"
              size="sm"
              icon={UserIcon}
              onClick={fillDemoUser}
              className="text-[10px] py-1 px-3"
            >
              FILL DEMO USER
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative">


          <div className="hidden md:block absolute left-1/2 top-2 bottom-2 -translate-x-1/2 w-[1px] bg-neutral-200" />


          <div className="space-y-6">
            <h2 className="text-xl font-bold tracking-[0.15em] text-neutral-900 uppercase text-center md:text-left">
              LOGIN
            </h2>

            <form onSubmit={handleLoginSubmit} className="space-y-5">
              <Input
                label="EMAIL ADDRESS*"
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                placeholder="admin@monzato.com or alexander@monzato.com"
                uppercase={false}
              />

              <Input
                label="PASSWORD*"
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                placeholder="••••••••"
                uppercase={false}
              />

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="rememberMe"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-neutral-950 border-neutral-300 rounded-none focus:ring-0 cursor-pointer"
                />
                <label htmlFor="rememberMe" className="text-[11px] font-bold tracking-wider text-neutral-700 uppercase cursor-pointer select-none">
                  REMEMBER ME
                </label>
              </div>

              <div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                >
                  {loading ? 'LOGGING IN...' : 'LOG IN'}
                </Button>
              </div>
            </form>
          </div>


          <div className="space-y-6 pt-6 md:pt-0 border-t md:border-t-0 border-neutral-200">
            <h2 className="text-xl font-bold tracking-[0.15em] text-neutral-900 uppercase text-center md:text-left">
              REGISTER
            </h2>

            <form onSubmit={handleRegisterSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="FIRST NAME"
                  type="text"
                  required
                  value={regFirstName}
                  onChange={(e) => setRegFirstName(e.target.value)}
                />
                <Input
                  label="LAST NAME"
                  type="text"
                  required
                  value={regLastName}
                  onChange={(e) => setRegLastName(e.target.value)}
                />
              </div>

              <Input
                label="EMAIL ADDRESS*"
                type="email"
                required
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                uppercase={false}
              />

              <Input
                label="PASSWORD*"
                type="password"
                required
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                uppercase={false}
              />

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  isLoading={loading}
                >
                  {loading ? 'REGISTERING...' : 'REGISTER'}
                </Button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
