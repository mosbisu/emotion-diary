import { useContext, useEffect, useState } from "react";
import { DiaryStateContext } from "../App";

import Button from "../components/Button";
import DiaryList from "../components/DiaryList";
import Header from "../components/Header";

const Home = () => {
  const diaryList = useContext(DiaryStateContext);

  const [data, setData] = useState([]);
  const [curDate, setCurDate] = useState(new Date());
  const headText = `${curDate.getFullYear()}년 ${curDate.getMonth() + 1}월`;

  useEffect(() => {
    const titleElement = document.getElementsByTagName("title")[0];
    titleElement.innerHTML = `감정 일기장`;
  }, []);

  useEffect(() => {
    if (diaryList.length >= 1) {
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

      setData(
        diaryList.filter((it) => firstDay <= it.date && it.date <= lastDay)
      );
    }
  }, [diaryList, curDate]);

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
      <DiaryList diaryList={data} />
    </div>
  );
};

export default Home;
