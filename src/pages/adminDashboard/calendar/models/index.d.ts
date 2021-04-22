export type TypeCalendarData = {
    events: TypeEvents;
    days: TypeDays;
    allDaysIds: Array<string>;
};

export type TypeEvents = {
    [key: string]: TypeEvent;
};

export type TypeEvent = {
    eventId: string;
    title: string;
    description: string;
    color: string;
    startTime: string;
    endTime: string;
    department: string | null;
    project: string | null;
};

export type TypeDays = {
    [key: string]: TypeDay;
};

export type TypeDay = {
    dayId: string;
    title: string;
    eventsIds: Array<string>;
};

export type TypeMenuItem = {
    name: string;
    id: number;
    selected?: boolean;
    color: string;
};

export type TypeMenuValues = {
    departments: Array<TypeMenuItem>;
    projects: Array<TypeMenuItem>;
    company: TypeMenuItem;
};

export type TypeFilter = {
    filteredDeps: number[];
    filteredProjs: number[];
    filteredCompany: number[];
};
