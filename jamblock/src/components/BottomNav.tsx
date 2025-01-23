import { CiHome } from "react-icons/ci";
import { FaBookReader } from "react-icons/fa";
import { FaClipboardQuestion } from "react-icons/fa6";
import { MdOutlineSpaceDashboard } from "react-icons/md";
import { VscWorkspaceUnknown } from "react-icons/vsc";
import { MdSpaceDashboard } from "react-icons/md";
import { SiHomebridge } from "react-icons/si";
import { GiBookshelf } from "react-icons/gi";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";

const BottomNav: React.FC = (): JSX.Element | null => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isLoggedIn = Boolean(localStorage.getItem("authToken"));

  if (!isMobile) return null;

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 bg-white shadow-md border-t"
      role="navigation"
    >
      <ul className="flex justify-around text-gray-600 py-2">
        <li className="font-bold cursor-pointer flex flex-col items-center">
          <Link
            to="/"
            className="flex border border-1 rounded-md w-20 py-1 px-5 flex-col items-center"
          >
            <SiHomebridge className="text-2xl md:text-2xl" />
            <span className="text-xs md:text-sm">Home</span>
          </Link>
        </li>
        <li className="font-bold border border-1 rounded-md cursor-pointer flex flex-col items-center">
          <Link
            to="/dashboard"
            className="flex flex-col w-20 py-1 px-5 items-center"
          >
            <MdSpaceDashboard className="text-2xl md:text-2xl" />
            <span className="text-xs md:text-sm">Dashboard</span>
          </Link>
        </li>
        <li className="font-bold border border-2 p-1 rounded-md cursor-pointer flex flex-col items-center">
          <Link
            to="/about"
            className="flex flex-col w-20 py-1 px-5 items-center"
          >
            <VscWorkspaceUnknown className="text-xl md:text-2xl" />
            <span className="text-xs md:text-sm">About</span>
          </Link>
        </li>
        <li className="font-bold border border-2 p-1 rounded-md cursor-pointer flex flex-col items-center">
          <Link
            to={isLoggedIn ? "/questions" : "/all-past-question"}
            className="flex flex-col w-20 py-1 px-5 items-center"
          >
            <GiBookshelf className="text-2xl md:text-2xl" />
            <span className="text-xs md:text-sm">Questions</span>
          </Link>
        </li>
        <li className="hover:text-purple-500 cursor-pointer flex flex-col items-center">
          {/* <Link to="/questions" className="flex flex-col items-center">
                        <FaClipboardQuestion className="text-xl md:text-2xl" />
                        <span className="text-xs md:text-sm">Questions</span>
                    </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default BottomNav;
