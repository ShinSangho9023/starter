import React from 'react'
import { useParams } from 'react-router-dom'


export default function BigGoalDashBoard() {

   // useParams 훅을 사용하여 URL의 경로 매개변수를 가져옴
   const { user_id, bigGoal_name } = useParams();

// user_id와 bigGoal_name을 사용하여 원하는 작업을 수행
  // 예: 해당 user_id와 bigGoal_name을 가지고 데이터를 검색하거나 렌더링

  return (
    <div>
      <h1>User ID: {user_id}</h1>
      <h1>Big Goal Name: {bigGoal_name}</h1>
      {/* 나머지 컴포넌트 내용 */}
    </div>
  );
};
