import ProjectsSideBar from "./components/ProjectsSideBar.jsx";
import NewProject from "./components/NewProject.jsx";
import NoProjectSelected from "./components/NoProjectSelected.jsx";

import {useState} from 'react'
import SelectedProject from "./components/SelectedProject.jsx";
function App() {

    const [projectsState, setProjectsState] = useState({
        projectSelectedId: null,
        projects: [],
        tasks: []
    });
    function createProjectHandler() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projectSelectedId: -1
            }
        });
    }

    function saveProjectHandler(project) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projectSelectedId: null,
                projects: [...prevState.projects, project],
            };
        });
    }

    function handleCancelBtn() {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projectSelectedId: null
            };
        });
    }

    function selectProjectHandler(id) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                projectSelectedId: id
            };
        });
    }

    function handleDeleteProject(id) {
        setProjectsState(prevState => {
            const newProjectsList = prevState.projects.filter((project) =>
                project.id !== id)
            const newTasksList = prevState.tasks.filter((task) =>
                task.projId !== id)
            return {
                projectSelectedId: null,
                projects: newProjectsList,
                tasks: newTasksList
            };
        });
    }

    function handleAddTask(task) {
        setProjectsState(prevState => {
            return {
                ...prevState,
                tasks: [...prevState.tasks, task]
            };
        });
    }

    function handleDeleteTask(taskId) {
        setProjectsState(prevState => {
            const newTasksList = prevState.tasks.filter((task) =>
                task.taskId !== taskId);
            return {
                ...prevState,
                tasks: newTasksList
            };
        });
    }

    let content = <NewProject
        onSaveProject={saveProjectHandler}
        onCancel={handleCancelBtn}/>

    if (projectsState.projectSelectedId === null) {
        content = <NoProjectSelected onCreateProject={createProjectHandler}/>
    } else if(projectsState.projectSelectedId !== -1) {
        const currProject = projectsState.projects.find(project => project.id === projectsState.projectSelectedId);
        content = <SelectedProject
                    project={currProject}
                    onDeleteProject={handleDeleteProject}
                    projectTasks={projectsState.tasks.filter(task => task.projId === currProject.id)}
                    onAddTask={handleAddTask}
                    onDeleteTask={handleDeleteTask}/>
    }

  return (
    <main className="h-screen my-8 flex gap-8" >
        <ProjectsSideBar onCreateProject={createProjectHandler}
                         projectsToSelect={projectsState.projects}
                         onProjectSelection={selectProjectHandler}
                         selectedProjectId={projectsState.projectSelectedId}/>
        {content}
    </main>
  );
}

export default App;
