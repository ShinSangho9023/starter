import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import Button from '@/components/ui/Button';
import styles from './modal.module.css'

// 모달 스타일을 미리 정의합니다.
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
    border: 'none', // 모달의 기본 테두리를 제거.
  },
  title: { // title 스타일 추가
    backgroundColor: 'red'
    // 기타 원하는 스타일 속성을 추가할 수 있습니다.
  }
};

Modal.setAppElement('#root'); // 모달을 루트 엘리먼트에 연결 스크린 리더가 읽기 편하게 뒷 화면을 잠그는 기능

export default function GoalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
  });

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Axios를 사용하여 데이터를 전송
      const response = await axios.post('/api/goal', formData);
      console.log('전송 결과:', response.data);
    } catch (error) {
      console.error('전송 오류:', error);
    }
    closeModal(); // 모달 닫기
  };

  return (
    <div>
      <Button variant="solid" onClick={openModal}>
        목표 등록
      </Button>
      <Modal
        isOpen={isOpen}
        onRequestClose={closeModal}
        contentLabel="모달 창"
        style={modalStyle} // 정의한 스타일을 적용합니다.
      >
        <div className={styles.titleDiv}>
          <h2 className={styles.title}>대목표를 입력하세요</h2>
        </div>
        <form className={styles.formDiv} onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">대목표 이름:</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="email">이메일:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className={styles.down}>
            <Button variant="solid" type="submit">
              전송
            </Button>
            <Button variant="solid" onClick={closeModal}>
              닫기
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
