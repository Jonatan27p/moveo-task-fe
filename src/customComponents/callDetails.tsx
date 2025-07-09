import { fetchCall, type Call } from "@/api/call";
import SelectTags from "./selectTags";
import { useEffect, useState } from "react";
import Tasks from "./task";

type CallDetailsProps = {
  callId: number;
};

function CallDetails({ callId }: CallDetailsProps) {
  const [call, setCall] = useState<Call>();

  useEffect(() => {
    console.log("call", call);
    fetchCallDetails();
  }, []);

  const fetchCallDetails = async () => {
    if (!callId) return;
    const currCall = await fetchCall(callId);
    if (!currCall) return;
    setCall(currCall);
  };

  return (
    <>
      {call && (
        <div className="flex flex-col w-2/3 p-6 gap-4">
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full">
            {call.id} - {call.name}
          </h4>
          <SelectTags key={callId} call={call} />
          <Tasks key={callId * 123} call={call} />
        </div>
      )}
    </>
  );
}

export default CallDetails;
