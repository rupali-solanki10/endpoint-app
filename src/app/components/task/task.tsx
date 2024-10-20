import * as React from "react";
import styles from "./task.module.css";
import { Task as TaskType, TaskUpdatePayload } from "@/app/types/task";

const Task = ({
  description,
  dueDate,
  isComplete,
  id,
  updateToDoList,
}: TaskType & { updateToDoList: (data: TaskUpdatePayload) => void }) => {
  const today = new Date();
  const taskdate = new Date(dueDate);
  const isOverDue = taskdate < today;

  const handleToDoChange = () => {
    const payload = { id, isComplete: !isComplete };
    updateToDoList(payload);
  };

  return (
    <article
      className={`${styles.task} ${
        isComplete ? styles.complete : isOverDue ? styles.overdue : ""
      }`}
    >
      <div>
        <input
          id={id}
          type="checkbox"
          checked={isComplete}
          className={styles.checkbox}
          onChange={handleToDoChange}
        />
        <span className={`${isComplete ? styles.cancelled : ""}`}>
          {description}
        </span>
      </div>
      <div
        className={styles.date}
      >{`${taskdate.getMonth()}/${taskdate.getDate()}/${taskdate.getFullYear()}`}</div>
    </article>
  );
};
export default React.memo(Task);
