import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DiaryEditor from "../components/DiaryEditor";
import { dbService } from "../firebase";

const Edit = () => {
  const navigate = useNavigate();
  const { num } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [originData, setOriginData] = useState();

  useEffect(() => {
    onSnapshot(query(collection(dbService, "diaries")), (snapshot) => {
      const diaryArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiaries(diaryArray);
    });
  }, []);

  useEffect(() => {
    if (diaries.length >= 1) {
      const targetDiary = diaries.find(
        (it) => parseInt(it.num) === parseInt(num)
      );

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate("/", { replace: true });
      }
    }
  }, [num, diaries, navigate]);

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장 - 일기 수정`;
  }, []);

  return (
    <div>
      {originData && <DiaryEditor isEdit={true} originData={originData} />}
    </div>
  );
};

export default Edit;
