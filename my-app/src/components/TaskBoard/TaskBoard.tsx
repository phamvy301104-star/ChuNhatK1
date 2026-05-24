import React from "react";
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import { useAppDispatch, useAppSelector } from "../../context/ReduxContext";
import { moveTask } from "../../redux/taskSlice";
import TaskColumn from "./TaskColumn";
import "./TaskBoard.css";

const TaskBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as "todo" | "inProgress" | "done";

    dispatch(moveTask({ taskId, status: newStatus }));
  };

  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "inProgress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="task-board">
        <h1 className="board-title">Task Management Board</h1>
        <div className="columns-container">
          <TaskColumn status="todo" tasks={todoTasks} title="To Do" />
          <TaskColumn status="inProgress" tasks={inProgressTasks} title="In Progress" />
          <TaskColumn status="done" tasks={doneTasks} title="Done" />
        </div>
      </div>
    </DndContext>
  );
};

export default TaskBoard;
