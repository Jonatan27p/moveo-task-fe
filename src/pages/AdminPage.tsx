// src/pages/AdminPage.jsx
import { createTag, fetchTags, updateTag, type Tag } from "@/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import TagItem from "@/customComponents/tag";
import { Label } from "@radix-ui/react-label";
import React, { useEffect, useState } from "react";

export default function AdminPage() {
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAndSetTags();
  }, []);

  async function fetchAndSetTags() {
    const fetchedTags = await fetchTags();
    setTags(fetchedTags);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (tag.trim() !== "" && !tags.some((t) => t.name === tag)) {
      // setTags([...tags, { name: tag.trim(), id: new Date().getTime() }]);
      setTag("");
      await createTag(tag.trim());
      fetchAndSetTags();
    }
  };

  const handleUpdate = (newValue: string) => {
    if (
      editingId === null ||
      newValue.trim() === "" ||
      tags.some((tag) => tag.name === newValue)
    )
      return;

    const updated = [...tags];
    const index = updated.findIndex((tag) => tag.id === editingId);
    updated[index] = { ...updated[index], name: newValue };
    updateTag(editingId, newValue);
    setTags(updated);
    setEditingId(null);
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
              {tags.map((tag) => (
                <TagItem
                  key={tag.id}
                  initialValue={tag.name}
                  setEditingIdx={() => setEditingId(tag.id)}
                  onSave={handleUpdate}
                  onCancel={() => setEditingId(null)}
                  disabled={editingId !== tag.id}
                />
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
