import React, { useState } from "react";
import { MdClose } from "react-icons/md";
import TagInput from "../../Components/Input/TagInput";
import axios from "axios";
import { toast } from "react-toastify";

const AddEditNotes = ({ userInfo,onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "");
  const [content, setContent] = useState(noteData?.content || "");
  const [tags, setTags] = useState(noteData?.tags || []);
  const [error, setError] = useState(null);
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle File Change
 const handleFileChange = (event) => {
   const selectedFile = event.target.files[0];
  //  console.log("File input changed", selectedFile);

  if (selectedFile) {
    console.log("File selected:", selectedFile);
    setFile(selectedFile);
    if (selectedFile.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      setPreview(null);
    }
  }
};


  // Upload File
  const uploadFile = async () => {
    if (!file) return null;
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}`+"/api/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });
      console.log(response.data.fileUrl);
      
      return response.data.fileUrl;
    } catch (error) {
      toast.error("File upload failed");
      console.error(error);
      return null;
    }
  };

  // Edit Note
  const editNote = async () => {
    const noteId = noteData._id;
    const fileUrl = await uploadFile();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}`+`/api/note/edit/${noteId}`,
        { title, content, tags, fileUrl },
        { withCredentials: true }
      );
      if (!res.data.success) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  // Add Note
  const addNewNote = async () => {
    const fileUrl = await uploadFile();
    const id=userInfo._id
    // console.log()
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}`+"/api/note/add",
        { title, content, tags, fileUrl ,id},
        { withCredentials: true }
      );
      console.log(res.data.message)
      if (!res.data.success) {
        setError(res.data.message);
        toast.error(res.data.message);
        return;
      }
      toast.success(res.data.message);
      getAllNotes();
      onClose();
    } catch (error) {
      toast.error(error.message);
      setError(error.message);
    }
  };

  const handleAddNote = () => {
    if (!title) {
      setError("Please enter the title");
      return;
    }
    if (!content) {
      setError("Please enter the content");
      return;
    }
    setError("");
    type === "edit" ? editNote() : addNewNote();
  };

  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50"
        onClick={onClose}
      >
        <MdClose className="text-xl text-slate-400" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label text-red-400 uppercase">Title</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Wake up at 6 a.m."
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label text-red-400 uppercase">Content</label>
        <textarea
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content..."
          rows={10}
          value={content}
          onChange={({ target }) => setContent(target.value)}
        />
      </div>
      <div className="mt-4">
        <label
          htmlFor="dropzone-file"
          className="flex flex-col items-center justify-center w-full p-4 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to Upload</span> or drag and drop
          </p>
          <p className="text-xs text-gray-500">PDF or Images</p>
          <input
            type="file"
            accept="application/pdf,image/png,image/jpeg"
            id="dropzone-file"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
        {file && (
          <div className="mt-2">
            {preview ? (
              <img src={preview} alt="Preview" className="w-32 h-32 object-cover rounded" />
            ) : (
              <p className="text-sm text-gray-700">Selected: {file.name}</p>
            )}
          </div>
        )}
      </div>
      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">Tags</label>
        <TagInput tags={tags} setTags={setTags} />
      </div>
      {error && <p className="text-red-500 text-xs pt-4">{error}</p>}
      <button className="btn-primary font-medium mt-5 p-3" onClick={handleAddNote}>
        {type === "edit" ? "UPDATE" : "ADD"}
      </button>
    </div>
  );
};

export default AddEditNotes;
