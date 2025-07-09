import { createCall, fetchCalls, type Call } from "@/api/call";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import CallDetails from "@/customComponents/callDetails";
import CallListItem from "@/customComponents/callListItem";
import { useEffect, useState } from "react";

export default function UserPage() {
  const [call, setCall] = useState("");
  const [calls, setCalls] = useState<Call[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchAndSetCalls();
  }, []);

  async function fetchAndSetCalls() {
    const fetchedTags = await fetchCalls();
    setCalls(fetchedTags);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (call.trim() !== "" && !calls.some((c) => c.name === call)) {
      setCall("");
      await createCall(call.trim());
      fetchAndSetCalls();
    }
  };

  return (
    <div className="flex bg-gray-100">
      <div className="flex flex-col w-1/3 items-baseline justify-start min-h-screen p-6 gap-9">
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center gap-2"
        >
          <Label htmlFor="call">Call</Label>
          <Input
            type="text"
            value={call}
            onChange={(e) => setCall(e.target.value)}
            className="border rounded px-2 py-1"
          />
          <Button type="submit" variant="outline">
            submit
          </Button>
        </form>

        <div className="w-full space-y-2">
          {calls.length > 0 && (
            <>
              {calls.map((call) => (
                <CallListItem
                  key={call.id}
                  initialValue={call.name}
                  setEditingIdx={() => setEditingId(call.id)}
                />
              ))}
            </>
          )}
        </div>
      </div>
      {editingId && calls.find((c) => c.id === editingId) && (
        <CallDetails key={editingId} callId={editingId} />
      )}
    </div>
  );
}
