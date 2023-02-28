import { Modal } from "antd";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

interface IProps {
  isOpen?: boolean;
}

const ErrorModal = (props: IProps) => {
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen } = props;

  //   const showModal = () => {
  //     setIsModalOpen(true);
  //   };

  //   const handleOk = () => {
  //     setIsModalOpen(false);
  //   };

  //   const handleCancel = () => {
  //   setIsModalOpen(false);
  //   };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <Modal
        title="Error"
        open={isOpen}
        okButtonProps={{ href: "/" }}
        footer={null}
        // onOk={handleOk}
        // onCancel={handleCancel}
      >
        <p>Something went wrong. Try to reload.</p>
      </Modal>
    </>
  );
};

export default ErrorModal;
