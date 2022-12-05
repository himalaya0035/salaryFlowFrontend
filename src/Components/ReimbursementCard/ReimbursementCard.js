import React,{useState,useEffect} from "react";
import Modal from "../Modal/Modal";
import Receipt from "../Receipt/Receipt";

function ReimbursementCard({type}) {
  const [showModal, setShowModal] = useState(false);
  const [icon, setIcon] = useState('fa-info-circle');
  const [color, setColor] = useState('text-green-700')
  useEffect(() => {
    if (type === 'food'){
        setIcon('fa-hamburger')
        setColor('text-amber-700')
      }else if (type === 'taxi'){
        setIcon('fa-taxi')
        setColor('text-gray-700')
      }else{
        setIcon('fa-info-circle')
        setColor('text-green-700')
      }
  }, [type])
  

  return (
    <>
    <div onClick={() => setShowModal(true)} className="w-full flex items-center cursor-pointer rounded-md justify-between h-[100px] bg-gray-100 hover:bg-gray-200 transition p-4">
      <div>
        <h3 className="font-[500] text-md">Himalaya Gupta</h3>
        <p className="font-[500] text-gray-600 text-sm">Food Expenses</p>
        <p className="font-[500] text-gray-600 text-[13px]">22 Oct 2022</p>
      </div>
      <div className="text-center">
        <i className={`fa ${icon} text-[25px] ${color}`}></i>
        <p className="text-gray-500 mt-2 font-bold">Rs. 350</p>
      </div>
    </div>
    {showModal && <Modal title='Reimbursement Receipt' setShowModal={setShowModal} width={'500px'} >
        <Receipt/>
      </Modal>}
    </>
  );
}

export default ReimbursementCard;
