import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";

type CallProps = {
  initialValue: string;
  setEditingIdx: () => void;
};

function Call({ initialValue, setEditingIdx }: CallProps) {
  return (
    <div className="flex items-center gap-2 bg-white rounded shadow p-2">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full">
        {initialValue}
      </h4>
      <Button variant="outline" onClick={() => setEditingIdx()}>
        <Pencil size={24} />
      </Button>
    </div>
  );
}

export default Call;
