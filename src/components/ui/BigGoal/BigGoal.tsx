import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '@/components/ui/Card'
const BigGoal = (props) => {
  const [BigGoals, setGoals] = useState(props.BigGoals || []);
  const [isLoading, setLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수
  const userId = '신짱구';

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get(`/api/BigGoals?userId=${userId}`);
        setGoals(response.data);
        setLoading(false); // 데이터 로딩이 끝났음을 표시
        console.log('부모에서 넘어온 컴포넌트 값', props.BigGoals);
        console.log('자식에서 서버에서 넘어온 값 :', response.data);
      } catch (error) {
        console.error('오류 발생:', error);
        setLoading(false); // 오류 발생 시에도 로딩 상태 변경
      }
    }

    fetchGoals();
  }, [props.BigGoals || []]); // props.BigGoals의 변경 감지

  return (
    <div>
      {/* <h1>대목표 목록</h1> */}
      {isLoading ? (
        <p>Loading...</p> // 로딩 중일 때 표시할 내용
      ) : (
        <div className="goal-list">
          {BigGoals && BigGoals.length > 0 ? (
            BigGoals.map((goal) => (
              <Card key={goal.bigGoal_number} className="goal-card">
                {/* 목표 정보 표시 */}
                <h2>{goal.bigGoal_name}</h2>
                <p>시작 날짜: {goal.bigGoal_startDate ? new Date(goal.bigGoal_startDate).toLocaleDateString() : '날짜 없음'}</p>
                <p>종료 날짜: {goal.bigGoal_endDate ? new Date(goal.bigGoal_endDate).toLocaleDateString() : '날짜 없음'}</p>
              </Card>
            ))
          ) : (
            <p>목록이 비어 있습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default BigGoal;
