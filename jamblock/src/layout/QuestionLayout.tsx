import React, { ReactNode, useState, useRef, useEffect } from "react";
import { FaFilter, FaTimes } from "react-icons/fa"; // Icons for the toggle button
import Navbar from "../components/Navbar";

interface LayoutProps {
  children: ReactNode;
  onFilterChange?: (filters: {
    search: string;
    years: string[];
    subjects: string[];
  }) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, onFilterChange }) => {
  const [searchFilter, setSearchFilter] = useState("");
  const [yearFilter, setYearFilter] = useState<string[]>([]);
  const [subjectFilter, setSubjectFilter] = useState<string[]>([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const headerRef = useRef<HTMLDivElement>(null);

  const availableYears = ["2020", "2021", "2022", "2023"];
  const availableSubjects = ["Math", "English", "Physics", "Chemistry"];

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchFilter(value);
    notifyParent({ search: value, years: yearFilter, subjects: subjectFilter });
  };

  const handleYearChange = (year: string) => {
    const updatedYears = yearFilter.includes(year)
      ? yearFilter.filter((y) => y !== year)
      : [...yearFilter, year];
    setYearFilter(updatedYears);
    notifyParent({
      search: searchFilter,
      years: updatedYears,
      subjects: subjectFilter,
    });
  };

  const handleSubjectChange = (subject: string) => {
    const updatedSubjects = subjectFilter.includes(subject)
      ? subjectFilter.filter((s) => s !== subject)
      : [...subjectFilter, subject];
    setSubjectFilter(updatedSubjects);
    notifyParent({
      search: searchFilter,
      years: yearFilter,
      subjects: updatedSubjects,
    });
  };

  const notifyParent = (filters: {
    search: string;
    years: string[];
    subjects: string[];
  }) => {
    if (onFilterChange) {
      onFilterChange(filters);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 flex">
        {/* Sidebar */}
        <aside
          className={`bg-white shadow-md w-64 p-4 fixed top-0 bottom-0 transition-transform duration-300 ease-in-out ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } z-10`}
          style={{ marginTop: headerHeight }}
        >
          <h2 className="text-lg font-bold mb-4">Filters</h2>

          {/* Year Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Filter by Year</h3>
            {availableYears.map((year) => (
              <label key={year} className="block mb-1">
                <input
                  type="checkbox"
                  checked={yearFilter.includes(year)}
                  onChange={() => handleYearChange(year)}
                  className="mr-2"
                />
                {year}
              </label>
            ))}
          </div>

          {/* Subject Filter */}
          <div className="mb-6">
            <h3 className="font-semibold mb-2">Filter by Subject</h3>
            {availableSubjects.map((subject) => (
              <label key={subject} className="block mb-1">
                <input
                  type="checkbox"
                  checked={subjectFilter.includes(subject)}
                  onChange={() => handleSubjectChange(subject)}
                  className="mr-2"
                />
                {subject}
              </label>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 transition-all duration-300 ease-in-out ml-0">
          {/* Header */}
          <header
            ref={headerRef}
            className="bg-purple-600 text-white py-4 px-6 shadow-md flex justify-between items-center fixed top-18 left-0 right-0 z-20"
          >
            <button
              onClick={toggleSidebar}
              className="text-white bg-purple-500 hover:bg-purple-700 p-2 rounded"
            >
              {isSidebarOpen ? <FaTimes size={20} /> : <FaFilter size={20} />}
            </button>
            <input
              type="text"
              placeholder="Search Subjects ..."
              className="px-4 py-2 rounded-md border border-gray-300 text-gray-700"
              value={searchFilter}
              onChange={handleSearchChange}
            />
          </header>

          {/* Main Content */}
          <main className="p-4 mt-16">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
