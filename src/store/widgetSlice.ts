// src/store/widgetSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initialData } from "../data";

interface Widget {
  id: string;
  name: string;
  content: string;
  selected?: boolean;
}

export interface Category {
  id: string;
  name: string;
  navlink: string;
  widgets: Widget[];
}

interface WidgetState {
  categories: Category[];
}

const localStorageKey = "widgetData";

const getInitialState = (): WidgetState => {
  const storedData = localStorage.getItem(localStorageKey);
  return storedData ? JSON.parse(storedData) : initialData;
};

const widgetSlice = createSlice({
  name: "widget",
  initialState: getInitialState(),
  reducers: {
    toggleWidgetSelection: (
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.map((widget) =>
          widget.id === widgetId
            ? { ...widget, selected: !widget.selected }
            : widget
        );
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },
    addWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widget: Widget }>
    ) => {
      const { categoryId, widget } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets.push({ ...widget, selected: true });
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },

    removeWidget: (
      state,
      action: PayloadAction<{ categoryId: string; widgetId: string }>
    ) => {
      const { categoryId, widgetId } = action.payload;
      const category = state.categories.find((cat) => cat.id === categoryId);
      if (category) {
        category.widgets = category.widgets.filter(
          (widget) => widget.id !== widgetId
        );
        localStorage.setItem(localStorageKey, JSON.stringify(state));
      }
    },

    confirmWidgetChanges: (state) => {
      state.categories = state.categories.map((category) => ({
        ...category,
        widgets: category.widgets.filter((widget) => widget.selected !== false),
      }));
      localStorage.setItem(localStorageKey, JSON.stringify(state));
    },
  },
});

export const {
  toggleWidgetSelection,
  addWidget,
  removeWidget,
  confirmWidgetChanges,
} = widgetSlice.actions;
export default widgetSlice.reducer;
