import React, { useState } from "react";
import { ArrowLeft, Heart, Save, Settings, Trash2, Users } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { useProjects } from "../../../hooks/redux";
import {
  deleteProjectApi,
  editProjectApi,
  isFavorite,
} from "../../../api/Projects";
import { useDispatch } from "react-redux";
import {
  deleteProject,
  toggleFavorite,
  updateProject,
} from "../../../redux/slices/projectSlice";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId } = useParams();
  const projects = useProjects();
  const project = projects.find((item) => item._id === projectId);

  console.log("Project ID:", projectId);
  console.log("Project:", project);

  const [formData, setFormData] = useState({
    title: project?.projectName || "",
    description: project?.description || "",
    status: project?.status || "active",
    color: project?.is_color || "#ADC6FF",
    // github: project?.github || "",
  });

  const isFav = async (projectId, currentFav) => {
    try {
      const fav = await isFavorite(projectId, !currentFav);

      dispatch(toggleFavorite(projectId));

      console.log(fav);
    } catch (error) {
      console.error(error);
    }
  };

  const editProjectHandler = async () => {
    const editProject = await editProjectApi(projectId, formData);
    dispatch(updateProject(editProject));
    console.log(editProject);
  };

  const deleteProjectHandler = async () => {
    try {
      const dlProject = await deleteProjectApi(projectId);

      dispatch(deleteProject(projectId));

      console.log(dlProject, "Project Deleted");

      navigate("/dashboard/projects");
    } catch (error) {
      console.error(error);
    }
  };

  if (!project) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#101216] px-4 text-white">
        <div className="w-full max-w-sm text-center">
          <h2 className="text-xl font-semibold sm:text-2xl">
            Project not found
          </h2>

          <button
            onClick={() => navigate("/dashboard/projects")}
            className="mt-4 rounded-md bg-[#ADC6FF] px-4 py-2 text-sm text-black transition hover:opacity-90"
          >
            Back to Projects
          </button>
        </div>
      </div>
    );
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  //   const handleSave = () => {
  //     console.log("Updated project:", formData);

  //     // API update yaha connect karna hai
  //   };

  return (
    <div className="min-h-screen bg-[#101216] px-4 py-5 text-white sm:px-6 sm:py-7 lg:px-10 lg:py-8">
      <div className="mx-auto w-full max-w-6xl">
        {/* Back Button */}
        <button
          onClick={() => navigate("/dashboard/projects")}
          className="mb-5 flex items-center gap-2 text-sm text-gray-400 transition hover:text-white sm:mb-6"
        >
          <ArrowLeft size={18} />
          <span>Back to Projects</span>
        </button>

        {/* Header */}
        <div className="flex flex-col gap-5 border-b border-white/10 pb-6 sm:pb-7 lg:flex-row lg:items-center lg:justify-between">
          {/* Project Title */}
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div
              className="h-10 w-10 shrink-0 rounded-xl border-2 sm:h-12 sm:w-12"
              style={{
                borderColor: formData.color,
                backgroundColor: `${formData.color}15`,
              }}
            />

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold sm:text-2xl">
                {formData.title || "Untitled Project"}
              </h1>

              <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                Project settings and configuration
              </p>
            </div>
          </div>

          {/* Save */}
          <button
            onClick={editProjectHandler}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-[#ADC6FF] px-4 py-2.5 text-sm font-medium text-black transition hover:opacity-90 sm:w-auto"
          >
            <Save size={17} />
            Save Changes
          </button>
        </div>

        {/* Content */}
        <div className="grid gap-5 py-6 sm:gap-6 sm:py-8 lg:grid-cols-[minmax(0,1fr)_320px]">
          {/* Main Settings */}
          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* General */}
            <section className="rounded-xl border border-white/10 bg-[#15181e] p-4 sm:p-6">
              <div className="mb-5 sm:mb-6">
                <h2 className="text-lg font-semibold">General</h2>

                <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                  Basic information about your project.
                </p>
              </div>

              <div className="space-y-5">
                {/* Project Name */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Project Name
                  </label>

                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="w-full rounded-md border border-white/10 bg-[#101216] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#ADC6FF]"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Description
                  </label>

                  <textarea
                    rows={5}
                    value={formData.description}
                    onChange={(e) =>
                      handleChange("description", e.target.value)
                    }
                    className="w-full resize-none rounded-md border border-white/10 bg-[#101216] px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#ADC6FF]"
                  />
                </div>

                {/* Status + Color */}
                <div className="grid gap-5 sm:grid-cols-2">
                  {/* Status */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Status
                    </label>

                    <select
                      value={formData.status}
                      onChange={(e) => handleChange("status", e.target.value)}
                      className="w-full rounded-md border border-white/10 bg-[#101216] px-3 py-2.5 text-sm text-white outline-none focus:border-[#ADC6FF]"
                    >
                      <option value="active">Active</option>

                      <option value="archived">Archived</option>

                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  {/* Color */}
                  <div>
                    <label className="mb-2 block text-sm text-gray-300">
                      Project Color
                    </label>

                    <div className="flex h-[42px] min-w-0 items-center gap-3 rounded-md border border-white/10 bg-[#101216] px-3">
                      <input
                        type="color"
                        value={formData.color}
                        onChange={(e) => handleChange("color", e.target.value)}
                        className="h-7 w-7 shrink-0 cursor-pointer rounded bg-transparent"
                      />

                      <span className="truncate text-xs text-gray-400">
                        {formData.color}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* GitHub */}
            {/* <section className="rounded-xl border border-white/10 bg-[#15181e] p-4 sm:p-6">
              <div className="mb-5 flex items-start gap-3 sm:mb-6">
                <div className="shrink-0 rounded-lg bg-white/5 p-2">
                  <span className="text-sm font-semibold">G</span>
                </div>

                <div className="min-w-0">
                  <h2 className="text-lg font-semibold">GitHub Integration</h2>

                  <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                    Connect a repository to this project.
                  </p>
                </div>
              </div>

              <label className="mb-2 block text-sm text-gray-300">
                Repository URL
              </label>

              <input
                type="text"
                placeholder="https://github.com/username/repository"
                value={formData.github}
                onChange={(e) => handleChange("github", e.target.value)}
                className="w-full rounded-md border border-white/10 bg-[#101216] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#ADC6FF]"
              />

              <p className="mt-2 text-xs leading-5 text-gray-600">
                GitHub integration can be used for task branches and task
                verification.
              </p>
            </section> */}

            {/* Members */}
            <section className="rounded-xl border border-white/10 bg-[#15181e] p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="shrink-0 rounded-lg bg-white/5 p-2">
                    <Users size={20} />
                  </div>

                  <div className="min-w-0">
                    <h2 className="text-lg font-semibold">Members</h2>

                    <p className="mt-1 text-xs text-gray-500 sm:text-sm">
                      Manage people working on this project.
                    </p>
                  </div>
                </div>

                <button className="w-full shrink-0 rounded-md border border-white/10 px-3 py-2 text-sm text-gray-300 transition hover:bg-white/5 sm:w-auto">
                  Manage
                </button>
              </div>
            </section>
          </div>

          {/* Right Sidebar */}
          <div className="min-w-0 space-y-5 sm:space-y-6">
            {/* Project Info */}
            <section className="rounded-xl border border-white/10 bg-[#15181e] p-4 sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <Settings size={18} className="shrink-0 text-gray-400" />

                <h2 className="font-semibold">Project Settings</h2>
              </div>

              <div className="space-y-4">
                {/* Favorite */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Favorite</span>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      isFav(project._id, project.is_favorite);
                    }}
                    className="shrink-0 rounded-md p-2 transition hover:bg-white/5"
                  >
                    <Heart
                      size={19}
                      fill={project.is_favorite ? "red" : "none"}
                      stroke={project.is_favorite ? "red" : "currentColor"}
                      className="transition-transform hover:scale-110"
                    />
                  </button>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm text-gray-500">Status</span>

                  <span className="max-w-[150px] truncate rounded-md bg-white/5 px-2.5 py-1 text-xs capitalize text-gray-300">
                    {formData.status}
                  </span>
                </div>

                {/* Project ID */}
                <div className="flex items-start justify-between gap-4">
                  <span className="shrink-0 text-sm text-gray-500">
                    Project ID
                  </span>

                  <span
                    title={project._id}
                    className="min-w-0 max-w-[160px] truncate text-right text-xs text-gray-600"
                  >
                    {project._id}
                  </span>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="rounded-xl border border-red-500/20 bg-red-500/[0.03] p-4 sm:p-6">
              <h2 className="font-semibold text-red-400">Danger Zone</h2>

              <p className="mt-2 text-sm leading-5 text-gray-500">
                Deleting this project is permanent and cannot be undone.
              </p>

              <button
                onClick={deleteProjectHandler}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-md border border-red-500/20 px-3 py-2.5 text-sm text-red-400 transition hover:bg-red-500/10"
              >
                <Trash2 size={16} />
                Delete Project
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
