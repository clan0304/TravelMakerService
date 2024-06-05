'use client';

import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import SearchBar from './(Home)/SearchBar';
import ListContainer from './(Home)/ListContainer';
import MainPhoto from './(Home)/MainPhoto';
import AboutUs from './(Home)/AboutUs';

export default function Home() {
  const [googleLists, setGoogleLists] = useState<any[]>([]);
  const serviceSectionRef = useRef<HTMLElement>(null);

  console.log(googleLists);
  useEffect(() => {
    getGoogleLists('Cafe in Melbourne');
  }, []);

  const getGoogleLists = async (value: string) => {
    const res = await axios.get(`/api/google-place-api?q=${value}`);
    setGoogleLists(res.data.resp.results);
  };

  const scrollToServiceSection = () => {
    if (serviceSectionRef.current) {
      const offset = 30;
      const elementPosition =
        serviceSectionRef.current.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.scrollY - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return (
    <main className="flex flex-col gap-10 w-full h-full">
      <MainPhoto onSearchClick={scrollToServiceSection} />
      <AboutUs />
      <section
        ref={serviceSectionRef}
        id="service"
        className="flex flex-col gap-20"
      >
        <SearchBar userInput={(value: string) => getGoogleLists(value)} />
        <ListContainer lists={googleLists} />
      </section>
    </main>
  );
}
