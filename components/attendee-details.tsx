"use client";

import { useForm } from "@/contexts/form-context";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Loader2 } from "lucide-react";
import { useState } from "react";
import type React from "react";
import { uploadToCloudinary } from "@/lib/cloudinary";

export function AttendeeDetails() {
  const { formData, updateFormData } = useForm();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string>(formData.avatarUrl);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName) {
      newErrors.fullName = "Full name is required";
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.avatarUrl) {
      newErrors.avatarUrl = "Profile photo is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      updateFormData({ step: 3 });
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      setErrors((prev) => ({ ...prev, avatarUrl: "" }));

      const localPreview = URL.createObjectURL(file);
      setPreviewUrl(localPreview);

      const result = await uploadToCloudinary(file);

      updateFormData({ avatarUrl: result.secure_url });

      URL.revokeObjectURL(localPreview);
      setPreviewUrl(result.secure_url);
    } catch (error) {
      console.error("Upload error:", error);
      setErrors((prev) => ({
        ...prev,
        avatarUrl: "Failed to upload image. Please try again.",
      }));
      setPreviewUrl("");
      updateFormData({ avatarUrl: "" });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className=" w-full max-w-[700px] p-6 lg:p-12 mx-auto h-full bg-[#041E23] border border-[#0E464F] rounded-[40px]">
      <div className="mb-8 w-full">
        <h1 className="text-3xl font-serif mb-2 text-white">
          Attendee Details
        </h1>
        <div className="h-1 w-[60%] bg-teal-500"></div>
        <span className="text-gray-400 text-sm mt-2 block">Step 2/3</span>
      </div>

      <Card className="bg-[#002626] border-teal-900/20 p-6 flex flex-col gap-8">
        <div className="main-upload-card">
          <Label className="text-sm font-medium text-gray-300">
            Upload Profile Photo
          </Label>
          <div className="h-[200px] w-full bg-[#00000032] flex ">
            <div className="upload-card text-center -mt-2">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
                id="avatar-upload"
              />
              <label
                htmlFor="avatar-upload"
                className={`cursor-pointer flex flex-col items-center ${
                  isUploading ? "opacity-50" : ""
                }`}
              >
                {previewUrl ? (
                  <div className="relative mb-4">
                    <img
                      src={previewUrl || "/placeholder.svg"}
                      alt="Preview"
                      className="w-32 h-32 rounded-full object-cover border-2 border-teal-500"
                    />
                    {!isUploading && (
                      <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                        <span className="text-white text-sm">Change Photo</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <Upload className="w-8 h-8 text-teal-500 mb-2" />
                )}
                {isUploading ? (
                  <div className="flex items-center space-x-2">
                    <Loader2 className="w-4 h-4 text-teal-500 animate-spin" />
                    <span className="text-gray-300">Uploading...</span>
                  </div>
                ) : (
                  <span className="text-gray-300">
                    {previewUrl
                      ? "Click to change photo"
                      : "Drag & drop or click to upload"}
                  </span>
                )}
              </label>
              {errors.avatarUrl && (
                <span className="text-red-500 text-sm mt-1">
                  {errors.avatarUrl}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className=" border-t-4 border-t-[#07373F] pt-8">
          <Label htmlFor="fullName" className="text-gray-300">
            Enter your name
          </Label>
          <Input
            id="fullName"
            value={formData.fullName}
            placeholder="Lagos Avi"
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            className="bg-[#002626] text-white rounded-[12px] border-[#07373F]"
          />
          {errors.fullName && (
            <span className="text-red-500 text-sm">{errors.fullName}</span>
          )}
        </div>

        <div className="">
          <Label htmlFor="email" className="text-gray-300">
            Enter your email*
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            placeholder="hello@avioflagos.io"
            onChange={(e) => updateFormData({ email: e.target.value })}
            className="bg-[#002626] text-white rounded-[12px] border-[#07373F]"
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email}</span>
          )}
        </div>

        <div className="">
          <Label htmlFor="specialRequest" className="text-gray-300">
            Special request?
          </Label>
          <Textarea
            id="specialRequest"
            value={formData.specialRequest}
            onChange={(e) => updateFormData({ specialRequest: e.target.value })}
            className="bg-[#002626] border-[#07373F] rounded-[12px] text-white"
            placeholder="Enter any special requests here..."
          />
        </div>

        <div className="flex gap-6 w-full justify-between pt-4">
          <Button
            variant="outline"
            className="border-[#24A0B5] rounded-[8px] text-[#24A0B5] hover:bg-teal-900/20 flex-1"
            onClick={() => updateFormData({ step: 1 })}
          >
            Back
          </Button>
          <Button
            className="bg-[#24A0B5] rounded-[8px] hover:bg-teal-600 flex-1 text-white"
            onClick={handleSubmit}
          >
            Next
          </Button>
        </div>
      </Card>
    </div>
  );
}
