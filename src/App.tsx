import Header from "./components/Header";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store/store";
import { useState } from "react";
import AddWidgetModal from "./components/AddWidgetModal";
import { Category, removeWidget } from "./store/widgetSlice";

function App() {
  const dispatch = useDispatch();

  const categories = useSelector((state: RootState) => state.widget.categories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleRemoveWidget = (categoryId: string, widgetId: string) => {
    dispatch(removeWidget({ categoryId, widgetId }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  // Filter categories based on the search query
  // const filteredCategories = categories.filter((category) =>
  //   category.name.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // Filter widgets based on the search query
  const filteredWidgets = (category: Category) =>
    category.widgets.filter((widget) =>
      widget.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Filter categories to include only those with matching widgets
  const filteredCategories = categories.filter(
    (category) => filteredWidgets(category).length > 0
  );

  return (
    <main className="flex w-full flex-col p-10">
      <Header onSearchChange={handleSearchChange} />

      {filteredCategories.map((category) => (
        <div key={category.id} className="my-8 w-full">
          <h2 className=" font-bold mb-2">{category.name}</h2>
          <div className="flex overflow-x-auto gap-4  w-full">
            {category.widgets.map((widget) => (
              <div
                key={widget.id}
                className="relative py-16 min-w-[430px] bg-white flex flex-col items-center justify-center rounded-md shadow"
              >
                <button
                  className="absolute top-2 right-4 text-xl text-red-600 hover:text-red-800"
                  onClick={() => handleRemoveWidget(category.id, widget.id)}
                >
                  &times;
                </button>
                <h3 className="text-lg font-semibold mb-2">{widget.name}</h3>
                <p>{widget.content}</p>
              </div>
            ))}

            <div className="py-16 min-w-[430px] bg-white flex flex-col items-center justify-center rounded-md shadow">
              <button
                className="font-bold text-sm bg-white p-2 hover:bg-gray-50 hover:scale-[1.01] border border-gray-300 rounded shadow-lg"
                onClick={handleOpenModal}
              >
                + Add Widget
              </button>
            </div>
          </div>
        </div>
      ))}

      <AddWidgetModal isOpen={isModalOpen} onClose={handleCloseModal} />
    </main>
  );
}

export default App;
