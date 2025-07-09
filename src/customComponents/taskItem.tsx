import type { Task } from "@/api/task";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type TaskItemProps = { task: Task; updateTask: (value: string) => void };

function TaskItem({ task, updateTask }: TaskItemProps) {
  const [position, setPosition] = useState(task.status);

  return (
    <div className="flex items-baseline justify-start gap-2 bg-white rounded shadow p-2">
      <h4 className="w-full">{task.name}</h4>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[100px]">
            {position}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Task Status</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={position}
            onValueChange={(value) => {
              console.log("value", value);
              setPosition(value);
              updateTask(value);
            }}
          >
            <DropdownMenuRadioItem value="pending">
              Pending
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="in-progress">
              In-Progress
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="done">Done</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default TaskItem;
