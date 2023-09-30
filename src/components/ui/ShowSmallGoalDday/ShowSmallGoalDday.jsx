import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function SmallDday(props) {
    const [Dday, setDday] = useState("");
    const smallGoal_number = props.smallGoal_number;
    useEffect(() => {
        async function fetchDday() {
            const response = await axios.get(`/api/SmallDday?smallGoal_number=${smallGoal_number}`);
            setDday(response.data);
        }
        fetchDday();
    }, [props.props.SmallGoals])
    
  
    // Dday 값이 음수이면 양수로 바꾸고 '+'를 붙여서 출력
    const formattedDday = Dday < 0 ? `+${Math.abs(Dday)}` : Dday;

    return (
        <>
            D-day: {formattedDday}
        </>
    )
}
