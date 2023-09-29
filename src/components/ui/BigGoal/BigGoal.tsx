import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Card from '@/components/ui/Card'
import styles from './BigGoal.module.css'
import Button from '@/components/ui/Button'
import { MdDeleteForever } from 'react-icons/md'
import { HiOutlinePencil } from 'react-icons/hi'
import { Link, useNavigate } from 'react-router-dom'
import {
    protectedRoutes,
    getProtectedRoutes,
    updateProtectedRoutes,
} from '@/configs/routes.config/routes.config'
import { lazy } from 'react'
import Dday from '../Dday/Dday.jsx'

const BigGoal = (props) => {
    // 상태 변수 정의
    const [BigGoals, setGoals] = useState(props.BigGoals || [])
    const [isLoading, setLoading] = useState(true) // 로딩 상태를 나타내는 상태 변수
    const userId = '신짱구'
    const navigate = useNavigate()

    const handleButtonClick = () => {
        // 버튼 클릭 시 다른 경로로 이동
        navigate('/single-menu-view')
    }

    const handleDeleteClick = async (BigGoalId) => {
        try {
            // 삭제 요청을 서버에 보냄 (smallGoalId는 삭제할 카드의 고유 식별자)
            await axios.delete(`/api/user/BigGoals/delete/${BigGoalId}`)

            // 삭제한 카드를 상태에서 제거
            const updatedSmallGoals = BigGoals.filter(
                (goal) => goal.bigGoal_number !== BigGoalId
            )
            setGoals(updatedSmallGoals)
            props.onSave(BigGoals)
        } catch (error) {
            console.error('오류 발생:', error)
        }
    }

    const cardFooter = (BigGoalId) => (
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
              onClick={() => handleDeleteClick(BigGoalId)}
          >
              삭제
          </Button>
      </div>
  );

    // 대목표 불러오기
    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(
                    `/api/BigGoals?userId=${userId}`
                )
                setGoals(response.data)
                setLoading(false) // 데이터 로딩이 끝났음을 표시

                // BigGoals를 사용하여 protectedRoutes 업데이트
                const newProtectedRoutes = BigGoals.map((goal) => {
                    return {
                        key: goal.bigGoal_number,
                        path: '/user/bigGoal/:user_id/:bigGoal_name/:bigGoal_number/:bigGoal_state',
                        component: lazy(
                            () => import('@/views/demo/BigGoalDashBoard')
                        ), // 라우트에 해당하는 컴포넌트를 여기에 추가
                        authority: [],
                    }
                })

                const updatedProtectedRoutes = [
                    ...protectedRoutes,
                    ...newProtectedRoutes,
                ]
                // protectedRoutes 업데이트
                updateProtectedRoutes(updatedProtectedRoutes)
            } catch (error) {
                console.error('오류 발생:', error)
                setLoading(false) // 오류 발생 시에도 로딩 상태 변경
            }
        }

        // props.BigGoals의 변경 감지
        fetchGoals()
    }, [props.BigGoals])

    return (
        <div className={styles.BigGoalContainer}>
            {/* <h1>대목표 목록</h1> */}
            {isLoading ? (
                <p>Loading...</p> // 로딩 중일 때 표시할 내용
            ) : (
                <div className={styles.goalListContainer}>
                    {BigGoals && BigGoals.length > 0 ? (
                        BigGoals.map((goal) => (
                            <Card
                                key={goal.bigGoal_number}
                                className={styles.bigGoalCard}
                                header={goal.bigGoal_name}
                                footer={cardFooter(goal.bigGoal_number)} // 카드의 고유 식별자를 전달
                            >
                                <Link
                                    to={`/user/bigGoal/${goal.user_id}/${goal.bigGoal_name}/${goal.bigGoal_number}/${goal.bigGoal_state}`}
                                >
                                    {/* 목표 정보 표시 */}
                                    <p>{goal.bigGoal_state}</p>
                                    <p>
                                        시작 날짜:{' '}
                                        {goal.bigGoal_startDate
                                            ? new Date(
                                                  goal.bigGoal_startDate
                                              ).toLocaleDateString()
                                            : '날짜 없음'}
                                    </p>
                                    <p>
                                        종료 날짜:{' '}
                                        {goal.bigGoal_endDate
                                            ? new Date(
                                                  goal.bigGoal_endDate
                                              ).toLocaleDateString()
                                            : '날짜 없음'}
                                    </p>
                                    <p>
                                        <Dday
                                            bigGoal_number={goal.bigGoal_number}
                                        />
                                    </p>
                                </Link>
                            </Card>
                        ))
                    ) : (
                        <p>목록이 비어 있습니다.</p>
                    )}
                </div>
            )}
        </div>
    )
}

export default BigGoal
