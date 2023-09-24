import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export default function BigGoalDashBoard() {
    // useParams 훅을 사용하여 URL의 경로 매개변수를 가져옴
    const { user_id, bigGoal_name, key } = useParams()

    if (!user_id || !bigGoal_name || !key) {
        // user_id 또는 bigGoal_name이 없을 때 처리할 내용을 추가합니다.
        return <div>유효한 매개변수가 없습니다.</div>
    }
    const [SmallGoals, setSmallGoals] = useState([])
    const [isLoading, setLoading] = useState(true) // 로딩 상태를 나타내는 상태 변수

    useEffect(() => {
        async function fetchGoals() {
            try {
                const response = await axios.get(
                    `/api/user/smallGoals?userId=${user_id}&bigGoalName=${bigGoal_name}&key=${key}`
                )
                setSmallGoals(response.data)
                setLoading(false) // 데이터 로딩이 끝났음을 표시
                console.log('소목표 서버에서 넘어온 값 :', response.data)
            } catch (error) {
                console.error('오류 발생:', error)
                setLoading(false) // 오류 발생 시에도 로딩 상태 변경
            }
          }
          fetchGoals();
        }, [])

    return (
        <div>
            <h1>User ID: {user_id}</h1>
            <h1>Big Goal Name: {bigGoal_name}</h1>
            <h1>Big Goal Name: {key}</h1>
            {/* 나머지 컴포넌트 내용 */}



        </div>
    )
}
