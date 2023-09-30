import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button, Input } from '@/components/ui';
import DatePicker from '@/components/ui/DatePicker';

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

export default function SmallGoalModal(props) {
  
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

  // 값 입력될 때 폼 데이터로 저장
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // 시작 날짜 선택 이벤트 핸들러
  const handleDatePickerChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      smallGoal_startDate: newDate,
    }));
  };

  // 종료 날짜 선택 이벤트 핸들러
  const handleEndDatePickerChange = (newDate) => {
    setFormData((prevData) => ({
      ...prevData,
      smallGoal_endDate: newDate,
    }));
  };

  // 모달 닫기
  const closeModal = () => {
    setIsOpen(false);
    props.closeModal();
  };

  // 전송 버튼 클릭 시 처리
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios를 사용하여 데이터를 전송
      await axios.post('/api/SmallGoal/Update', formData);

      // 목표 저장 후 onSave 콜백 호출
      if (props.props.onSave) {
        props.props.onSave(formData);
      }
    } catch (error) {
      console.error('오류 발생:', error);
    }
    props.closeModal(); // 부모 값 변경
    closeModal(); // 모달 닫기
  };
  
    return (
        <div>
        <Modal
          isOpen={isOpen}
          onRequestClose={closeModal}
          contentLabel="모달 창"
          style={modalStyle}
        >
          <h2>소목표를 입력하세요</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">소목표 이름:</label>
            <Input
              type="text"
              id="name"
              name="smallGoal_name"
              value={formData.smallGoal_name}
              onChange={handleChange}
            />
  
            <label htmlFor="name">시작 날짜:</label>
            <DatePicker
              id="name"
              name="smallGoal_startDate"
              value={formData.smallGoal_startDate}
              onChange={handleDatePickerChange}
            />
  
            <label htmlFor="name">종료 날짜:</label>
            <DatePicker
              id="name"
              name="smallGoal_endDate"
              value={formData.smallGoal_endDate}
              onChange={handleEndDatePickerChange}
            />
  
            <Button type="submit" variant="solid">
              전송
            </Button>
  
            <Button variant="solid" onClick={closeModal}>
              닫기
            </Button>
          </form>
        </Modal>
      </div>
  )
}
