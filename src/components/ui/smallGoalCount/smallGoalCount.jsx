import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from '@/components/ui/Card'
import styles from './BigGoalCount.module.css'

export default function smallGoalCount(props) {

    const [SmallGoalsCount, setSmallGoalsCount] = useState(props, []);
    const [isLoading, setLoading] = useState(true); // 로딩 상태를 나타내는 상태 변수
    const userId = '신짱구';





    let completed_count


    
    return (
        <>
            <Card>
                <span>완료</span> <span>{ }개</span><br></br>
                <span>진행</span> <span>{ }개</span><br></br>
                <span>예정</span> <span>{ }개</span><br></br>
            </Card>

        </>
    )
}
