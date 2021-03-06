import React, { createContext, useState, useCallback } from 'react';
import {
    TypeProject,
    projectApi,
    ProjectModel,
    TypeEmployee,
    imageApi,
} from '../../services';

type TypeProjectData = {
    project: TypeProject | null;
    employees: TypeEmployee[];
    loading: boolean;
    getProjectData: (project_id: number) => Promise<TypeProject>;
    updateProject: (data: TypeProject) => void;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
    createProject: (
        data: ProjectModel,
        company_id: number,
        department_id: number,
        image?: File
    ) => Promise<TypeProject>;
    getEmployees: (project_id: number) => Promise<TypeEmployee[]>;
};

const ProjectContext = createContext<TypeProjectData>({} as TypeProjectData);

const getStoragedProject = () => {
    const projectDataAux = sessionStorage.getItem('@Mands:project');
    if (projectDataAux) {
        const projectData: TypeProject = JSON.parse(projectDataAux);
        return projectData;
    } else return null;
};

export const ProjectProvider: React.FC = ({ children }) => {
    const projectData = getStoragedProject();

    const [loading, setLoading] = useState(false);
    const [project, setProject] = useState<TypeProject | null>(projectData);
    const [employees, setEmployees] = useState<TypeEmployee[]>([]);

    const getProjectData = useCallback(async (project_id: number) => {
        try {
            const response = await projectApi.show(project_id);
            sessionStorage.setItem(
                '@Mands:project',
                JSON.stringify(response.data)
            );
            setProject(response.data);
            return Promise.resolve(response.data);
            // alerta de troca de empresa bem sucedida
        } catch (error) {
            console.log(error);
            return Promise.reject(error);
        } finally {
        }
    }, []);

    const updateProject = useCallback((data: TypeProject) => {
        sessionStorage.setItem('@Mands:project', JSON.stringify(data));
        setProject(data);
    }, []);

    const createProject = useCallback(
        async (
            data: ProjectModel,
            company_id: number,
            department_id: number,
            image?: File
        ) => {
            setLoading(true);
            try {
                const response = await projectApi.create(
                    data,
                    company_id,
                    department_id
                );

                const project: TypeProject = response.data.project;

                if (!image) return project;

                const formData = new FormData();
                formData.append('imageData', image);

                await imageApi.post(formData, company_id, project.projectId);

                return project;
            } catch (error) {
                console.log(error);
                return Promise.reject(error);
            } finally {
                setLoading(false);
            }
        },
        []
    );

    const getEmployees = useCallback(async (project_id: number) => {
        try {
            const { data } = await projectApi.getEmployees(project_id);
            setEmployees(data);
            return data;
        } catch (err) {
            console.log(err);
            return Promise.reject(err);
        } finally {
        }
    }, []);

    return (
        <ProjectContext.Provider
            value={{
                project,
                employees,
                loading,
                getProjectData,
                setLoading,
                updateProject,
                createProject,
                getEmployees,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
};

export default ProjectContext;
