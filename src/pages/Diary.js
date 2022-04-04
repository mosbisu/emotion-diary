import { useParams } from "react-router-dom";

const Diary = () => {
  const { id } = useParams();
  return (
    <div>
      <h1>Diary</h1>
    </div>
  );
};

export default Diary;
