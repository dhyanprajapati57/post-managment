import Button from "../components/commencomponents/button";
import "../assets/pagination.css"; // import CSS

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number; 
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
    <div className="pagination-container">
      {/* Prev Button */}
      <Button
        label="Prev"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />

      {/* Current Page */}
      <span>Page {page}</span>

      {/* Next Button */}
      <Button
        label="Next"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      />
    </div>
  );
};

export default Pagination;