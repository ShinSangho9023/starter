import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './BigGoalDashBoard.module.css'
import { Card } from '@/components/ui'
import { Link, useNavigate } from 'react-router-dom'
import Button from '@/components/ui/Button'
import { MdDeleteForever } from 'react-icons/md'
import { HiOutlinePencil } from 'react-icons/hi'
import Progress from '@/components/ui/Progress'
import SmallGoalModal from '../../components/ui/Modal/SmallGoalModal.jsx'

export default function BigGoalDashBoard() {
    const [SmallGoals, setSmallGoals] = useState([])
    const [isLoading, setLoading] = useState(true) // 로딩 상태를 나타내는 상태 변수
    const navigate = useNavigate()
    const userId = '신짱구'

    // useParams 훅을 사용하여 URL의 경로 매개변수를 가져옴
    const { user_id, bigGoal_name, bigGoal_number } = useParams()

    // 모달에서 목표를 저장할 때 호출되는 함수
    const handleSmallModalSave = (newGoal) => {
        // 새로운 목표를 목록에 추가
        const newSmallGoals = [...SmallGoals, newGoal] // 새로운 배열 생성
        setSmallGoals(newSmallGoals) // 상태 업데이트
    }

    console.log('파람 값 확인', user_id, bigGoal_name, bigGoal_number)
    if (!user_id || !bigGoal_name || !bigGoal_number) {
        // user_id 또는 bigGoal_name이 없을 때 처리할 내용을 추가합니다.
        return <div>유효한 매개변수가 없습니다.</div>
    }

    const handleButtonClick = () => {
        // 버튼 클릭 시 다른 경로로 이동
        navigate('/single-menu-view')
    }

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
    )

    //소목표 목록을 불러옴.
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(
                    `/api/user/smallGoals?user_id=${user_id}&bigGoal_name=${bigGoal_name}&bigGoal_number=${bigGoal_number}`
                )
                setSmallGoals(response.data)
                setLoading(false) // 데이터 로딩이 끝났음을 표시
                console.log('소목표 서버에서 넘어온 값 :', response.data)
            } catch (error) {
                console.error('오류 발생:', error)
                setLoading(false) // 오류 발생 시에도 로딩 상태 변경
            }
        }
        fetchGoals()
    }, [])

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
                            <br />
                            <br />
                            <h1>{bigGoal_name}</h1>
                            <br />
                            <Progress percent={30} />
                        </Card>
                    </div>
                </div>

                <div className={styles.dashBoardTopRight}>
                    소목표 비중 그래프
                    {/*여기는 소목표 비중 그래프 */}
                </div>
            </div>

            <div className={styles.dashBoardButtom}>
                {/* 소목표 불러오는 곳 */}
                <div className={styles.smallGoalTitle}>
                    <h3>소목표</h3>
                    <hr></hr>
                    <br></br>
                    <SmallGoalModal
                        onSave={handleSmallModalSave}
                        bigGoal_number={bigGoal_number}
                    />
                </div>
                <div className={styles.smallGoalContainer}>
                    {/* <h1>대목표 목록</h1> */}
                    {isLoading ? (
                        <p>Loading...</p> // 로딩 중일 때 표시할 내용
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
                                    </Card>
                                ))
                            ) : (
                                <p>목록이 비어 있습니다.</p>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
