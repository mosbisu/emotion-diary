import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";
import { dbService } from "../firebase";

const Home = () => {
  const [curDate, setCurDate] = useState(new Date());
  const [diaries, setDiaries] = useState([]);
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    onSnapshot(query(collection(dbService, "diaries")), (snapshot) => {
      const diaryArray = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDiaries(diaryArray);
    });
  }, [diaries]);

  useEffect(() => {
    if (diaries.length >= 1) {
      const firstDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth(),
        1
      ).getTime();

      const lastDay = new Date(
        curDate.getFullYear(),
        curDate.getMonth() + 1,
        0,
        23,
        59,
        59
      ).getTime();

      setDiaries(
        diaries.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
      console.log(diaries);
    }
  }, [curDate]);

  const increaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() + 1, curDate.getDate())
    );
  };

  const decreaseMonth = () => {
    setCurDate(
      new Date(curDate.getFullYear(), curDate.getMonth() - 1, curDate.getDate())
    );
  };

  return (
    <div>
      <Header
        headText={headText}
        leftChild={<Button text={"<"} onClick={decreaseMonth} />}
        rightChild={<Button text={">"} onClick={increaseMonth} />}
      />
      <DiaryList />
    </div>
  );
};

export default Home;
