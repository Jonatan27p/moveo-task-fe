// src/pages/AdminPage.jsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Tag from "@/customComponents/tag";
import { Label } from "@radix-ui/react-label";
import React, { useState } from "react";

export default function AdminPage() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() !== "" && !tags.includes(tag)) {
      setTags([...tags, tag.trim()]);
      setTag("");
    }
  };

  const handleUpdate = (newValue: string) => {
    if (
      editingIndex === null ||
      newValue.trim() === "" ||
      tags.includes(newValue)
    )
      return;

    const updated = [...tags];
    updated[editingIndex] = newValue;
    setTags(updated);
    setEditingIndex(null);
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex flex-col w-1/3 items-baseline justify-start min-h-screen p-6 gap-9">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2"
        >
          <Label htmlFor="tag">Tag</Label>
          <Input
            type="text"
            value={tag}
            onChange={(e) => setTag(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <Button type="submit" variant="outline">
            submit
          </Button>
        </form>

        <div className="w-full space-y-2">
          {tags.length > 0 && (
            <>
              {tags.map((t, idx) => (
                <Tag
                  key={idx}
                  initialValue={t}
                  setEditingIdx={() => setEditingIndex(idx)}
                  onSave={handleUpdate}
                  onCancel={() => setEditingIndex(null)}
                  disabled={editingIndex !== idx}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
