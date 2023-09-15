import React, { useEffect, useState } from 'react';
import axios from 'axios';

const BigGoal = () => {
  const [BigGoals, setGoals] = useState([]);

  // 컴포넌트가 마운트될 때, 서버에서 영화 목록을 가져와서 상태에 저장합니다.
  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get('/api/BigGoals'); // 서버 API 엔드포인트를 적절히 대체해야 합니다.
        setGoals(response.data);
      } catch (error) {
        console.error('오류 발생:', error);
      }
    }

    fetchGoals(); // 함수 실행
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <div>
      <h1>영화 목록</h1>
      <div className="goal-list">
        {BigGoals.map((goal) => (
          <div key={goal.id} className="goal-card">
            <h2>{goal.title}</h2>
            <p>{goal.description}</p>
            <p>평점: {goal.rating}</p>
            {/* 기타 영화 정보를 여기에 표시 */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BigGoal;
