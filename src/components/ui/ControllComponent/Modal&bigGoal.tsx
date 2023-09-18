import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BigGoal from '../BigGoal/BigGoal'; // BigGoal 컴포넌트를 import
import GoalModal from '../Modal/Modal';//모달 컴포넌트를 import
import BigGoalCount from '../BigGoalCount/BigGoalCount.jsx'

const ModalbigGoal = () => {
  const [BigGoals, setBigGoals] = useState([]);
  const userId = '신짱구'

  // 컴포넌트가 마운트될 때, 서버에서 대목표 목록을 가져와서 상태에 저장합니다.
  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get(`/api/BigGoals?userId=${userId}`);
        setBigGoals(response.data);
        console.log('부모의 값 :', response.data);
      } catch (error) {
        console.error('오류 발생:', error);
      }
    }

    fetchGoals();
  }, []);

  // 모달에서 목표를 저장할 때 호출되는 함수
  const handleModalSave = (newGoal) => {
    // 새로운 목표를 목록에 추가
    console.log("부모 컴포넌트 리렌더링 확인", newGoal);
    setBigGoals([...BigGoals, newGoal]);
    console.log("부모 컴포넌트 목표 리스트 확인", BigGoals);
  };

  return (
    <div>
      <BigGoalCount BigGoals={BigGoals}/>
      <h1>대목표 목록</h1>
      <hr></hr>
      <GoalModal onSave={handleModalSave} />
      <BigGoal BigGoals={BigGoals}/>
    </div>
  );
};

export default ModalbigGoal;
