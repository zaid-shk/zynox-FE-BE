import React, { useEffect } from "react";
import {
  useActiveTasks,
  useCompleteProject,
  useProjects,
  useTasks,
  useUser,
} from "../../../hooks/redux";

import {
  ListFilter,
  Zap,
  Folder,
  CircleCheck,
  CheckCheck,
  TrendingUp,
  ChartNoAxesColumn,
} from "lucide-react";

import { projectApi, completeProjectApi } from "../../../api/Projects";
import { useDispatch } from "react-redux";

import {
  setCompleteProjects,
  setProjects,
} from "../../../redux/slices/projectSlice";

import { taskApi, activeTasksApi } from "../../../api/Tasks";
import { setActiveTasks, setTasks } from "../../../redux/slices/taskSlice";

const Overview = () => {
  const dispatch = useDispatch();
  const { name } = useUser();

  const projects = useProjects();
  const completeProjects = useCompleteProject();

  const tasks = useTasks();
  const activeTasks = useActiveTasks();

  const projectCount = projects.length;
  const completeProjectCount = completeProjects.length;
  const activeTaskCount = activeTasks.length;

  useEffect(() => {
    const projectsCall = async () => {
      const projects = await projectApi();
      dispatch(setProjects(projects));

      const complete = await completeProjectApi();
      dispatch(setCompleteProjects(complete));
    };

    const taskCall = async () => {
      const { tasks } = await taskApi();
      dispatch(setTasks(tasks));

      const { active } = await activeTasksApi();
      dispatch(setActiveTasks(active));
    };

    taskCall();
    projectsCall();
  }, [dispatch]);

  const boxed = [
    {
      name: "Total Projects",
      icon: Folder,
      amount: projectCount,
      text: "+3 This month",
    },
    {
      name: "Active Tasks",
      icon: CircleCheck,
      amount: activeTaskCount,
      text: "+3 This month",
    },
    {
      name: "Completed",
      icon: CheckCheck,
      amount: completeProjectCount,
      text: "+3 This month",
    },
    {
      name: "Productivity",
      icon: TrendingUp,
      amount: projectCount,
      text: "+3 This month",
    },
  ];

  return (
    <div className="min-h-full px-4 py-6 sm:px-6 md:px-8 lg:px-10">
      {/* Header */}
      <div className="flex flex-col gap-5 border-b border-[#2b2c31] pb-6 lg:flex-row lg:items-center lg:justify-between">
        {/* Greeting */}
        <div>
          <h1 className="text-xl font-bold tracking-wide text-white sm:text-2xl">
            Good Morning{" "}
            <span className="border-b border-[#ADC6FF] text-[#ADC6FF]">
              {name}
            </span>
          </h1>

          <p className="mt-1 text-sm text-gray-500 sm:text-base">
            You have{" "}
            <span className="text-gray-300">{activeTaskCount} tasks</span> to
            complete today.
          </p>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-md border border-[#2b2c31] bg-[#15181e] px-3 text-gray-400 transition hover:border-[#ADC6FF]/40 hover:text-white"
          >
            <ListFilter size={18} />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <button
            type="button"
            className="flex h-10 items-center justify-center gap-2 rounded-md bg-[#ADC6FF] px-4 text-sm font-medium text-[#101216] transition hover:opacity-90"
          >
            <Zap size={17} />
            <span>Quick Action</span>
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 py-6 sm:grid-cols-2 xl:grid-cols-4">
        {boxed.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="group relative min-h-[145px] overflow-hidden rounded-xl border border-[#2b2c31] bg-[#15181e] p-4 transition duration-200 hover:-translate-y-0.5 hover:border-[#ADC6FF]/30"
            >
              {/* Top */}
              <div className="flex items-center justify-between">
                <div className="flex min-w-0 items-center gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#ADC6FF]/10 text-[#ADC6FF]">
                    <Icon size={17} />
                  </div>

                  <h3 className="truncate text-sm font-medium text-gray-300">
                    {item.name}
                  </h3>
                </div>

                <ChartNoAxesColumn
                  size={18}
                  className="text-gray-600 transition group-hover:text-[#ADC6FF]"
                />
              </div>

              {/* Number */}
              <div className="mt-5">
                <h2 className="text-3xl font-bold tracking-tight text-white">
                  {item.amount}
                </h2>
              </div>

              {/* Bottom */}
              <div className="mt-2 flex items-center gap-1">
                <TrendingUp size={13} className="text-[#ADC6FF]" />

                <p className="text-xs text-gray-500">{item.text}</p>
              </div>

              {/* Background graph decoration */}
              <div className="pointer-events-none absolute -bottom-5 -right-3 opacity-[0.06]">
                <ChartNoAxesColumn size={100} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Overview section */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <div className="rounded-xl border border-[#2b2c31] bg-[#15181e] p-5 lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-white">
                Productivity Overview
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Track your project activity
              </p>
            </div>

            <ChartNoAxesColumn size={20} className="text-[#ADC6FF]" />
          </div>

          <div className="flex h-48 items-center justify-center">
            <p className="text-sm text-gray-600">
              Productivity chart coming soon
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-[#2b2c31] bg-[#15181e] p-5">
          <h2 className="text-base font-semibold text-white">Task Summary</h2>

          <p className="mt-1 text-xs text-gray-500">Your current task status</p>

          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Total Tasks</span>

              <span className="font-semibold text-white">{tasks.length}</span>
            </div>

            <div className="h-px bg-[#2b2c31]" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Active</span>

              <span className="font-semibold text-[#ADC6FF]">
                {activeTaskCount}
              </span>
            </div>

            <div className="h-px bg-[#2b2c31]" />

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-400">Completed Projects</span>

              <span className="font-semibold text-white">
                {completeProjectCount}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
