import React, { useState } from "react";
import { isFavorite, createProject } from "../../../api/Projects";
import { useProjects } from "../../../hooks/redux";
import { ListFilter, TextAlignStart, Plus, Star, X } from "lucide-react";
import { useDispatch } from "react-redux";
import { toggleFavorite } from "../../../redux/slices/projectSlice";
import { useNavigate } from "react-router";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [showForm, setShowForm] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "active",
    color: "#ADC6FF",
  });

  const projects = useProjects();

  // Filter + Sort
  const filteredProjects = [...projects]
    .filter((project) => {
      if (filter === "all") return true;

      if (filter === "favorite") {
        return project.is_favorite === true;
      }

      return project.status === filter;
    })
    .sort((a, b) => {
      if (sortBy === "name-asc") {
        return a.projectName.localeCompare(b.projectName);
      }

      if (sortBy === "name-desc") {
        return b.projectName.localeCompare(a.projectName);
      }

      if (sortBy === "oldest") {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }

      return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
    });

  // Create project
  const ctProject = async (e) => {
    e.preventDefault();

    try {
      const result = await createProject(formData);

      dispatch(result.project);

      console.log(result.project);

      setShowForm(false);

      setFormData({
        title: "",
        description: "",
        status: "active",
        color: "#ADC6FF",
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Favorite
  const isFav = async (projectId, currentFav) => {
    try {
      const fav = await isFavorite(projectId, !currentFav);

      dispatch(toggleFavorite(projectId));

      console.log(fav);
    } catch (error) {
      console.error(error);
    }
  };

  const members = [
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXHlIWwNlozgmkjciRkTxQkh82HHLZLTKoxKqQamEgw&s",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXHlIWwNlozgmkjciRkTxQkh82HHLZLTKoxKqQamEgw&s",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXHlIWwNlozgmkjciRkTxQkh82HHLZLTKoxKqQamEgw&s",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXHlIWwNlozgmkjciRkTxQkh82HHLZLTKoxKqQamEgw&s",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXHlIWwNlozgmkjciRkTxQkh82HHLZLTKoxKqQamEgw&s",
    },
    {
      avatar:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTIXHlIWwNlozgmkjciRkTxQkh82HHLZLTKoxKqQamEgw&s",
    },
  ];

  return (
    <div className="min-h-full overflow-y-auto px-4 py-5 pb-20 sm:px-6 sm:py-6 md:px-8 md:pb-8 lg:px-10 lg:py-8">
      {/* Header */}
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        {/* Title */}
        <div className="min-w-0">
          <h2 className="text-2xl font-semibold text-white sm:text-3xl">
            Projects
          </h2>

          <p className="mt-1 max-w-xl text-sm leading-5 text-gray-400 sm:text-base">
            Manage and track your active developer workspace
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
          {/* Filter */}
          <div className="relative">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="h-9 w-full cursor-pointer appearance-none rounded-md border border-[#2b2c31] bg-[#15181e] px-3 pr-9 text-xs text-gray-300 outline-none focus:border-[#ADC6FF] sm:w-auto sm:text-sm"
            >
              <option value="all">All</option>
              <option value="active">Active</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="favorite">Favorites</option>
            </select>

            <ListFilter
              size={16}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="h-9 w-full cursor-pointer appearance-none rounded-md border border-[#2b2c31] bg-[#15181e] px-3 pr-9 text-xs text-gray-300 outline-none focus:border-[#ADC6FF] sm:w-auto sm:text-sm"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="name-asc">Name A-Z</option>
              <option value="name-desc">Name Z-A</option>
            </select>

            <TextAlignStart
              size={16}
              className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          {/* New Project */}
          <button
            type="button"
            onClick={() => setShowForm(true)}
            className="col-span-2 flex h-9 items-center justify-center gap-2 rounded-md bg-[#ADC6FF] px-3 text-sm font-medium text-black transition hover:opacity-90 sm:col-span-1"
          >
            <Plus size={17} />

            <span className="sm:hidden">New Project</span>

            <span className="hidden sm:inline">New Project</span>
          </button>
        </div>
      </div>

      {/* Create Project Modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/60 p-3 backdrop-blur-sm sm:p-4">
          <div className="my-auto w-full max-w-md rounded-xl border border-white/10 bg-[#15181e] p-4 shadow-2xl sm:p-6">
            {/* Modal Header */}
            <div className="mb-5 flex items-start justify-between gap-3 sm:mb-6">
              <div className="min-w-0">
                <h2 className="text-lg font-semibold text-white sm:text-xl">
                  Create Project
                </h2>

                <p className="mt-1 text-xs leading-4 text-gray-400 sm:text-sm">
                  Create a new project for your workspace.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="shrink-0 rounded-md p-1.5 text-gray-400 transition hover:bg-white/10 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={ctProject} className="space-y-4">
              {/* Project Name */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Project Name
                </label>

                <input
                  type="text"
                  placeholder="e.g. TaskFlow"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: e.target.value,
                    })
                  }
                  className="w-full rounded-md border border-white/10 bg-[#101216] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#ADC6FF]"
                />
              </div>

              {/* Description */}
              <div>
                <label className="mb-2 block text-sm text-gray-300">
                  Description
                </label>

                <textarea
                  rows="3"
                  placeholder="Describe your project..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      description: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-md border border-white/10 bg-[#101216] px-3 py-2.5 text-sm text-white outline-none placeholder:text-gray-600 focus:border-[#ADC6FF]"
                />
              </div>

              {/* Status + Color */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {/* Status */}
                <div>
                  <label className="mb-2 block text-sm text-gray-300">
                    Status
                  </label>

                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        status: e.target.value,
                      })
                    }
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

                  <div className="flex h-[42px] items-center gap-3 rounded-md border border-white/10 bg-[#101216] px-3">
                    <input
                      type="color"
                      value={formData.color}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          color: e.target.value,
                        })
                      }
                      className="h-7 w-7 cursor-pointer rounded border-0 bg-transparent"
                    />

                    <span className="text-xs text-gray-400">
                      {formData.color}
                    </span>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex flex-col-reverse gap-2 pt-3 sm:flex-row sm:justify-end sm:gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="w-full rounded-md border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-white/5 sm:w-auto"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="w-full rounded-md bg-[#ADC6FF] px-4 py-2 text-sm font-medium text-black transition hover:opacity-90 sm:w-auto"
                >
                  Create Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-4 py-5 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 xl:grid-cols-4">
        {filteredProjects.length === 0 ? (
          <div className="col-span-full flex min-h-[220px] items-center justify-center rounded-xl border border-dashed border-[#2b2c31] bg-[#15181e]">
            <div className="text-center px-4">
              <h3 className="text-base font-medium text-white sm:text-lg">
                No projects found
              </h3>

              <p className="mt-1 text-sm text-gray-500">
                Try changing your filter.
              </p>
            </div>
          </div>
        ) : (
          filteredProjects.map((project) => (
            <div key={project._id} className="min-w-0">
              <div
                onClick={() => navigate(`/dashboard/projects/${project._id}`)}
                style={{
                  borderColor: project.is_color,
                }}
                className="group flex min-h-[200px] w-full cursor-pointer flex-col rounded-xl border-2 bg-[#15181e] px-4 py-3 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-3">
                  <h3 className="min-w-0 flex-1 truncate font-semibold text-white">
                    {project.projectName}
                  </h3>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      isFav(project._id, project.is_favorite);
                    }}
                    className="shrink-0"
                  >
                    <Star
                      size={19}
                      fill={project.is_favorite ? "yellow" : "none"}
                      stroke={project.is_favorite ? "yellow" : "currentColor"}
                      className="cursor-pointer transition-transform hover:scale-110"
                    />
                  </button>
                </div>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-400">
                  {project.description}
                </p>

                {/* Status */}
                <div className="mt-5 flex items-center justify-between gap-3">
                  <h4 className="text-xs font-medium uppercase tracking-wide text-gray-500">
                    Status
                  </h4>

                  <span
                    className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium ${
                      project.status === "completed"
                        ? "bg-green-500/10 text-green-400"
                        : project.status === "in-progress"
                          ? "bg-yellow-500/10 text-yellow-400"
                          : "bg-gray-500/10 text-gray-400"
                    }`}
                  >
                    {project.status === "in-progress"
                      ? "In Progress"
                      : project.status === "completed"
                        ? "Completed"
                        : "Active"}
                  </span>
                </div>

                {/* Divider */}
                <hr className="my-4 border-white/10" />

                {/* Members */}
                <div className="mt-auto flex items-center">
                  {members.slice(0, 4).map((member, index) => (
                    <img
                      key={index}
                      src={member.avatar}
                      alt="Member"
                      className={`h-7 w-7 rounded-full border-2 border-[#15181e] object-cover ${
                        index !== 0 ? "-ml-2" : ""
                      }`}
                    />
                  ))}

                  {members.length > 4 && (
                    <div className="-ml-2 flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#15181e] bg-[#30343d] text-[10px] text-white">
                      +{members.length - 4}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Projects;
