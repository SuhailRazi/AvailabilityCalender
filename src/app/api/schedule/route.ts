// app/api/schedule/route.ts
import { NextResponse } from "next/server";
import Redis from "ioredis";

const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: Number(process.env.REDIS_PORT),
  password: process.env.REDIS_PASSWORD,
  tls: { rejectUnauthorized: false }, // for Upstash Redis
});

interface Schedule {
  [key: string]: { startTime: string; endTime: string }[];
}

// Retrieve the schedule data for a user
const getSchedule = async (userId: string) => {
  const schedule = await redis.get(`schedule:${userId}`);
  if (schedule) {
    return JSON.parse(schedule) as Schedule;
  }
  return null;
};

// Save the schedule data for a user
const saveSchedule = async (userId: string, schedule: Schedule) => {
  await redis.set(`schedule:${userId}`, JSON.stringify(schedule));
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return NextResponse.json(
      { message: "User ID is required" },
      { status: 400 }
    );
  }

  const schedule = await getSchedule(userId);
  if (schedule) {
    return NextResponse.json(schedule);
  }

  return NextResponse.json({ message: "No schedule found" }, { status: 404 });
}

export async function POST(req: Request) {
  const { userId, schedule }: { userId: string; schedule: Schedule } =
    await req.json();
  if (!userId || !schedule) {
    return NextResponse.json(
      { message: "User ID and schedule are required" },
      { status: 400 }
    );
  }

  await saveSchedule(userId, schedule);
  return NextResponse.json({ message: "Schedule saved successfully" });
}
