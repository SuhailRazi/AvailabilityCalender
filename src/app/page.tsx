export default function Home() {
  return (
    <div className="flex items-center justify-center pt-24">
      <p>
        The availability form is located in{" "}
        <a
          href={`http://127.0.0.1:3000/user/availability/user_id`}
          className="text-blue-500 underline"
        >
          http://127.0.0.1:3000/user/availability/user_id
        </a>
      </p>
    </div>
  );
}
