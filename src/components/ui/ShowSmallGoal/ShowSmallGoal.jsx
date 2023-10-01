import React, { useState, useEffect } from 'react';
import { MdDeleteForever } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import { AiOutlineInfoCircle } from "react-icons/ai";
import Button from '@/components/ui/Button';
import axios from 'axios';
import styles from './SmallGoal.module.css'
import Card from '@/components/ui/Card'
import SmallDday from '../ShowSmallGoalDday/ShowSmallGoalDday'
import SmallGoalModal from '../UpDateModal/UpdateSmallGoalModal/UpdateSmallGoalModal'
import SmallGoalInfoModal from '../SmallGoalInfoModal/SmallGoalInfoModal'
import ConfirmDialog from '../ConfirmDialog/ConfirmDialog'
export default function SmallGoal(props) {
    const [SmallGoals, setSmallGoals] = useState(props.SmallGoals || []);
    const [isLoading, setLoading] = useState(true);
    const [SmallGoalId, setSmallGoalId] = useState();
    
    // 상태로 수정 모달 열기/닫기 상태 랜더링 관리
    const [isOpen, setIsOpen] = useState(false)
    
    // 정보 모달 랜더링 관리
    const [openinfo, setopeninfo] = useState(false);
    
    // 다일로그 삭제모달 열기/닫기 관리 하는 버튼
    const [dialogIsOpen, setdialogIsOpen] = useState(false);
    
    // 다일로그 열기
    const openDialog = (smallGoalId) => {
        setdialogIsOpen(true)
        setSmallGoalId(smallGoalId)
    }
    // 다일로그 닫기
    const onDialogClose = () => {
        setdialogIsOpen(false)
    }

    // 수정 버튼 클릭 시 모달 열기
    const handleButtonClick = (smallGoalId) => {
        if (!isOpen) {
            setIsOpen(true);
            setSmallGoalId(smallGoalId);
        }
    }

    // 카드를 호버할 때 모달 열기
    const handleModalHover = (smallGoalId) => {
        if (!openinfo) {
            setopeninfo(true);
            console.log("정보 모달 함수 온");
            // 여기에서 smallGoalId 또는 다른 필요한 작업을 수행할 수 있습니다.
        }
    }


    // 모달 닫기 함수
    const closeModal = () => {
        setIsOpen(false)
    }

    const closeinfoModal = () => {
        setopeninfo(false)
    }

    const handleDeleteClick = async (smallGoalId) => {
        try {
            // 삭제 요청을 서버에 보냄 (smallGoalId는 삭제할 카드의 고유 식별자)
            await axios.delete(`/api/user/smallGoals/delete/${smallGoalId}`);

            // 삭제한 카드를 상태에서 제거
            const updatedSmallGoals = SmallGoals.filter((goal) => goal.smallGoal_number !== smallGoalId);
            setSmallGoals(updatedSmallGoals);
            props.onSave(SmallGoals);
        } catch (error) {
            console.error('오류 발생:', error);
        }
    };

    const cardFooter = (smallGoalId) => (
        <div className="flex justify-center space-x-2">
            <Button
                size="sm"
                variant="twoTone"
                color="green-600"
                icon={<AiOutlineInfoCircle />}
                onClick={() => handleModalHover(smallGoalId)}
            >
                정보
            </Button>

            <Button
                size="sm"
                className="ltr:mr-2 rtl:ml-2"
                variant="twoTone"
                icon={<HiOutlinePencil />}
                onClick={() => handleButtonClick(smallGoalId)}
            >
                수정
            </Button>

            <Button
                size="sm"
                variant="twoTone"
                color="red-600"
                icon={<MdDeleteForever />}
                onClick={() => openDialog(smallGoalId)}
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
                    `/api/user/smallGoals?bigGoal_number=${props.bigGoal_number}`
                );
                setSmallGoals(response.data);
                setLoading(false); // 데이터 로딩이 끝났음을 표시
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
                                footer={cardFooter(goal.smallGoal_number)} // 카드의 고유 식별자를 전달
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
                                <SmallDday smallGoal_number={goal.smallGoal_number} props={props} />
                            </Card>
                        ))
                    ) : (
                        <p>목록이 비어 있습니다.</p>
                    )}
                </div>
            )}
            {/* 수정하는 SmallGoalModal 컴포넌트를 조건부 렌더링 */}
            {isOpen && (
                <SmallGoalModal
                    isOpen={isOpen}
                    closeModal={closeModal}
                    SmallGoalId={SmallGoalId}
                    bigGoal_number={props.bigGoal_number}
                    props={props}
                />
            )}

            {/* 정보를 보여주는 정보 인포 컴포넌트를 조건부 렌더링 */}
            {openinfo && (
                <SmallGoalInfoModal
                    isOpen={openinfo}
                    closeModal={closeinfoModal}
                />
            )}
            {dialogIsOpen && (
                <ConfirmDialog dialogIsOpen={dialogIsOpen} onClose={onDialogClose} delete={() => handleDeleteClick(SmallGoalId)} />
            )}
        </div>
    );
}
