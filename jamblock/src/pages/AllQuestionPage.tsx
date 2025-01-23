import AllQUestionApiResponseDisplay from "../components/AllQUestionApiResponseDisplay";
import BottomNav from "../components/BottomNav";
import ScrollToTopButton from "../components/ScrollToTop";

const AllQuestionPage: React.FC = () => {
  return (
    <div>
      <AllQUestionApiResponseDisplay />

      <BottomNav />
    </div>
  );
};

export default AllQuestionPage;
