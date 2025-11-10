"use client";

import { useState, FormEvent } from "react";

export const useNewsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setMessage({ type: "error", text: "Vui lòng nhập email hợp lệ" });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setMessage({
        type: "success",
        text: "Đăng ký thành công! Cảm ơn bạn đã quan tâm.",
      });
      setEmail("");
      setIsSubmitting(false);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }, 1500);
  };

  return {
    email,
    setEmail,
    isSubmitting,
    message,
    handleSubmit,
  };
};
