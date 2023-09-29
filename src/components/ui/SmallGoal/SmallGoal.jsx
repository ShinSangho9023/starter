import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import Button from '@/components/ui/Button';
import axios from 'axios';
import styles from './SmallGoal.module.css'
import Card from '@/components/ui/Card'
import SmallDday from '../SmallDday/SmallDday'

export default function SmallGoal(props) {
    const [SmallGoals, setSmallGoals] = useState(props.SmallGoals || []);
    const [isLoading, setLoading] = useState(true);
    
    
    const handleButtonClick = () => {
        // 버튼 클릭 시 다른 경로로 이동
        navigate('/single-menu-view');
    };

    const cardFooter = (
        <div className="flex justify-end">
            <Button
                size="sm"
                className="ltr:mr-2 rtl:ml-2"
                variant="twoTone"
                icon={<HiOutlinePencil />}
                onClick={handleButtonClick}
            >
                수정
            </Button>
            <Button
                size="sm"
                variant="twoTone"
                color="red-600"
                icon={<MdDeleteForever />}
                onClick={handleButtonClick}
            >
                삭제
            </Button>
        </div>
    );
    
    // 소목표가 추가 될 때마다 다시 한번 소목표를 불러옴.
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(
                    `/api/user/smallGoals?user_id=${props.user_id}&bigGoal_name=${props.bigGoal_name}&bigGoal_number=${props.bigGoal_number}`
                );
                setSmallGoals(response.data);
                setLoading(false); // 데이터 로딩이 끝났음을 표시
                console.log('서버로 소목표 값을 가져오는 걸 확인');
            } catch (error) {
                console.error('오류 발생:', error);
                setLoading(false); // 오류 발생 시에도 로딩 상태 변경
            }
        }
        fetchGoals();
    }, [props.SmallGoals]);

    return (
        <div className={styles.smallGoalContainer}>
            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className={styles.goalListContainer}>
                    {SmallGoals && SmallGoals.length > 0 ? (
                        SmallGoals.map((goal, index) => (
                            <Card
                                key={`goal-${index}`}
                                className={styles.smallGoalCard}
                                header={goal.smallGoal_name}
                                footer={cardFooter}
                            >
                                {/* 목표 정보 표시 */}
                                <p>{goal.smallGoal_check}</p>
                                <p>
                                    시작 날짜:{' '}
                                    {goal.smallGoal_startDate
                                        ? new Date(
                                            goal.smallGoal_startDate
                                        ).toLocaleDateString()
                                        : '날짜 없음'}
                                </p>
                                <p>
                                    종료 날짜:{' '}
                                    {goal.smallGoal_endDate
                                        ? new Date(
                                            goal.smallGoal_endDate
                                        ).toLocaleDateString()
                                        : '날짜 없음'}
                                </p>
                                <SmallDday smallGoal_number={goal.smallGoal_number} />
                            </Card>
                        ))
                    ) : (
                        <p>목록이 비어 있습니다.</p>
                    )}
                </div>
            )}
        </div>
    );
}
