// src/components/AddWidgetModal.tsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import {
  toggleWidgetSelection,
  addWidget,
  confirmWidgetChanges,
} from "../store/widgetSlice";

interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.widget.categories);
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    categories[0].id
  );
  const [newWidget, setNewWidget] = useState({ name: "", content: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId);
  };

  const handleCheckboxToggle = (widgetId: string) => {
    dispatch(
      toggleWidgetSelection({ categoryId: selectedCategoryId, widgetId })
    );
  };

  const handleAddWidget = () => {
    if (newWidget.name && newWidget.content) {
      const widget = {
        id: new Date().toISOString(),
        name: newWidget.name,
        content: newWidget.content,
      };
      dispatch(addWidget({ categoryId: selectedCategoryId, widget }));
      setNewWidget({ name: "", content: "" });
      setIsDialogOpen(false);
      onClose();
    }
  };

  const handleConfirm = () => {
    dispatch(confirmWidgetChanges());
    onClose();
  };

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-end">
      <div
        className="w-[60%] h-full bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="w-[40%] h-full flex flex-col justify-between bg-white overflow-auto ">
        <div className="w-full ">
          <div className="bg-blue-900 px-5 py-3 flex justify-between items-center w-full">
            <h2 className="text-lg text-white font-bold ">Add Widgets</h2>
            <button className="text-white text-2xl" onClick={onClose}>
              X
            </button>
          </div>

          <p className="my-4 px-5">
            Personalise your dashboard by adding the following widgets
          </p>
          <div className="flex mb-4 px-5">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`mr-4 p-2 ${
                  selectedCategoryId === category.id
                    ? "font-bold  border-b-2 border-blue-900"
                    : "font-normal"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.navlink}
              </button>
            ))}
          </div>

          <div className="px-9">
            {categories
              .find((category) => category.id === selectedCategoryId)
              ?.widgets.map((widget) => (
                <div
                  key={widget.id}
                  className="flex items-center p-2 border bprder-gray-300 mb-2"
                >
                  <input
                    type="checkbox"
                    checked={widget.selected !== false}
                    onChange={() => handleCheckboxToggle(widget.id)}
                    className="mr-2"
                  />
                  <span>{widget.name}</span>
                </div>
              ))}
            <div className="flex w-full mt-5 justify-end">
              <button
                className="bg-white border border-gray-300 shadow-mg  rounded px-2 py-1 hover:bg-gray-100 flex  justify-end text-sm "
                onClick={() => setIsDialogOpen(true)}
              >
                + Add New Widget
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-4 w-full justify-end mb-5 px-5">
          <button
            className="mt-4 px-5 py-2 border text-xs  hover:bg-gray-200 border-gray-500 rounded-md"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="mt-4  px-5 py-2 border  text-xs bg-blue-900 text-white hover:bg-blue-800 border-gray-500 rounded-md"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>

      {isDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h3 className="text-lg font-bold mb-4">Add New Widget</h3>
            <input
              type="text"
              placeholder="Widget Name"
              value={newWidget.name}
              onChange={(e) =>
                setNewWidget({ ...newWidget, name: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <textarea
              placeholder="Widget Content"
              value={newWidget.content}
              onChange={(e) =>
                setNewWidget({ ...newWidget, content: e.target.value })
              }
              className="mb-2 p-2 border rounded w-full"
            />
            <button
              className="mr-2 p-2 bg-blue-500 text-white rounded"
              onClick={handleAddWidget}
            >
              Add Widget
            </button>
            <button
              className="p-2 bg-gray-300 rounded"
              onClick={() => setIsDialogOpen(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  ) : null;
};

export default AddWidgetModal;
