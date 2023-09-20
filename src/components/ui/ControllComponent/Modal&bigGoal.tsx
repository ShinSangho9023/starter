import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BigGoal from '../BigGoal/BigGoal'; // BigGoal 컴포넌트를 import
import GoalModal from '../Modal/Modal';//모달 컴포넌트를 import
import BigGoalCount from '../BigGoalCount/BigGoalCount.jsx'
import styles from './Modal&bigGoal.module.css'
import {
  NAV_ITEM_TYPE_TITLE,
  NAV_ITEM_TYPE_ITEM,
  NAV_ITEM_TYPE_COLLAPSE
} from '@/constants/navigation.constant'
import navigationConfig from '@/configs/navigation.config/index';




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

  const targetMenuItemKey = 'collapseMenu'; // 원하는 메뉴 항목의 키
  // 선택한 메뉴 항목을 찾습니다.
  const targetMenuItem = navigationConfig.find(item => item.key === targetMenuItemKey);
  if (targetMenuItem) {
    // 다른 배열을 map 메서드로 반복하여 새로운 서브 메뉴 항목을 추가합니다.
    targetMenuItem.subMenu = BigGoals.map(item => ({
      key: item.bigGoal_number,
      path: `/new-sub-menu-${item.bigGoal_number}`,
      title: item.bigGoal_name,
      translateKey: `nav.collapseMenu.${item.bigGoal_number}`,
      icon: '', // 아이콘 설정
      type: NAV_ITEM_TYPE_ITEM,
      authority: [], // 액세스 권한 설정
      subMenu: [], // 서브 메뉴 항목이 없다면 빈 배열로 설정
    }));
  }

  // 모달에서 목표를 저장할 때 호출되는 함수
  const handleModalSave = (newGoal) => {
    // 새로운 목표를 목록에 추가
    const newBigGoals = [...BigGoals, newGoal]; // 새로운 배열 생성
    console.log("부모 컴포넌트 리렌더링 확인", newGoal);
    console.log("부모 컴포넌트 목표 리스트 확인", newBigGoals);
    setBigGoals(newBigGoals); // 상태 업데이트
  };

  return (
    <div className={styles.mainContainer}>
      <BigGoalCount BigGoals={BigGoals}/>
      <h1 className={styles.title}>대목표 목록</h1>
      <hr></hr>
      <GoalModal onSave={handleModalSave} />
      <BigGoal BigGoals={BigGoals}/>
    </div>
  );
};

export default ModalbigGoal;
