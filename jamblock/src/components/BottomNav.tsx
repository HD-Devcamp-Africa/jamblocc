import { CiHome } from 'react-icons/ci';
import { FaBookReader } from 'react-icons/fa';
import { FaClipboardQuestion } from 'react-icons/fa6';
import { MdOutlineSpaceDashboard } from 'react-icons/md';
import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';

const BottomNav: React.FC = (): JSX.Element | null => {
    const isMobile = useMediaQuery({ maxWidth: 767 });

    if (!isMobile) return null;

    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t" role="navigation">
            <ul className="flex justify-around text-gray-700 py-2">
                <li className="hover:text-purple-500 cursor-pointer flex flex-col items-center">
                    <CiHome className="text-2xl" />
                    <Link to="/">Home</Link>
                </li>
                <li className="hover:text-purple-500 cursor-pointer flex flex-col items-center">
                    <MdOutlineSpaceDashboard className="text-2xl" />
                    <Link to="/test">Dashboard</Link>
                </li>
                <li className="hover:text-purple-500 cursor-pointer flex flex-col items-center">
                    <FaBookReader className="text-2xl" />
                    <Link to="*">About</Link>
                </li>
                <li className="hover:text-purple-500 cursor-pointer flex flex-col items-center">
                    <FaClipboardQuestion className="text-2xl" />
                    <Link to="/test">Past Questions</Link>
                </li>
            </ul>
        </nav>
    );
};

export default BottomNav;