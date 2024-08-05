import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

const Header: React.FC = () => {
const router = useRouter();

const handleLogoClick = () => {
    router.push('/');
};

return (
    <header className="header">
      <div className="logo" onClick={handleLogoClick} style={{ cursor: 'pointer' }}>
        <Image src="src/images/Logo_Large.png" alt="Do It Logo" width={50} height={50} />
      </div>
    </header>
  );
};

export default Header;
