import React, { useState } from "react";
import AddWidgetModal from "./AddWidgetModal";
import { Search } from "lucide-react";

type HeaderProps = {
  onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const Header: React.FC<HeaderProps> = ({ onSearchChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="relative">
      <div className="flex justify-between items-center ">
        <h1 className="text-xl font-bold">CNAPP Dashboard</h1>
        <div className="flex gap-4 items-center mt-4 md:mt-0">
          <div className="flex items-center p-2 gap-2 border bg-white rounded-lg ">
            <Search color="gray" />
            <input
              type="text"
              placeholder="Search Widgets"
              onChange={onSearchChange}
              className=" border-none focus:outline-none text-sm"
            />
          </div>
          <button
            className="font-bold text-sm bg-white p-2 hover:bg-gray-50 hover:scale-[1.01] rounded-lg"
            onClick={handleOpenModal}
          >
            Add Widget +
          </button>
        </div>
      </div>
      <AddWidgetModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default Header;
