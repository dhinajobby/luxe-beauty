/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";
import { 
  Sparkles, 
  Search, 
  Heart, 
  ShoppingBag, 
  ArrowRight, 
  PlayCircle, 
  ExternalLink, 
  ChevronRight, 
  Video, 
  Image as ImageIcon, 
  Verified, 
  CheckCircle, 
  HelpCircle, 
  Globe, 
  Mail, 
  Phone,
  Play,
  Bookmark,
  Filter,
  ChevronLeft,
  Sun,
  CloudSun,
  Moon,
  Wand2,
  Camera,
  Upload,
  RefreshCw,
  Download,
  Star,
  MapPin,
  Navigation,
  Clock,
  Layers,
  Droplets,
  Calendar as CalendarIcon,
  History,
  Video as VideoIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Page, Product, Video as VideoType, Mentor } from './types';
import { PRODUCTS, VIDEOS, MENTORS } from './constants';

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (page: Page) => void, currentPage: Page }) => (
  <header className="sticky top-0 z-50 bg-bg-light/80 backdrop-blur-md border-b border-primary/10">
    <div className="max-w-7xl mx-auto px-6 lg:px-12">
      <div className="flex items-center justify-between h-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <Sparkles className="w-6 h-6" />
          </div>
          <h1 className="text-xl font-extrabold tracking-tighter uppercase">Luxe Beauty</h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-10">
          <button 
            onClick={() => onNavigate('home')}
            className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${currentPage === 'home' ? 'text-primary' : ''}`}
          >SHOP</button>
          <button className="text-sm font-semibold tracking-wide hover:text-primary transition-colors">ABOUT</button>
          <button 
            onClick={() => onNavigate('shade-matcher')}
            className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${currentPage === 'shade-matcher' || currentPage === 'shade-result' ? 'text-primary' : ''}`}
          >SHADE MATCHER</button>
          <button 
            onClick={() => onNavigate('tutorials')}
            className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${currentPage === 'tutorials' || currentPage === 'booking' ? 'text-primary' : ''}`}
          >TUTORIALS</button>
          <button 
            onClick={() => onNavigate('virtual-try-on')}
            className={`text-sm font-semibold tracking-wide hover:text-primary transition-colors ${currentPage === 'virtual-try-on' ? 'text-primary' : ''}`}
          >TRY-ON</button>
        </nav>

        <div className="flex items-center gap-4 lg:gap-6">
          <div className="relative hidden sm:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input 
              className="pl-10 pr-4 py-2 bg-primary/5 border-none rounded-full text-sm focus:ring-1 focus:ring-primary w-48 lg:w-64" 
              placeholder="Search essentials..." 
              type="text"
            />
          </div>
          <button className="p-2 hover:bg-primary/10 rounded-full transition-colors relative">
            <Heart className="w-6 h-6" />
          </button>
          <button className="p-2 bg-primary text-white rounded-full transition-colors shadow-lg shadow-primary/20">
            <ShoppingBag className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="max-w-7xl mx-auto px-6 lg:px-12 py-12 border-t border-primary/10 mt-20">
    <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <Sparkles className="text-primary w-6 h-6" />
          <h2 className="text-lg font-extrabold tracking-tighter uppercase">Luxe Beauty</h2>
        </div>
        <p className="text-slate-500 max-w-xs text-sm">
          Premium cosmetics designed for every skin tone. Clean, cruelty-free, and dermatologically tested.
        </p>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-12">
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Shop</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-500">
            <li><a className="hover:text-primary transition-colors" href="#">Face</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Eyes</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Lips</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Tools</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Info</h4>
          <ul className="flex flex-col gap-3 text-sm text-slate-500">
            <li><a className="hover:text-primary transition-colors" href="#">Shipping</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Returns</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Sustainability</a></li>
            <li><a className="hover:text-primary transition-colors" href="#">Stockists</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-sm uppercase tracking-widest mb-6">Connect</h4>
          <div className="flex gap-4 text-slate-500">
            <Globe className="w-5 h-5 hover:text-primary cursor-pointer" />
            <Mail className="w-5 h-5 hover:text-primary cursor-pointer" />
            <Phone className="w-5 h-5 hover:text-primary cursor-pointer" />
          </div>
        </div>
      </div>
    </div>
    <div className="pt-8 border-t border-primary/5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-400">
      <div className="flex gap-6">
        <a className="hover:text-primary" href="#">Privacy Policy</a>
        <a className="hover:text-primary" href="#">Terms of Service</a>
      </div>
    </div>
  </footer>
);

// --- Views ---

const HomeView = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-7xl mx-auto px-6 lg:px-12 py-8"
  >
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuD1-kl2XJyKNeXkQh9DxiU8Teff9PPFywzzgiXMBFyeIeqq28EeIiPhwdoyb72r5itOYsKN-oKD-xMzUEkH1LCv7xyXrJCv2Ek9ild8Vl5docdyEC0gqtxHpHnTmoaHNbH66EcEAUCvJ0sWNmNhtJalsNovrhXsJCRwf0s5dqNjG_UmnUoLw3tXDtPxgg0Mnxqx40NP6nxOcTqSLTaTKooGMEFChDvwwIsnQ79ah4ghH9wr7DoELKJRL_EtWh-dZS-qxt3OkDC-v9Q')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full">
          <h2 className="text-white text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">Find Your <br/>Perfect Match</h2>
          <p className="text-white/80 text-lg mb-8 max-w-sm">Our AI-powered shade finder matches your unique skin tone in seconds.</p>
          <button 
            onClick={() => onNavigate('shade-matcher')}
            className="bg-primary text-white px-8 py-4 rounded-full font-bold text-base tracking-wide hover:scale-105 transition-transform flex items-center gap-2"
          >
            Find Your Shade
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="group relative aspect-[4/5] overflow-hidden rounded-xl bg-slate-200">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAsn_KfkofYKI4KxeG_LpCUTXGEezgw0F-wrDzoswgUmyH99-fPIoDUxHj5eeQquctN8nLuUAd6ENLKMNmXyeZpS4LA4OHX5V22uMSRH2eQ0cUYrfnDY_CqyphKPbRBNGLTdqpT0miYWg7MxwDtbbF7JzMO06Ku07ZxzyKkMF5SgletVJgnycuVpRmo9iLXg3Yj5AUGyV-HOcy7ml4oYQK5v7A1usj1IJgRBl9Ylt3UWo1meNiirHNvGHXrZIKyAdP3EPAwCrSRGcA')" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 lg:p-12 w-full">
          <h2 className="text-white text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">Master <br/>Your Look</h2>
          <p className="text-white/80 text-lg mb-8 max-w-sm">Editorial step-by-step guides for the modern minimalist aesthetic.</p>
          <button 
            onClick={() => onNavigate('tutorials')}
            className="bg-white text-slate-900 px-8 py-4 rounded-full font-bold text-base tracking-wide hover:scale-105 transition-transform flex items-center gap-2"
          >
            Watch Tutorials
            <PlayCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>

    <section className="mb-20">
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-primary font-bold text-sm tracking-widest uppercase mb-2 block">Curation</span>
          <h2 className="text-3xl font-extrabold">Featured Essentials</h2>
        </div>
        <a className="text-primary font-bold hover:underline flex items-center gap-1" href="#">
          Shop All
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>
      
      <div className="flex overflow-x-auto gap-6 pb-8 hide-scrollbar">
        {PRODUCTS.map(product => (
          <div key={product.id} className="min-w-[280px] lg:min-w-[320px] group cursor-pointer">
            <div className="aspect-[3/4] rounded-xl overflow-hidden bg-white mb-4 relative">
              <div className="absolute top-4 right-4 z-10">
                <button className="w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <img 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                src={product.image}
              />
            </div>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-lg">{product.name}</h3>
                <p className="text-slate-500 text-sm">{product.description}</p>
              </div>
              <p className="font-extrabold text-primary">₹{product.price}</p>
            </div>
            <button 
              onClick={() => window.open(product.affiliateLink, '_blank')}
              className="mt-4 w-full py-3 border border-primary/20 rounded-full font-bold text-sm hover:bg-primary hover:text-white transition-colors"
            >
              Add to Bag
            </button>
          </div>
        ))}
      </div>
    </section>

    <section className="bg-primary/5 rounded-xl p-8 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12">
      <div className="max-w-md">
        <h2 className="text-3xl font-extrabold mb-4">Join Our Community</h2>
        <p className="text-slate-600 text-lg mb-8">Get early access to new launches, shade matching tips, and exclusive tutorial content.</p>
        <div className="flex flex-col sm:flex-row gap-3">
          <input 
            className="flex-1 px-6 py-4 rounded-full bg-white border-none focus:ring-2 focus:ring-primary shadow-sm" 
            placeholder="Your email address" 
            type="email"
          />
          <button className="bg-primary text-white px-8 py-4 rounded-full font-bold hover:brightness-110 transition-all">Subscribe</button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-xl bg-slate-200 overflow-hidden shadow-xl">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBJDn-SZx8VM3KwiOT8gX7rIRM0t7eu1FacFBzOAy0qU0IXvUd9UdrgYRVNEYGsQ6h7TFOsAQ7MOT9owqARD2HfdvX_-7g3G4hgkG36UYsycCfRzzpXkcI64oTtNelhXQo5EcAzINDbK-ib20onUjANlD7M5uW2DiPpjgGF6u_MnwnX-6yfAYEP9oKqWgZ4y-1JtKQ9S-MXsxkv9Gi-EuXqeTCmELXg9h2i0k1Rrm5Zzj6pfd5ECVsIyD4MCUqXCqtvceP6ZumRx0c" />
        </div>
        <div className="w-32 h-32 lg:w-40 lg:h-40 rounded-xl bg-slate-200 overflow-hidden shadow-xl mt-8">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDaCPEd4hF0nyiLx8qVDUdS1xy72VOwPaKmrWBlFh3ErkX483VDHVnuD6TQ2gIvvf-1mbd1oR20CPPBqOetyGJozknRILZI_5rUapSFOEduzdkHt4LhhildCyAjH8QV9C968A1Xt7LATi2ApyNkC5nZ8fcPHa-NnfSDR4G-uAPDd6hq44Pu9grZQnMp5msPZVvgHbT2IpeoYPg-Hi9COkZrE_zKlpiQiQ-GpAz3vFpZIbEeKJoBL7frEh6HsDW0xgAyLpYHQeEwW6A" />
        </div>
      </div>
    </section>
  </motion.div>
);

const ShadeMatcherView = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: 20 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -20 }}
    className="max-w-6xl mx-auto px-6 py-10"
  >
    <nav className="mb-12 flex items-center gap-2 text-sm font-medium">
      <button onClick={() => onNavigate('home')} className="text-slate-500 hover:text-primary transition-colors">Home</button>
      <ChevronRight className="w-4 h-4 text-slate-400" />
      <span className="text-slate-900">Shade Matcher</span>
    </nav>

    <div className="mb-16 text-center md:text-left">
      <h2 className="mb-4 text-4xl md:text-6xl font-black tracking-tight text-slate-900 lg:max-w-3xl leading-[1.1]">
        Find Your <span className="text-primary italic">Perfect</span> Foundation Match
      </h2>
      <p className="max-w-2xl text-lg font-medium text-slate-500">
        Our advanced AI skin analysis technology ensures a precise match for every tone and undertone. Choose your preferred method to begin your journey to flawless skin.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
      <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white p-2 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-soft">
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCz_lrx6UehGSAnmoA7E20pn7H81IVBrX-hbwL6fcrz9eEN_5qDszMWfbbwlz-PKZJ2dr1KE0zMwxquNO4hQ5br1zsByEPgRdLU8GdnPsq3eRyew7QruztShFonb9a9QnrPxw6Yg3--J4U_MTZkks6BA-wkgRasl55Ih_qpCsYuLBXDk7hgOs-6kuz-afptNtylGt85nH8IBGHvHoChv3hpWXTB2_M-wKkMKM5Qx_tGGnPJZ4PnhBnVl1NyU6r3h7JWA2ft3AUAE-I" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white animate-pulse">
            <VideoIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-primary">Real-Time</span>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-slate-900">Open Camera</h3>
          <p className="mb-8 text-slate-500 leading-relaxed">
            Get an instant match using your device's camera. Our AI detects your skin tone and undertones in real-time under varying light conditions.
          </p>
          <button 
            onClick={() => onNavigate('shade-result')}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-primary py-4 text-center font-bold text-white transition-all hover:bg-primary/90 hover:shadow-lg active:scale-95"
          >
            <Sparkles className="w-5 h-5" />
            Start Live Scan
          </button>
        </div>
      </div>

      <div className="group relative flex flex-col overflow-hidden rounded-xl bg-white p-2 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary/10">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg bg-neutral-soft">
          <img className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDXwz6giQ9ZsBFXJ0jPWvyOesi6dEmlt8XQa6X9mkrtx_ZNG6_QmkPYh7d9zNK9TcCFcIgbXT5IMga2NJTknBmlJPPfBDmu84XCsnNGKZdSkEsQM4yxLDZB9mt2EZu7M5eVbOjq6HcWJwSaCTNsDEXULkptXMpO9OuytlqhULO8HxOg7ZqkwoZNwrsal52stRsNl80nwI3kLlpwN8ncFMOCr6YTKSrl5PzKWosLeIGyIxr5N0rl4q1UhFD1colGrJz1d1jXHh40780" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-primary">
            <ImageIcon className="w-5 h-5" />
          </div>
        </div>
        <div className="p-8">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-900">Precise Analysis</span>
          </div>
          <h3 className="mb-3 text-2xl font-bold text-slate-900">Upload Photo</h3>
          <p className="mb-8 text-slate-500 leading-relaxed">
            Upload a high-resolution selfie for a deep image analysis. Best for users who want to review specific matches from their curated library.
          </p>
          <button 
            onClick={() => onNavigate('shade-result')}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-slate-100 py-4 text-center font-bold text-slate-900 transition-all hover:bg-slate-200 hover:shadow-lg active:scale-95"
          >
            <ImageIcon className="w-5 h-5" />
            Choose from Library
          </button>
        </div>
      </div>
    </div>

    <div className="mx-auto flex max-w-4xl flex-col items-center gap-8 rounded-xl bg-primary/5 p-10 text-center">
      <div className="flex flex-col items-center">
        <Verified className="mb-4 w-10 h-10 text-primary" />
        <h4 className="mb-2 text-xl font-bold text-slate-900">How our AI works</h4>
        <p className="max-w-lg text-sm text-slate-500">
          Our proprietary algorithm analyzes over 10,000 unique skin tones across different ethnicities to provide 99.8% matching accuracy. We prioritize your privacy—all image processing happens locally or is encrypted.
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-8">
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-900">Dermatologist Tested</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-900">All Skin Types</span>
        </div>
        <div className="flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          <span className="text-xs font-bold uppercase tracking-widest text-slate-900">No Privacy Logs</span>
        </div>
      </div>
    </div>
  </motion.div>
);

const ShadeResultView = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 1.05 }}
    className="max-w-7xl mx-auto px-6 py-12"
  >
    <nav className="flex items-center gap-2 text-xs font-medium text-slate-500 mb-8 uppercase tracking-widest">
      <button onClick={() => onNavigate('home')} className="hover:text-primary">Home</button>
      <ChevronRight className="w-3 h-3" />
      <button onClick={() => onNavigate('shade-matcher')} className="hover:text-primary">Shade Finder</button>
      <ChevronRight className="w-3 h-3" />
      <span className="text-slate-900">Your Result</span>
    </nav>

    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
      <div className="lg:col-span-7 space-y-8">
        <section className="bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5">
          <div className="p-8 md:p-12 flex flex-col md:flex-row gap-10 items-center">
            <div className="relative group">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-xl shade-swatch-gradient shadow-2xl overflow-hidden flex items-center justify-center relative">
                <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
              </div>
              <div className="absolute -top-4 -right-4 bg-primary text-white text-[10px] font-bold uppercase tracking-tighter px-4 py-2 rounded-full shadow-lg">
                Perfect Match
              </div>
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-primary font-bold text-sm uppercase tracking-widest mb-2">We found your match!</h2>
              <h3 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Honey Beige 120</h3>
              <p className="text-slate-600 text-lg leading-relaxed mb-8">
                A luminous, second-skin foundation with <strong>warm peach undertones</strong>. Designed to melt seamlessly into your complexion for a natural glow.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <button 
                  onClick={() => window.open(PRODUCTS[0].affiliateLink, '_blank')}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center gap-2"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Add to Bag — ₹3,499
                </button>
                <button 
                  onClick={() => onNavigate('booking')}
                  className="bg-primary/10 text-primary px-8 py-4 rounded-full font-bold hover:bg-primary/20 transition-all flex items-center gap-2"
                >
                  <CalendarIcon className="w-5 h-5" />
                  Book Consultation
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-100 bg-slate-50/50 p-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Droplets className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Finish</p>
                <p className="font-bold text-slate-900">Dewy & Radiant</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-slate-200 sm:border-l sm:pl-6">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Layers className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Coverage</p>
                <p className="font-bold text-slate-900">Medium-to-Full</p>
              </div>
            </div>
            <div className="flex items-start gap-4 border-slate-200 sm:border-l sm:pl-6">
              <div className="bg-white p-2 rounded-lg shadow-sm">
                <Verified className="text-primary w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Wear Time</p>
                <p className="font-bold text-slate-900">12-Hour Stay</p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-primary/5 rounded-xl p-8 flex flex-col md:flex-row items-center gap-8 border border-primary/10">
          <div className="w-full md:w-48 aspect-video md:aspect-square rounded-lg overflow-hidden relative group cursor-pointer">
            <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcXso3f71xgA0sD399NGbsN-JIdXu5oeMiaK2iUP8JQ7quJhJENYwBPjINJR2NrfY51hsSPOeUY66rDJ0u41-HZEk5JaXHqi_vpvIReKAMYHXNNaQL1aIKD7IYcB8YtWrbX8IOGDNLcpSG3p1gE8Qd1eiBhNDY3J59KNf0vz1d9fT4awxrrnH1rzgg9F5UDQvHebH-GX79PDSRmy5rQYFS2UDv6_L182iynp1rygKAfGr4tkJhogZ0d1pvhQa7TOr3OAEECiXWBok" />
            <div className="absolute inset-0 bg-black/20 flex items-center justify-center group-hover:bg-black/30 transition-colors">
              <PlayCircle className="text-white w-12 h-12" />
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <h4 className="text-xl font-bold mb-2">Master Your Match</h4>
            <p className="text-slate-600 mb-4">Watch our expert tutorial on how to apply Honey Beige 120 for a flawless, streak-free finish.</p>
            <button 
              onClick={() => onNavigate('tutorials')}
              className="text-primary font-bold flex items-center justify-center md:justify-start gap-2 hover:underline"
            >
              Watch Tutorial <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      <div className="lg:col-span-5 space-y-8">
        <section className="bg-white rounded-xl shadow-sm border border-primary/5 overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-extrabold text-xl tracking-tight">Available Nearby</h3>
            <button className="text-xs font-bold text-primary flex items-center gap-1 uppercase tracking-widest">
              <MapPin className="w-4 h-4" />
              Use My Location
            </button>
          </div>
          <div className="divide-y divide-slate-100">
            {[
              { name: 'Lumina Flagship Store', address: '5th Avenue, New York, NY', dist: '0.4 miles', stock: 'In Stock' },
              { name: 'Beauty Collective SoHo', address: 'Broadway St, New York, NY', dist: '1.2 miles', stock: 'In Stock' },
              { name: 'The Glow Studio', address: 'Brooklyn Heights, NY', dist: '3.5 miles', stock: 'Low Stock' }
            ].map((store, i) => (
              <div key={i} className="p-6 hover:bg-slate-50 transition-colors group cursor-pointer">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h4 className="font-bold text-slate-900 group-hover:text-primary transition-colors">{store.name}</h4>
                    <p className="text-sm text-slate-500">{store.address}</p>
                  </div>
                  <span className={`text-[10px] font-black px-2 py-1 rounded uppercase tracking-widest ${store.stock === 'In Stock' ? 'bg-primary/10 text-primary' : 'bg-slate-100 text-slate-400'}`}>
                    {store.stock}
                  </span>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                    <Navigation className="w-3 h-3" />
                    {store.dist} away
                  </span>
                  <button className="text-xs font-bold underline decoration-primary/30 hover:decoration-primary transition-all">Get Directions</button>
                </div>
              </div>
            ))}
          </div>
          <div className="p-6 bg-slate-50">
            <button className="w-full bg-white border border-slate-200 py-3 rounded-xl font-bold text-sm hover:border-primary/50 transition-all flex items-center justify-center gap-2">
              View All Stores
              <MapPin className="w-4 h-4" />
            </button>
          </div>
        </section>

        <section className="bg-bg-dark text-white rounded-xl p-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <h4 className="text-sm font-bold uppercase tracking-[0.2em] text-primary mb-2">Complete the look</h4>
          <h5 className="text-xl font-extrabold mb-6">Pairs perfectly with...</h5>
          <div className="flex items-center gap-6 bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors cursor-pointer group">
            <div className="w-16 h-16 rounded-lg bg-white/10 flex items-center justify-center p-2">
              <img className="w-full h-full object-contain" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSS9nJcVTRxcY4G2UhQ1K55zNkwmP4rihaOq9vPhqjTVi9a25YsY0QWvfXrz32t60Gjj0YTribMnC34t_-oSL9uNPto6I_LCOYgJfpgUQS2h-YTnvyAiK4vg4ENBm9V-kSHPdWutiwCNML_memJbPDFAmSvbk9zCdbgV-UaZl0-Yd2SnjjHPe4OXpWibo_qw5j8-As-S84T_RtC0KivYby_m9WOb2VwWvJ6aKHXXa_-Gl7DHCNPxlvtrjWT44I06-SxyvICo7Z6xE" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-sm group-hover:text-primary transition-colors">Radiance Concealer</p>
              <p className="text-xs text-white/60">Shade: Light Peach 05</p>
              <p className="text-xs font-bold mt-1 text-primary">₹1,999</p>
            </div>
            <CheckCircle className="w-5 h-5 text-white/20 group-hover:text-primary" />
          </div>
        </section>
      </div>
    </div>
  </motion.div>
);

const TutorialsView = ({ onNavigate }: { onNavigate: (page: Page) => void }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="max-w-7xl mx-auto px-6 py-12"
  >
    <section className="mb-16">
      <div className="flex flex-col lg:flex-row gap-12 items-center bg-white rounded-xl overflow-hidden shadow-sm border border-primary/5">
        <div className="w-full lg:w-1/2 h-[400px] relative">
          <img className="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqpWWxcTc4P2EV-4wkdBDfuJXvc921wyM37jPndcdvyHVxxVuWguAzV4grrVL9faVc97WsGwgXhGeXihHLjk4972rjfxXpbrxXnvA751hEPcT_LceYdNequBouCi20ZWj1NMie1e7ulufj_nFlp7pnJ3xYlrOiAeR4VXy7aZvpUE_B5elhAcR80gyX5f4SPJzNxq9-1jOk25r6OlQ-6fhswo96VJEWnxY49sOYO94_rieIC52rHxT8dSNtTRN4FeWjKfNRoeWB_mI" />
          <div className="absolute inset-0 bg-gradient-to-r from-bg-light/20 to-transparent" />
        </div>
        <div className="w-full lg:w-1/2 p-8 lg:pr-16">
          <span className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-widest mb-4">Learn & Evolve</span>
          <h1 className="text-4xl lg:text-5xl font-extrabold text-slate-900 leading-tight mb-6">
            Master Your <span className="text-primary italic">Glow</span>
          </h1>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Learn the secrets of perfect foundation application through our curated video library or book a personalized session with a professional makeup artist.
          </p>
          <div className="flex flex-wrap gap-4">
            <button className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:shadow-lg hover:shadow-primary/30 transition-all flex items-center gap-2">
              <PlayCircle className="w-5 h-5" />
              Watch Tutorials
            </button>
            <button 
              onClick={() => onNavigate('booking')}
              className="px-8 py-4 bg-white text-slate-900 font-bold rounded-full border border-slate-200 hover:bg-slate-50 transition-all"
            >
              Book a Mentor
            </button>
          </div>
        </div>
      </div>
    </section>

    <section className="mb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 mb-2">Video Library</h2>
          <p className="text-slate-500">Self-guided makeup education for every skin type.</p>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          {['All Looks', 'Full Coverage', 'Natural Glow', 'Basics'].map((cat, i) => (
            <button key={i} className={`shrink-0 px-6 py-2 rounded-full text-sm font-semibold transition-colors ${i === 0 ? 'bg-primary text-white' : 'bg-primary/10 text-primary hover:bg-primary/20'}`}>
              {cat}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {VIDEOS.map(video => (
          <div key={video.id} className="group cursor-pointer">
            <div className="relative aspect-[16/10] rounded-xl overflow-hidden mb-4 shadow-md">
              <img className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" src={video.thumbnail} />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                <div className="w-16 h-16 rounded-full glass-effect flex items-center justify-center text-slate-900 scale-90 group-hover:scale-100 transition-transform">
                  <Play className="w-8 h-8 fill-current" />
                </div>
              </div>
              <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white text-xs px-2 py-1 rounded">
                {video.duration}
              </div>
            </div>
            <h3 className="font-bold text-lg mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
            <p className="text-sm text-slate-500">{video.description}</p>
          </div>
        ))}
      </div>
    </section>

    <section className="relative">
      <div className="bg-primary/5 rounded-xl p-8 lg:p-16 border border-primary/20 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
        <div className="relative flex flex-col lg:flex-row gap-12 items-center">
          <div className="w-full lg:w-1/3">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-rose-400 rounded-xl blur opacity-25 group-hover:opacity-50 transition duration-1000" />
              <div className="relative aspect-square rounded-xl overflow-hidden bg-white shadow-xl">
                <img className="w-full h-full object-cover" src={MENTORS[0].image} />
              </div>
            </div>
            <div className="mt-6 flex justify-center">
              <div className="flex -space-x-3 overflow-hidden">
                {[1, 2, 3].map(i => (
                  <img key={i} className="inline-block h-10 w-10 rounded-full ring-2 ring-white" src={`https://i.pravatar.cc/150?u=${i}`} />
                ))}
              </div>
              <div className="ml-4 flex items-center text-sm font-medium text-slate-600">
                Joined by 200+ clients this month
              </div>
            </div>
          </div>
          <div className="w-full lg:w-2/3">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mb-6">
              Personalized Artistry Mentorship
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Skip the guesswork with a 1-on-1 session. Our professional artists come to your home or provide a high-definition live digital consultation to perfect your routine.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <Verified className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Certified Pros</h4>
                  <p className="text-sm text-slate-500">Every mentor has 5+ years of industry experience.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center shrink-0">
                  <CheckCircle className="text-primary w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">Flexible Scheduling</h4>
                  <p className="text-sm text-slate-500">Book morning, evening, or weekend slots.</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <button 
                onClick={() => onNavigate('booking')}
                className="w-full sm:w-auto px-10 py-4 bg-slate-900 text-white font-extrabold rounded-full hover:shadow-xl transition-all"
              >
                Book Now — ₹8,999
              </button>
              <span className="text-slate-500 font-medium italic">Includes a ₹3,500 product credit</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  </motion.div>
);

const VirtualTryOnView = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const [image, setImage] = useState<string | null>(null);
  const [processedImage, setProcessedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedLook, setSelectedLook] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const LOOKS = [
    { id: 'golden', name: 'Golden Hour', description: 'Warm, sun-kissed glow', prompt: 'Apply a warm, sun-kissed golden hour makeup look. Add subtle bronze tones to the cheeks and a soft golden shimmer to the eyelids. Ensure the skin looks radiant and warm.' },
    { id: 'rose', name: 'Rose Quartz', description: 'Soft pink romantic flush', prompt: 'Apply a soft pink romantic makeup look. Add a delicate rose flush to the cheeks and soft pink tones to the lips and eyelids. The skin should look dewy and fresh.' },
    { id: 'midnight', name: 'Midnight Glam', description: 'Bold smoky sophistication', prompt: 'Apply a bold midnight glam makeup look. Add a sophisticated smoky eye with dark tones and a defined matte finish to the skin. The lips should have a deep, elegant color.' },
    { id: 'glass', name: 'Glass Skin', description: 'Ultra-hydrated reflective finish', prompt: 'Apply a glass skin effect. The skin should look ultra-hydrated, reflective, and clear with minimal color. Focus on a high-shine, dewy finish that looks natural yet polished.' }
  ];

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
        setProcessedImage(null);
        setSelectedLook(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const applyFilter = async (look: typeof LOOKS[0]) => {
    if (!image) return;
    
    setIsProcessing(true);
    setSelectedLook(look.id);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const base64Data = image.split(',')[1];
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: 'image/jpeg' } },
            { text: `You are a professional makeup artist AI. Please edit this face photo to apply the following look: ${look.prompt}. Maintain the person's identity and features, but realistically apply the makeup and lighting effects. Return ONLY the edited image.` }
          ]
        }
      });

      for (const part of response.candidates?.[0]?.content?.parts || []) {
        if (part.inlineData) {
          setProcessedImage(`data:image/png;base64,${part.inlineData.data}`);
          break;
        }
      }
    } catch (error) {
      console.error('Error applying filter:', error);
      alert('Failed to apply filter. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
          <span className="cursor-pointer hover:text-primary" onClick={() => onNavigate('home')}>Home</span>
          <ChevronRight className="w-3 h-3" />
          <span className="text-primary">Virtual Try-On</span>
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight mb-2 italic serif">AI Face Filtration</h2>
        <p className="text-slate-500 max-w-2xl">Experience our artistry instantly. Upload a photo and let our AI apply professional makeup looks tailored to your features.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8">
          <div className="relative aspect-[4/5] md:aspect-video bg-neutral-soft rounded-2xl overflow-hidden border-2 border-dashed border-primary/20 flex items-center justify-center group">
            {processedImage ? (
              <img src={processedImage} className="w-full h-full object-cover" alt="Processed" />
            ) : image ? (
              <img src={image} className="w-full h-full object-cover" alt="Original" />
            ) : (
              <div className="text-center p-12">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                  <Camera className="w-10 h-10 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Upload Your Portrait</h3>
                <p className="text-slate-500 mb-8 max-w-xs mx-auto">For best results, use a high-resolution photo with clear, front-facing lighting.</p>
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-primary text-white px-8 py-4 rounded-full font-bold shadow-lg shadow-primary/20 hover:brightness-110 transition-all flex items-center gap-2 mx-auto"
                >
                  <Upload className="w-5 h-5" />
                  Choose Photo
                </button>
              </div>
            )}
            
            {isProcessing && (
              <div className="absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center text-white">
                  <RefreshCw className="w-12 h-12 animate-spin mx-auto mb-4" />
                  <p className="font-bold tracking-widest uppercase text-sm">AI Artistry in Progress...</p>
                </div>
              </div>
            )}

            {(image || processedImage) && !isProcessing && (
              <div className="absolute bottom-6 right-6 flex gap-3">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-white/90 backdrop-blur text-slate-900 p-4 rounded-full shadow-xl hover:bg-white transition-all"
                  title="Upload New"
                >
                  <RefreshCw className="w-6 h-6" />
                </button>
                {processedImage && (
                  <button 
                    className="bg-primary text-white p-4 rounded-full shadow-xl hover:brightness-110 transition-all"
                    title="Download Result"
                  >
                    <Download className="w-6 h-6" />
                  </button>
                )}
              </div>
            )}
          </div>
          
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleUpload} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-6">Select Artistry Look</h3>
            <div className="grid grid-cols-1 gap-4">
              {LOOKS.map((look) => (
                <button
                  key={look.id}
                  disabled={!image || isProcessing}
                  onClick={() => applyFilter(look)}
                  className={`p-6 rounded-2xl border-2 transition-all text-left group relative overflow-hidden ${
                    selectedLook === look.id 
                      ? 'border-primary bg-primary/5' 
                      : 'border-primary/5 bg-white hover:border-primary/20'
                  } ${(!image || isProcessing) ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-lg">{look.name}</h4>
                      {selectedLook === look.id && <Sparkles className="w-5 h-5 text-primary" />}
                    </div>
                    <p className="text-sm text-slate-500">{look.description}</p>
                  </div>
                  <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full blur-3xl transition-opacity duration-500 ${
                    look.id === 'golden' ? 'bg-orange-400/20' :
                    look.id === 'rose' ? 'bg-pink-400/20' :
                    look.id === 'midnight' ? 'bg-indigo-400/20' :
                    'bg-cyan-400/20'
                  } ${selectedLook === look.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                </button>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 text-white p-8 rounded-2xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-lg">
                <Wand2 className="w-6 h-6 text-primary" />
              </div>
              <h4 className="font-bold">How it works</h4>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              Our proprietary AI analyzes your facial structure, skin tone, and lighting to realistically apply professional makeup looks.
            </p>
            <ul className="space-y-3 text-xs font-medium text-slate-300">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Preserves natural skin texture
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Adapts to your unique features
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary" />
                Instant high-res visualization
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const BookingView = ({ onNavigate }: { onNavigate: (page: Page) => void }) => {
  const [selectedDate, setSelectedDate] = useState(5);
  const [selectedTime, setSelectedTime] = useState('11:00 AM');

  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 20 }}
      className="max-w-6xl mx-auto px-6 py-8"
    >
      <nav className="flex items-center gap-2 mb-8 text-sm text-slate-500">
        <button onClick={() => onNavigate('home')} className="hover:text-primary">Home</button>
        <ChevronRight className="w-4 h-4" />
        <button onClick={() => onNavigate('tutorials')} className="hover:text-primary">Mentors</button>
        <ChevronRight className="w-4 h-4" />
        <span className="text-slate-900 font-medium">Booking Session</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-100">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="relative">
                <img className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-primary/10" src={MENTORS[0].image} />
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent-gold text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Top Rated</div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1">
                  <h1 className="text-2xl font-bold text-slate-900 leading-tight">{MENTORS[0].name}</h1>
                  <div className="flex items-center justify-center md:justify-start gap-1 text-accent-gold">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-sm font-bold">{MENTORS[0].rating}</span>
                    <span className="text-slate-400 text-xs font-normal">({MENTORS[0].reviews} reviews)</span>
                  </div>
                </div>
                <p className="text-slate-600 font-medium mb-3">{MENTORS[0].role} • {MENTORS[0].experience}</p>
                <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                  {MENTORS[0].specialties.map(s => (
                    <span key={s} className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full border border-primary/20">{s}</span>
                  ))}
                </div>
              </div>
              <button className="hidden md:block px-4 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 transition-colors text-sm font-semibold">View Portfolio</button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Select a Date</h2>
                <p className="text-sm text-slate-500">All times are shown in your local timezone</p>
              </div>
              <div className="flex items-center gap-4">
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronLeft className="w-5 h-5" /></button>
                <span className="text-lg font-bold">October 2023</span>
                <button className="p-2 rounded-full hover:bg-slate-100 transition-colors"><ChevronRight className="w-5 h-5" /></button>
              </div>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
                <div key={d} className="h-10 flex items-center justify-center text-xs font-bold text-slate-400 uppercase tracking-widest">{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {[26, 27, 28, 29, 30, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((day, i) => {
                const isCurrentMonth = i >= 5;
                const isSelected = selectedDate === day && isCurrentMonth;
                return (
                  <button 
                    key={i}
                    onClick={() => isCurrentMonth && setSelectedDate(day)}
                    className={`aspect-square flex flex-col items-center justify-center rounded-lg transition-all ${
                      !isCurrentMonth ? 'text-slate-300 cursor-default' : 
                      isSelected ? 'bg-primary text-white shadow-lg shadow-primary/30 ring-4 ring-primary/10 font-bold' : 
                      'hover:bg-primary/5 font-semibold'
                    }`}
                  >
                    <span className="text-sm">{day}</span>
                    {isSelected && <div className="w-1 h-1 bg-white rounded-full mt-1" />}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-white rounded-xl shadow-sm border border-slate-100 flex flex-col h-[600px]">
            <div className="p-6 border-b border-slate-100">
              <h3 className="text-lg font-bold text-slate-900">Thursday, Oct {selectedDate}</h3>
              <p className="text-xs text-slate-500 mt-1">12 slots available today</p>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-8 hide-scrollbar">
              <div>
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                  <Sun className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Morning</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['09:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-lg border transition-all text-sm font-medium ${
                        selectedTime === time ? 'border-2 border-primary text-primary bg-primary/5 font-bold ring-2 ring-primary/10' : 
                        'border-slate-200 hover:border-primary hover:text-primary bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-4 text-slate-400">
                  <CloudSun className="w-4 h-4" />
                  <span className="text-xs font-bold uppercase tracking-widest">Afternoon</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {['01:30 PM', '02:00 PM', '03:30 PM', '04:45 PM'].map(time => (
                    <button 
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className={`py-3 px-4 rounded-lg border transition-all text-sm font-medium ${
                        selectedTime === time ? 'border-2 border-primary text-primary bg-primary/5 font-bold ring-2 ring-primary/10' : 
                        'border-slate-200 hover:border-primary hover:text-primary bg-slate-50'
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="p-6 bg-slate-50 border-t border-slate-100">
              <div className="mb-4">
                <p className="text-xs text-slate-500 uppercase font-bold tracking-wider">Your Session</p>
                <p className="text-sm font-bold text-slate-900 mt-1">Thursday, Oct {selectedDate} at {selectedTime}</p>
              </div>
              <button className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-bold shadow-lg shadow-primary/20 transition-all flex items-center justify-center gap-2">
                <span>Confirm Appointment</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 p-8 bg-primary/5 rounded-xl border border-primary/10">
        <div className="flex gap-4">
          <VideoIcon className="text-primary w-8 h-8" />
          <div>
            <h4 className="font-bold text-sm">Virtual or At-Home</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Choose between a seamless high-definition video call or a safe, in-person mentor visit.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <History className="text-primary w-8 h-8" />
          <div>
            <h4 className="font-bold text-sm">Flexible Rescheduling</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Plans changed? No worries. Reschedule up to 24 hours before your session at no extra cost.</p>
          </div>
        </div>
        <div className="flex gap-4">
          <Verified className="text-primary w-8 h-8" />
          <div>
            <h4 className="font-bold text-sm">Personalized Report</h4>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">Receive a custom makeup chart and product recommendation list after every session.</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentPage === 'home' && <HomeView onNavigate={setCurrentPage} />}
            {currentPage === 'shade-matcher' && <ShadeMatcherView onNavigate={setCurrentPage} />}
            {currentPage === 'shade-result' && <ShadeResultView onNavigate={setCurrentPage} />}
            {currentPage === 'tutorials' && <TutorialsView onNavigate={setCurrentPage} />}
            {currentPage === 'booking' && <BookingView onNavigate={setCurrentPage} />}
            {currentPage === 'virtual-try-on' && <VirtualTryOnView onNavigate={setCurrentPage} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />

      {/* Floating Help Button */}
      <aside className="fixed bottom-6 left-6 z-50 md:hidden">
        <button className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-xl shadow-primary/30">
          <HelpCircle className="w-6 h-6" />
        </button>
      </aside>
    </div>
  );
}
