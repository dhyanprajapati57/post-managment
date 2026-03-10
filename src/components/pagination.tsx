import Button from "../components/commencomponents/button";

interface Props {
  page: number;
  setPage: (page: number) => void;
}

const Pagination = ({ page, setPage }: Props) => {

  return (
    <div style={{ marginTop: "20px" }}>

      <Button
        label="Prev"
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      />

      <span style={{ margin: "10px" }}>
        Page {page}
      </span>

      <Button
        label="Next"
        onClick={() => setPage(page + 1)}
      />

    </div>
  );
};

export default Pagination;