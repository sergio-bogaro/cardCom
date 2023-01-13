import type { NextPage } from 'next';

import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Perform localStorage action
    const accessToken = localStorage.getItem('AcessToken');
    const logged = accessToken != undefined ? true : false;

    if (!logged) {
      router.push('/login');
    } else router.push('/home');
  }, []);

  return (
    <div>
      <h1>teste</h1>
    </div>
  );
};

export default Home;
