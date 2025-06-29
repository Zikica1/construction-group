// import { useState, useEffect } from 'react';

// const useIsMobile = (breakpoint = 500) => {
//   const [isMobile, setIsMobile] = useState(window.innerWidth <= breakpoint);

//   useEffect(() => {
//     const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
//     window.addEventListener('resize', onResize);
//     return () => window.removeEventListener('resize', onResize);
//   }, [breakpoint]);

//   return isMobile;
// };

// const HamburgerMenu = () => {
//   const [NavComponent, setNavComponent] = useState(null);
//   const isMobile = useIsMobile();

//   const handleClick = async () => {
//     if (isMobile) {
//       const module = await import('./Navigation');
//       setNavComponent(() => module.default);
//     } else {
//       alert('Navigacija se prikazuje samo na mobilnim uređajima!');
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleClick}>🍔</button>
//       {NavComponent && <NavComponent />}
//     </div>
//   );
// };

// export default HamburgerMenu;

import { useState, useEffect } from 'react';

const useIsMobile = (breakpoint = 500) => {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth <= breakpoint
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [breakpoint]);

  return isMobile;
};

const HamburgerMenu = () => {
  const [NavComponent, setNavComponent] = useState(null);
  const isMobile = useIsMobile();

  // Automatski uvozi Navigation kada nije mobilna širina
  useEffect(() => {
    if (!isMobile) {
      import('./Navigation').then((module) => {
        setNavComponent(() => module.default);
      });
    }
  }, [isMobile]);

  const handleClick = async () => {
    if (!NavComponent) {
      const module = await import('./Navigation');
      setNavComponent(() => module.default);
    }
  };

  if (isMobile) {
    return (
      <div>
        <button onClick={handleClick}>🍔</button>
        {NavComponent && <NavComponent />}
      </div>
    );
  }

  // Desktop verzija — odmah prikazana navigacija
  return <>{NavComponent && <NavComponent />}</>;
};

export default HamburgerMenu;
