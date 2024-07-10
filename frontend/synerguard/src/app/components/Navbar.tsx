import github_logo from '../images/github_logo.png';
import logo from '../images/logo.png';

import Image from 'next/image';

function Navbar() {
    return (
      <nav className="text-white" style={{ backgroundColor: '#6c6ce5', padding: '10px 5px' }}>
        <div className="container mx-auto flex justify-between items-center" style={{ gap: '0px' }}>
            <a href="/" className="flex items-center font-semibold" style={{ fontSize: '24px', margin: '0px' }}>
                <Image src={logo} alt="SynerGuard Logo" width={50} height={50} style={{ marginRight: '8px' }} />
                SynerGuard
            </a>
            <div>
                <a href="https://github.com/Unciaur/MediHacks2024" target="_blank" rel="noopener noreferrer">
                <Image src={github_logo} alt="GitHub Logo" className="h-8 w-8" />
                </a>
            </div>
        </div>
      </nav>
    );
}
export default Navbar;