import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card'
import styles from './BigGoalCount.module.css'

export default function BigGoalCount(props) {
  const [BigGoalsCount, setGoalsCount] = useState();
  const [isLoading, setLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수
  const userId = '신짱구';

  useEffect(() => {
    async function fetchGoals() {
      try {
        const response = await axios.get(`/api/BigGoalCount?userId=${userId}`);
        setGoalsCount(response.data);
        setLoading(false);
        console.log('[BigGoalCount]부모에서 넘어온 컴포넌트 값', props.BigGoals);
        console.log('[BigGoalCount]서버에서 넘어온 값 :', response.data);


      } catch (error) {
        console.error('오류 발생:', error);
        setLoading(false); // 오류 발생 시에도 로딩 상태 변경

      }
    }
    fetchGoals();
  }, [props.BigGoals || []])

  return (
    <div className={styles.BigGoalCount}>
      <Card className={styles.CountBox}>
        <span>진행중인 대목표</span>
        <h2>{BigGoalsCount && BigGoalsCount.ongoing_count !== undefined ? BigGoalsCount.ongoing_count : 0}</h2>
      </Card>
      <Card className={styles.CountBox}>
        <span>완료된 대목표</span>
        <h2>{BigGoalsCount && BigGoalsCount.completed_count !== undefined ? BigGoalsCount.completed_count : 0}</h2>
      </Card>
      <Card className={styles.CountBox}>
        <span>기한 지난 대목표</span>
        <h2>{BigGoalsCount && BigGoalsCount.overdue_count !== undefined ? BigGoalsCount.overdue_count : 0}</h2>
      </Card>
    </div>
  )
}
