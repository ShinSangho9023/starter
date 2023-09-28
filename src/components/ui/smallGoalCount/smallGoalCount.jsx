import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card'
import styles from './SmallGoalCount.module.css'

export default function SmallGoalCount(props) {

    const [GoalsCount, setGoalsCount] = useState();
    const number = props.bigGoal_number;

    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(`/api/SmallGoalCount?number=${number}`);
                setGoalsCount(response.data);
                console.log(response.data);
                console.log(GoalsCount);
            } catch (error) {
                console.error('오류 발생:', error);
                setLoading(false); // 오류 발생 시에도 로딩 상태 변경
            }
        }
        fetchGoals();
    }, [props.SmallGoals || []])

    return (
        <>
            <div className={styles.smallGoalCard}>
                <div>
                    <p>완료:</p>
                    <p>진행:</p>
                    <p>예정:</p>
                </div>
                <div>
                    <p>{GoalsCount && GoalsCount.completed_count !== undefined ? GoalsCount.completed_count : 0}개</p>
                    <p>{GoalsCount && GoalsCount.ongoing_count !== undefined ? GoalsCount.ongoing_count : 0}개</p>
                    <p>{GoalsCount && GoalsCount.upComingGoal_count !== undefined ? GoalsCount.upComingGoal_count : 0}개</p>
                </div>
            </div>
        </>
    );

}
