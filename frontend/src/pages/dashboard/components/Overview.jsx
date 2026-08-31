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

  const project = useProjects();
  const projectCount = project.length;

  const completeProject = useCompleteProject();
  const completeProjectCount = completeProject.length;

  const tasks = useTasks();
  
  const activeTasks = useActiveTasks();
  const tasksCount = activeTasks.length;

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

  }, []);

  const boxed = [
    {
      name: "Total Projects",
      icon: Folder,
      amount: projectCount,
      time: "+3 This month",
      secondIcon: ChartNoAxesColumn,
    },
    {
      name: "Active Tasks",
      icon: CircleCheck,
      amount: tasksCount,
      time: "+3 This month",
      secondIcon: ChartNoAxesColumn,
    },
    {
      name: "Completed",
      icon: CheckCheck,
      amount: completeProjectCount,
      time: "+3 This month",
      secondIcon: ChartNoAxesColumn,
    },
    {
      name: "Productivity",
      icon: TrendingUp,
      amount: projectCount,
      time: "+3 This month",
      secondIcon: ChartNoAxesColumn,
    },
  ];

  return (
    <div className="px-5">
      <div className=" py-8 flex justify-between items-center">
        <div className="flex flex-col ">
          <h1 className="text-2xl tracking-wide font-bold">
            Good Morning{" "}
            <span className="border-b border-[#ADC6FF]">{name}</span>
          </h1>
          <p>You have 12 Tasks to complete today</p>
        </div>
        <div className="flex gap-2">
          <div className="border flex items-center justify-center rounded px-2 ">
            <ListFilter />
          </div>
          <div className="border rounded flex items-center justify-center px-3 py-2">
            <Zap />
            <h4>Quick Action</h4>
          </div>
        </div>
      </div>
      <div className="flex gap-5">
        {boxed.map((item, index) => {
          const Icon = item.icon;
          return (
            <div
              key={item.name}
              className="border rounded-lg relative flex flex-col gap-2 h-30 w-60 px-3 py-2"
            >
              <div className="flex justify-between items-center ">
                <h3 className="text-xl">{item.name}</h3>
                <Icon size={18} />
              </div>
              <h4 className="text-3xl">{item.amount}</h4>
              <div className="flex justify-between items-center">
                <p className="text-sm">+3 This month</p>
                <div className="absolute right-1.5 bottom-0">
                  <ChartNoAxesColumn size={55} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Overview;
