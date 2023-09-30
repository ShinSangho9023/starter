import React, { useState } from 'react';
import Modal from 'react-modal';
import { Button, Input } from '@/components/ui';
import Progress from '@/components/ui/Progress'
import styles from './SmallGoalInfoModal.module.css'

const modalStyle = {
    overlay: {
        zIndex: 9999,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
        width: '400px',
        height: '400px',
        margin: 'auto',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'spaceBetween',
        alignItems: 'center',
        padding: '10px',
        border: 'none',
    },
};

Modal.setAppElement('#root');

export default function SmallGoalInfoModal(props) {
    // 모달의 열고 닫는 상태를 관리
    const [isOpen, setIsOpen] = useState(props.isOpen || false);
    // 폼 데이터 상태
    const [formData, setFormData] = useState({
        smallGoal_name: null,
        smallGoal_startDate: '',
        smallGoal_endDate: '',
        smallGoal_number: props.SmallGoalId,
        bigGoal_number: props.bigGoal_number
    });


    // 모달 닫기
    const closeModal = () => {
        setIsOpen(false);
        props.closeModal();
    };


    return (
        <div className={styles.container}>
            <Modal
                isOpen={isOpen}
                onRequestClose={closeModal}
                contentLabel="소목표 팝업"
                style={modalStyle}
            >
                <h2>소목표 정보</h2>
                <div className={styles.progresscircle}>
                    <h4>한 주 단위 이행률 그래프</h4>
                    <div className="md:inline-flex items-center">
                        
                        <Progress
                            variant="circle"
                            percent={70}
                            gapDegree={70}
                            gapPosition="bottom"
                            width={200}
                        />
                    </div>
                    <Button variant="solid" onClick={closeModal}>
                        닫기
                    </Button>
                </div>
                <br />
            </Modal>
        </div>
    )
}
