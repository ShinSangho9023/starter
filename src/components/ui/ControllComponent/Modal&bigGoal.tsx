import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BigGoal from '../BigGoal/BigGoal'; // BigGoal 컴포넌트를 import
import BigGoalModal from '../Modal/Modal';//모달 컴포넌트를 import
import BigGoalCount from '../BigGoalCount/BigGoalCount.jsx'
import styles from './Modal&bigGoal.module.css'

const ModalbigGoal = () => {
  const [BigGoals, setBigGoals] = useState([]);
  const userId = '신짱구'

  // 컴포넌트가 마운트될 때, 서버에서 대목표 목록을 가져와서 상태에 저장합니다.
  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get(`/api/BigGoals?userId=${userId}`);
        setBigGoals(response.data);
      } catch (error) {
        console.error('오류 발생:', error);
      }
    }

    fetchGoals();
  }, []);

  
  // 모달에서 목표를 저장할 때 호출되는 함수
  const handleModalSave = (newGoal) => {
    // 새로운 목표를 목록에 추가
    const newBigGoals = [...BigGoals, newGoal]; // 새로운 배열 생성
    setBigGoals(newBigGoals); // 상태 업데이트
  };

  return (
    <div className={styles.mainContainer}>
      <BigGoalCount BigGoals={BigGoals}/>
      <h1 className={styles.title}>대목표 목록</h1>
      <hr></hr>
      <BigGoalModal onSave={handleModalSave} />
      <BigGoal BigGoals={BigGoals} onSave={handleModalSave}/>
    </div>
  );
};

export default ModalbigGoal;
