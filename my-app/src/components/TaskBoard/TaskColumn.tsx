import React from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";
import type { Task } from "../../redux/taskSlice";
import TaskCard from "./TaskCard";

interface TaskColumnProps {
  status: "todo" | "inProgress" | "done";
  tasks: Task[];
  title: string;
}

const TaskColumn: React.FC<TaskColumnProps> = ({ status, tasks, title }) => {
  const { setNodeRef } = useDroppable({
    id: status,
  });

  return (
    <div className="task-column">
      <h2 className="column-title">{title}</h2>
      <div
        ref={setNodeRef}
        className="column-content"
      >
        <SortableContext
          items={tasks.map((t) => t.id)}
          strategy={verticalListSortingStrategy}
        >
          {tasks.length === 0 ? (
            <p className="empty-message">No tasks yet</p>
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </SortableContext>
      </div>
    </div>
  );
};

export default TaskColumn;
