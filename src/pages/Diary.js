import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import Header from "../components/Header";
import { dbService } from "../firebase";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

const Diary = () => {
  const navigate = useNavigate();
  const { num } = useParams();
  const [diaries, setDiaries] = useState([]);
  const [originData, setOriginData] = useState();

  // useEffect(() => {
  //   const titleElement = document.getElementsByTagName("title")[0];
  //   titleElement.innerHTML = `감정 일기장 - ${id}번 일기`;
  // }, []);

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
        alert("없는 일기입니다.");
        navigate("/", { replace: true });
      }
    }
  }, [num, diaries, navigate]);

  if (!originData) {
    return <div className="DiaryPage">로딩중입니다...</div>;
  } else {
    const curEmotionData = emotionList.find(
      (it) => parseInt(it.emotion_id) === parseInt(originData.emotion)
    );
    return (
      <div className="DiaryPage">
        <Header
          headText={`${getStringDate(new Date(originData.date))} 기록`}
          leftChild={
            <Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />
          }
          rightChild={
            <Button
              text={"수정하기"}
              onClick={() => navigate(`/edit/${originData.num}`)}
            />
          }
        />
        <article>
          <section>
            <h4>작성자</h4>
            <div className="diary_nickname_wrapper">
              <span>{originData.nickname}</span>
            </div>
          </section>
          <section>
            <h4>오늘의 감정</h4>
            <div
              className={[
                "diary_img_wrapper",
                `diary_img_wrapper_${originData.emotion}`,
              ].join(" ")}
            >
              <img src={curEmotionData.emotion_img} alt="" />
              <div className="emotion_descript">
                {curEmotionData.emotion_descript}
              </div>
            </div>
          </section>
          <section>
            <h4>오늘의 일기</h4>
            <div className="diary_content_wrapper">
              <p>{originData.content}</p>
            </div>
          </section>
        </article>
      </div>
    );
  }
};

export default Diary;
