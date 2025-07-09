import type { Call } from "@/api/call";
import { createTask, fetchTasks, updateTask, type Task } from "@/api/task";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import TaskItem from "./taskItem";

type TaskProps = { call: Call };

function Tasks({ call }: TaskProps) {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetchAndSetTasks();
  }, []);

  async function fetchAndSetTasks() {
    const fetchedTags = await fetchTasks(call.id);
    setTasks(fetchedTags);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim() !== "" && !tasks.some((t) => t.name === task)) {
      setTask("");
      await createTask(call.id, task.trim());
      fetchAndSetTasks();
    }
  };

  return (
    <div className="flex flex-col items-baseline justify-start min-h-screen gap-9">
      <form onSubmit={handleSubmit} className="flex w-full items-center gap-2">
        <Label htmlFor="tag">Task</Label>
        <Input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="border rounded px-2 py-1"
        />
        <Button type="submit" variant="outline">
          submit
        </Button>
      </form>
      <div className="w-full space-y-2">
        {tasks.length > 0 && (
          <>
            {tasks.map((task) => (
              <TaskItem
                task={task}
                updateTask={(value: string) => updateTask(task.id, value)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default Tasks;
