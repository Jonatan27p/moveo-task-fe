import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Ban, Pencil, Save } from "lucide-react";
import { useState } from "react";

type TagProps = {
  disabled: boolean;
  initialValue: string;
  setEditingIdx: () => void;
  onSave: (value: string) => void;
  onCancel: () => void;
};

function Tag({
  disabled,
  initialValue,
  setEditingIdx,
  onSave,
  onCancel,
}: TagProps) {
  const [tag, setTag] = useState(initialValue);

  return (
    <div className="flex items-center gap-2 bg-white rounded shadow p-2">
      <Input
        disabled={disabled}
        type="text"
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        className="border-none text-gray-700 shadow-none font-medium"
      />
      {disabled ? (
        <Button variant="outline" onClick={() => setEditingIdx()}>
          <Pencil size={24} />
        </Button>
      ) : (
        <>
          <Button variant="outline" onClick={() => onSave(tag)}>
            <Save size={24} />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setTag(initialValue);
              onCancel();
            }}
          >
            <Ban size={24} />
          </Button>
        </>
      )}
    </div>
  );
}

export default Tag;
