'use client'
import InfoCom from '../../components/InfoCom'
import { usePathname, useRouter } from 'next/navigation'
import FavsCom from '../../components/favsCom'


const Pslider = () => {
  const pathname = usePathname();
  const router = useRouter();

  // Define valid paths
  const validPaths = [
    '/profile/info',
    '/profile/security',
    '/profile/favourites',
    '/profile/myCourses',
    '/profile/payment-options'
  ];

  // Check if the current pathname is a valid path
  const isValidPath = validPaths.includes(pathname);

  // If the path is not valid, redirect to /profile
useEffect(() => {
    if (!isValidPath) {
      router.push('/profile');
    }
  }, [pathname]);

  return (
    <div className=' md:w-2/3'>
      {pathname === '/profile/info' && <InfoCom/>}
      {pathname === '/profile/security' && <InfoCom/>}
      {pathname === '/profile/favourites' &&
      
       <FavsCom/>
       }
      {pathname === '/profile/myCourses' && <InfoCom/>}
      {pathname === '/profile/payment-options' && <InfoCom/>}
    </div>
  )
}

export default Pslider;