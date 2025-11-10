"use client";

import { useState, FormEvent } from "react";

interface FormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export const useContact = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage(null);

    // Simulate API call
    setTimeout(() => {
      setSubmitMessage({
        type: "success",
        text: "Cảm ơn bạn đã liên hệ! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.",
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
      setIsSubmitting(false);
    }, 1500);
  };

  const contactInfo = [
    {
      icon: "📍",
      title: "Địa Chỉ",
      content: "123 Đường ABC, Quận 1, TP. Hồ Chí Minh",
      link: "https://maps.google.com",
    },
    {
      icon: "📞",
      title: "Điện Thoại",
      content: "1900 1234",
      link: "tel:19001234",
    },
    {
      icon: "📧",
      title: "Email",
      content: "contact@furnihome.com",
      link: "mailto:contact@furnihome.com",
    },
    {
      icon: "🕒",
      title: "Giờ Làm Việc",
      content: "T2 - T7: 8:00 - 20:00\nCN: 9:00 - 18:00",
      link: null,
    },
  ];

  return {
    formData,
    handleChange,
    handleSubmit,
    isSubmitting,
    submitMessage,
    contactInfo,
  };
};
