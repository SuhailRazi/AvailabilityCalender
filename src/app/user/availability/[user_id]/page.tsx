import ScheduleManager from "@/components/ScheduleManager";
import React from "react";

interface PageProps {
  params: {
    user_id: string;
  };
}

const Page = async ({ params }: PageProps) => {
  const { user_id } = await params;

  if (!user_id) {
    return <div>... loading</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-center pt-24">
        <ScheduleManager userId={user_id} />
      </div>
    </div>
  );
};

export default Page;
