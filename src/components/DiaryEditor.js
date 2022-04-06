import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import Button from "./Button";
import EmotionItem from "./EmotionItem";
import Header from "./Header";

import { getStringDate } from "../util/date";
import { emotionList } from "../util/emotion";

import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { dbService } from "../firebase";

const DiaryEditor = ({ isEdit, originData }) => {
  const navigate = useNavigate();
  const contentRef = useRef();

  const [date, setDate] = useState(getStringDate(new Date()));
  const [emotion, setEmotion] = useState(3);
  const [content, setContent] = useState("");
  const [nickname, setNickname] = useState("");

  const handleClickEmote = useCallback((emotion) => {
    setEmotion(emotion);
  }, []);

  const handleSubmit = async () => {
    if (content.length < 1) {
      contentRef.current.focus();
      return;
    }
    if (
      window.confirm(
        isEdit ? "일기를 수정하시겠습니까?" : "새로운 일기를 작성하시겠습니까?"
      )
    ) {
      if (!isEdit) {
        const diaryObj = {
          num: Math.floor(Math.random() * 1e7),
          date: Date.now(),
          content,
          emotion,
          nickname,
        };
        await addDoc(collection(dbService, "diaries"), diaryObj);
      } else {
        await updateDoc(doc(dbService, "diaries", `${originData.id}`), {
          content: content,
          emotion: emotion,
          nickname: nickname,
        });
      }
      navigate("/", { replace: true });
    }
  };

  const handleRemove = async () => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      await deleteDoc(doc(dbService, "diaries", `${originData.id}`));
      navigate("/", { replace: true });
    }
  };

  useEffect(() => {
    if (isEdit) {
      setDate(getStringDate(new Date(parseInt(originData.date))));
      setEmotion(originData.emotion);
      setContent(originData.content);
      setNickname(originData.nickname);
    }
  }, [isEdit]);

  return (
    <div className="DiaryEditor">
      <Header
        headText={isEdit ? "일기 수정하기" : "새 일기 쓰기"}
        leftChild={<Button text={"< 뒤로가기"} onClick={() => navigate(-1)} />}
        rightChild={
          isEdit && (
            <Button
              text={"삭제하기"}
              type={"negative"}
              onClick={handleRemove}
            />
          )
        }
      />
      <div>
        <section>
          <h4>오늘은 언제인가요?</h4>
          <div className="input_box">
            <input
              className="input_date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
            />
          </div>
        </section>
        <section>
          <h4>작성자</h4>
          <div className="input_box">
            <input
              className="input_nickname"
              value={nickname}
              placeholder="닉네임"
              onChange={(e) => setNickname(e.target.value)}
            />
          </div>
        </section>
        <section>
          <h4>오늘의 감정</h4>
          <div className="input_box emotion_list_wrapper">
            {emotionList.map((it) => (
              <EmotionItem
                key={it.emotion_id}
                {...it}
                onClick={handleClickEmote}
                isSelected={it.emotion_id === emotion}
              />
            ))}
          </div>
        </section>
        <section>
          <h4>오늘의 일기</h4>
          <div className="input_box text_wrapper">
            <textarea
              placeholder="오늘은 어땠나요?"
              ref={contentRef}
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </div>
        </section>
        <section>
          <div className="control_box">
            <Button text={"취소하기"} onClick={() => navigate(-1)} />
            <Button
              text={isEdit ? "수정하기" : "작성하기"}
              type={"positive"}
              onClick={handleSubmit}
            />
          </div>
        </section>
      </div>
    </div>
  );
};

export default DiaryEditor;
