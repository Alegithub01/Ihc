export interface Career {
    id: string;
    name: string;
  }
  
  export interface Course {
    id: string;
    name: string;
    careerId: string;
    semester: number;
    groups: Group[];
    color: string; // Añadimos un color para cada curso
  }
  
  export interface Group {
    id: string;
    number: string;
    teacher: string;
    schedule: Schedule[];
  }
  
  export interface Schedule {
    day: 'Lunes' | 'Martes' | 'Miércoles' | 'Jueves' | 'Viernes' | 'Sábado';
    startTime: string;
    endTime: string;
    classroom: string; // Añadimos el aula
  }
  
  export interface ScheduleCell {
    courseId: string;
    courseName: string;
    groupId: string;
    teacher: string;
    semester: number;
    classroom: string; // Añadimos el aula
    color: string; // Añadimos el color
  }
  