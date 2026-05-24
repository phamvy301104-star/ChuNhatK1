import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { removeTask } from "../../redux/taskSlice";
import type { Task } from "../../redux/taskSlice";
import { useAppDispatch } from "../../context/ReduxContext";

interface TaskCardProps {
  task: Task;
}

const TaskCard: React.FC<TaskCardProps> = ({ task }) => {
  const dispatch = useAppDispatch();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(removeTask(task.id));
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="task-card"
    >
      <div className="task-card-header">
        <h3 className="task-title">{task.title}</h3>
        <button className="delete-btn" onClick={handleDelete} title="Delete task">
          ✕
        </button>
      </div>
      <span className="task-status">{task.status}</span>
    </div>
  );
};

export default TaskCard;
