import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
const About = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-8">

        {/* 🔙 Back Button */}
        <Button
          onClick={() => navigate("/")}
          className="mb-4 text-sm bg-gray-800 text-white px-4 py-1.5 rounded-md hover:bg-sky-400 transition"
        >
          ← Back to Home
        </Button>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          About Post Management Dashboard
        </h1>

        <p className="text-gray-600 mb-4">
          This is a modern Post Management Dashboard built using React, Redux,
          and Tailwind CSS. It allows users to create, view, manage, and interact
          with posts easily.
        </p>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
          Features
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>Create and manage posts</li>
          <li>Like and dislike posts (single reaction system)</li>
          <li>User authentication (Login system)</li>
          <li>View personal posts</li>
          <li>Delete posts with confirmation</li>
          <li>Responsive and modern UI</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
          Tech Stack
        </h2>
        <ul className="list-disc pl-5 text-gray-600 space-y-1">
          <li>React + TypeScript</li>
          <li>Redux Toolkit</li>
          <li>React Router</li>
          <li>Tailwind CSS</li>
          <li>ShadCN UI</li>
        </ul>

        <h2 className="text-xl font-semibold mt-6 mb-2 text-gray-800">
          Purpose
        </h2>
        <p className="text-gray-600">
          This project is built to demonstrate a complete CRUD system with user
          interaction, state management, and clean UI design. It can be extended
          into a full production-ready blogging platform.
        </p>
      </div>
    </div>
  );
};

export default About;