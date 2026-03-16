import Button from "./commen/button";

interface Props {
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: Props) => {
  return (
   
      <div className="flex items-center justify-center gap-4 mt-8">
      {/* Prev Button */}
      <Button
        label="Prev"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
        className="px-4 py-2 text-sm bg-slate-800 text-white rounded-md hover:bg-slate-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
      />

      {/* Current Page */}
     <span className="text-sm font-medium text-gray-700">
        Page {page} of {totalPages}
      </span>

      {/* Next Button */}
      <Button
        label="Next"
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
        className="px-4 py-2 text-sm bg-slate-800 text-white rounded-md hover:bg-slate-900 disabled:bg-gray-300 disabled:cursor-not-allowed"
      />

    </div>
  );
};

export default Pagination;