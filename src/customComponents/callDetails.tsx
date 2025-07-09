import type { Call } from "@/api/call";
import SelectTags from "./selectTags";

type CallDetailsProps = {
  call: Call;
};

function CallDetails({ call }: CallDetailsProps) {
  return (
    <div className="flex flex-col w-2/3 p-6">
      <h4 className="scroll-m-20 text-xl font-semibold tracking-tight w-full">
        {call.id} - {call.name}
      </h4>
      <SelectTags call={call} />
    </div>
  );
}

export default CallDetails;
