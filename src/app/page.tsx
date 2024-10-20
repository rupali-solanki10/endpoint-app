"use client";
import Image from "next/image";
import styles from "./page.module.css";
import * as React from "react";
import Task from "@/app/components/task/task";
import { getToDoList, updateToDo } from "./api";
import { Task as TaskType, TaskUpdatePayload } from "@/app/types/task";

const isOverdue = (date: string) => {
  const today = new Date();
  const taskdate = new Date(date);
  return taskdate < today;
};

export default function Home() {
  const [todoList, setTodoList] = React.useState<TaskType[]>([]);

  const filterToDos = (list: TaskType[]): TaskType[] => {
    const completedList: TaskType[] = [];
    const overdueList: TaskType[] = [];
    const dueList: TaskType[] = [];
    const sortedToDoList = list.sort((a: TaskType, b: TaskType) => {
      const aTaskdate = new Date(a.dueDate);
      const bTaskdate = new Date(b.dueDate);
      return bTaskdate < aTaskdate ? -1 : 1;
    });

    sortedToDoList.forEach((item) => {
      const { dueDate, isComplete } = item;
      if (isComplete) {
        completedList.push(item);
      } else if (isOverdue(dueDate)) {
        overdueList.push(item);
      } else {
        dueList.push(item);
      }
    });
    return [...overdueList, ...dueList, ...completedList];
  };

  const filteredToDoList = React.useMemo(
    () => filterToDos(todoList),
    [todoList]
  );

  React.useEffect(() => {
    try {
      (async () => {
        const data = await getToDoList();
        setTodoList(data);
      })();
    } catch (e) {}
  }, []);

  const updateToDoList = (data: TaskUpdatePayload) => {
    try {
      (async () => {
        const { status } = await updateToDo(data);
        if (status) {
          const { id } = data;
          const newList: TaskType[] = [...todoList];
          const index = newList.findIndex((element) => element.id === id);
          newList[index] = { ...newList[index], ...data };
          setTodoList(newList);
        }
      })();
    } catch (e) {}
  };

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        {filteredToDoList.map((item: TaskType) => {
          const { description, dueDate, id, isComplete } = item;
          return (
            <Task
              description={description}
              dueDate={dueDate}
              id={id}
              isComplete={isComplete}
              updateToDoList={updateToDoList}
              key={id}
            />
          );
        })}
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
