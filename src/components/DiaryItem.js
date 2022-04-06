import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "./Button";

const DiaryItem = ({ diaryObj }) => {
  const navigate = useNavigate();
  const strDate = new Date(parseInt(diaryObj.date)).toLocaleDateString();

  const goDetail = () => {
    navigate(`/diary/${diaryObj.num}`);
  };

  const goEdit = () => {
    navigate(`/edit/${diaryObj.num}`);
  };

  return (
    <div className="DiaryItem">
      <div
        onClick={goDetail}
        className={[
          "emotion_img_wrapper",
          `emotion_img_wrapper_${diaryObj.emotion}`,
        ].join(" ")}
      >
        <img
          src={process.env.PUBLIC_URL + `assets/emotion${diaryObj.emotion}.png`}
        />
      </div>
      <div onClick={goDetail} className="info_wrapper">
        <div className="diary_date">
          {strDate}
          <span className="diary_nickname">{diaryObj.nickname}</span>
        </div>
        <div className="diary_content_preview">
          {diaryObj.content.length > 30
            ? diaryObj.content.slice(0, 30) + "..."
            : diaryObj.content}
        </div>
      </div>
      <div className="btn_wrapper">
        <Button onClick={goEdit} text={"수정하기"} />
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
