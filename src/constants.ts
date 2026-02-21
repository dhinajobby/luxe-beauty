import { Product, Video, Mentor } from './types';

export const PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Maybelline Fit Me Foundation',
    price: 599,
    description: 'Matte + Poreless • 18 Shades',
    image: 'https://m.media-amazon.com/images/I/51-m1fS0QWL._SL1000_.jpg',
    category: 'Face',
    affiliateLink: 'https://www.amazon.in/Maybelline-New-York-Foundation-Poreless/dp/B00YMK9A6A'
  },
  {
    id: '2',
    name: 'L\'Oreal Paris Infallible Concealer',
    price: 799,
    description: 'Full coverage • 24H Wear',
    image: 'https://m.media-amazon.com/images/I/61S7z0-6LpL._SL1500_.jpg',
    category: 'Face',
    affiliateLink: 'https://www.flipkart.com/l-oreal-paris-infallible-full-wear-concealer/p/itm6858277279768'
  },
  {
    id: '3',
    name: 'Lakme Absolute Loose Powder',
    price: 650,
    description: 'Matte Finish • Oil Control',
    image: 'https://m.media-amazon.com/images/I/51H7e7-6LpL._SL1000_.jpg',
    category: 'Face',
    affiliateLink: 'https://www.amazon.in/Lakme-Absolute-Face-Stylist-Powder/dp/B00I6A9A6A'
  },
  {
    id: '4',
    name: 'Sugar Cosmetics Base Primer',
    price: 499,
    description: 'Pore Minimizing • Long Lasting',
    image: 'https://m.media-amazon.com/images/I/61S7z0-6LpL._SL1500_.jpg',
    category: 'Face',
    affiliateLink: 'https://www.flipkart.com/sugar-cosmetics-the-most-eligiblur-smoothing-primer/p/itm6858277279768'
  }
];

export const VIDEOS: Video[] = [
  {
    id: '1',
    title: 'The 5-Minute Morning Face',
    duration: '05:24',
    description: 'Mastering the effortless "no-makeup" look.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAg2sdsdNdF7MKuKvE4SUZIaxvze3ppa-7U9NQFSasPC8xOt_vNIOwK4KtMMqY6N76HWCY2mRRrRpl9b8fCldG6-IVb169UquJUQQN-Uh_6dk4Cey84y6NpLRpZOYC8fiELRGMgDUcP7YZZLSRSe2KjM34nMauK4Pxr8uIsP5kZGNFNGWtrIhB7RXl7BRcQS_EC6wcXStGrAT__Qmqdnk_Tp1yQBe4jBmMfIFzVzFRXxQtBt2ai6kW6_FcZNHovae5jgDvgs17dBOs',
    category: 'Natural Glow'
  },
  {
    id: '2',
    title: 'Flawless Full Coverage',
    duration: '12:45',
    description: 'Hide imperfections without the "cakey" feel.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB1V05UcqG5MGjNfzCzqpb51jOfczPe_vocpSiEsRD6Nn2Pg9frN2WlzHhO48jriIiChfzaCZSSlPZR5GmVmskBebQbq8pq9Na-TFOybxwhscL1pe5ep0k-akKWpbd46y7dal_0bTF_5HN_9omrtYWnV_4dH29BrDk1GmcUbKlHjgavX4tbC_LmQhKkIMSJEyBXL8TYCKMRC9KWugVbZUTT0yh8bBpK3YhcIziwkdCz9SM164AkOI2RvAajMbvyT26561GGvaBCiH0',
    category: 'Full Coverage'
  },
  {
    id: '3',
    title: 'Undertone Secrets',
    duration: '08:12',
    description: 'How to find your perfect match every time.',
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBHlStFGTWkkTZxiXQq4jjbqhNJz-s-_amPGOud0ybgUQKH-oYBZKj3LK1iquW72p6d4HCtwbO102ATYUsAgWnMGajgPE3UuolIJHTmLN8VN44rMCZP2ltntNauLYbGBI57I2XFF_ZnHvlgNtCaEbJ33p8xy94NYggcRpmJAdBZkuoD_PwxlpFjQTVpW6plujbQU1hpor1aUuTqtx5m16N-OwVG3aG-ZB5ZrRlD9fuN39Z0-UV840ZxQQmuWHtU3OxXfATgTQj5EeM',
    category: 'Basics'
  }
];

export const MENTORS: Mentor[] = [
  {
    id: '1',
    name: 'Elena Rodriguez',
    role: 'Senior Artistry Mentor',
    experience: '8+ Years Experience',
    rating: 4.9,
    reviews: 124,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDo21RJ7DN8j8m0KPNXYuwY9tRPKl61VmZBLrauk0UPOT6D3CeuafxyE9xTxiNCVhr5JfEMU1jJqghXAft_5KN9BXA4E4iJQHttuFvcGvo3MIbODRggZi_AcHoW4dYafMq2dnByizNmmHPI1dCBjCYRRxiJXmqlPEFO9M8JXq0dmDfV76-ajG-J7LSOZ6ubo6CPxxlU0AqncPM-mNMv2dP4srEs7I_TrrI2e1Zp9wg5SBrsrCzrFRNZGIk1oNxaqEvwNhn09SUJfwI',
    specialties: ['Foundation Matching', 'Skin Prep', 'Bridal Makeup']
  }
];
