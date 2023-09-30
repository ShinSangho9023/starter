import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './BigGoalDashBoard.module.css'
import { Card } from '@/components/ui'
import Progress from '@/components/ui/Progress'
import Dday from '../../components/ui/ShowBigGoalDday/ShowBigGoalDday'
import SmallGoalCount from '../../components/ui/ShowSmallGoalCount/ShowSmallGoalCount'
import SmallGoalModal from '../../components/ui/InsertSmallGoalModal/InsertSmallGoalModal.jsx'
import SmallGoal from '../../components/ui/ShowSmallGoal/ShowSmallGoal'
import OneBigGoalDday from '../../components/ui/ShowBigGoalDday/OneBigGoalDday'
export default function BigGoalDashBoard() {
    const [SmallGoals, setSmallGoals] = useState([]);
    const [isLoading, setLoading] = useState(true); // 추가: 데이터 로딩 상태

    // useParams 훅을 사용하여 URL의 경로 매개변수를 가져옴
    const { user_id, bigGoal_name, bigGoal_number, bigGoal_state } = useParams();

    // 모달에서 목표를 저장할 때 호출되는 함수
    const handleSmallModalSave = (newGoal) => {
        // 새로운 목표를 목록에 추가
        const newSmallGoals = [...SmallGoals, newGoal]; // 새로운 배열 생성
        setSmallGoals(newSmallGoals); // 상태 업데이트
    }


    if (!user_id || !bigGoal_name || !bigGoal_number || !bigGoal_state) { // 수정: bigGoal_state에도 ! 추가
        // user_id, bigGoal_name 또는 bigGoal_number가 없을 때 처리할 내용을 추가합니다.
        return <div>유효한 매개변수가 없습니다.</div>
    }

    // 처음 화면이 켜질 때 소목표 목록을 불러옴.
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(
                    `/api/user/smallGoals?bigGoal_number=${bigGoal_number}`
                );
                setSmallGoals(response.data);
                setLoading(false); // 데이터 로딩이 끝났음을 표시
            } catch (error) {
                console.error('오류 발생:', error);
                setLoading(false); // 오류 발생 시에도 로딩 상태 변경
            }
        }
        fetchGoals();
    }, []); // 수정: 의존성 배열 추가

    return (
        <div className={styles.dashBoardContainer}>
            <div className={styles.dashBoardTop}>
                <div className={styles.dashBoardTopLeft}>
                    <h2>대목표</h2>
                    <hr></hr>
                    <div className={styles.bigGoalBanner}>
                        {/* 대목표 배너 */}
                        <Card
                            className={styles.bigGoalName}
                            headerBorder={false}
                        >
                            <p>{bigGoal_state}</p>
                            <br />
                            <br />
                            <span className={styles.name}>{bigGoal_name}</span><span className={styles.nameday}><OneBigGoalDday bigGoal_number={bigGoal_number} /></span>
                            <br />
                            <Progress percent={30} />
                        </Card>
                    </div>
                    {/* 소목표 불러오는 곳 */}
                    <div className={styles.smallGoalTitle}>
                        <h3>소목표</h3>
                        <hr></hr>
                        <SmallGoalCount
                            SmallGoals={SmallGoals}
                            bigGoal_number={bigGoal_number}
                        />
                        <br></br>

                    </div>
                </div>

                <div className={styles.dashBoardTopRight}>
                    소목표 비중 그래프
                    {/* 여기는 소목표 비중 그래프 */}
                </div>
            </div>

            <div className={styles.dashBoardButtom}>
                <SmallGoalModal
                    onSave={handleSmallModalSave}
                    bigGoal_number={bigGoal_number}
                />

                <SmallGoal SmallGoals={SmallGoals} bigGoal_number={bigGoal_number} onSave={handleSmallModalSave} />
            </div>
        </div>
    );
}
