import { type Call } from "@/api/call";
import { updateCallTag } from "@/api/callTag";
import { fetchTags, type Tag } from "@/api/tag";
import { MultiSelect } from "@/components/ui/multiSelect";
import { useEffect, useState } from "react";

type SelectTagsProps = {
  call: Call;
};
export default function SelectTags({ call }: SelectTagsProps) {
  const [selectedTags, setSelectedTags] = useState<number[]>([]);
  const [tagsOptions, setTagsOptions] = useState<Tag[]>([]);

  useEffect(() => {
    fetchAndSetTags();
  }, []);

  const fetchAndSetTags = async () => {
    const tags = await fetchTags();
    setSelectedTags(call?.Tags.map((tag) => tag.id) || []);
    setTagsOptions(tags);
  };

  const handleTagChange = (selected: number[]) => {
    setSelectedTags(selected);
    updateCallTag(call.id, selected);
  };

  return (
    <div className="w-full mx-auto space-y-6 pt-6">
      <div className="space-y-2">
        <MultiSelect
          options={tagsOptions}
          selected={selectedTags}
          onChange={handleTagChange}
          placeholder="Choose tags..."
        />
      </div>
    </div>
  );
}
