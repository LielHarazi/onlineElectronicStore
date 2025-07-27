import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "./ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import axios from "axios";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      await axios.post("http://localhost:3001/api/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (error) {
      setStatus("error");
      console.error(error);
    }
  };

  return (
    <div>
      <Card className="w-full max-w-lg mx-auto">
        <CardHeader>
          <CardTitle>Contact Us</CardTitle>
          <CardDescription>
            We'd love to hear from you! Fill out the form below or email us at{" "}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {status === "success" ? (
            <div className="text-green-600 font-medium text-center py-8">
              Thank you for your message! We'll get back to you soon.
            </div>
          ) : (
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  autoComplete="name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Email
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  autoComplete="email"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <Button
                type="submit"
                className="w-full"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </Button>
              {status === "error" && (
                <p className="text-red-600 mt-2 text-center">
                  Failed to send message. Try again.
                </p>
              )}
            </form>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-center gap-2">
          <span className="text-xs text-gray-400">
            ElectroStore &copy; {new Date().getFullYear()}
          </span>
        </CardFooter>
      </Card>
    </div>
  );
}
