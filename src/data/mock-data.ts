import { Career, Course } from '../types/scheduler';

export const careers: Career[] = [
  { id: 'INF', name: 'LICENCIATURA EN INFORMÁTICA (ING)' },
  { id: 'CIV', name: 'LICENCIATURA EN CIVIL (NUEVO)' },
  { id: 'ELE', name: 'LICENCIATURA EN ELÉCTRICA' },
];

const courseColors = [
  'bg-red-200 dark:bg-red-800',
  'bg-blue-200 dark:bg-blue-800',
  'bg-green-200 dark:bg-green-800',
  'bg-yellow-200 dark:bg-yellow-800',
  'bg-purple-200 dark:bg-purple-800',
  'bg-pink-200 dark:bg-pink-800',
  'bg-indigo-200 dark:bg-indigo-800',
  'bg-teal-200 dark:bg-teal-800',
];

export const courses: Course[] = [
  {
    id: 'ALG2',
    name: 'ALGEBRA II',
    careerId: 'INF',
    semester: 2,
    color: courseColors[0],
    groups: [
      {
        id: 'G5A',
        number: '5A',
        teacher: 'SALINAS PERICON WALTER OSCAR GONZALO',
        schedule: [
          { day: 'Lunes', startTime: '06:45', endTime: '08:15', classroom: 'A101' },
          { day: 'Martes', startTime: '06:45', endTime: '08:15', classroom: 'A101' },
        ],
      },
      {
        id: 'G6',
        number: '6',
        teacher: 'SILVA RAMOS HERNAN VICTOR',
        schedule: [
          { day: 'Lunes', startTime: '15:00', endTime: '16:30', classroom: 'B201' },
          { day: 'Miércoles', startTime: '15:00', endTime: '16:30', classroom: 'B201' },
        ],
      },
    ],
  },
  {
    id: 'CALC2',
    name: 'CÁLCULO II',
    careerId: 'INF',
    semester: 2,
    color: courseColors[1],
    groups: [
      {
        id: 'G3',
        number: '3',
        teacher: 'MARTINEZ LOPEZ JUAN',
        schedule: [
          { day: 'Martes', startTime: '08:15', endTime: '09:45', classroom: 'C301' },
          { day: 'Jueves', startTime: '08:15', endTime: '09:45', classroom: 'C301' },
        ],
      },
    ],
  },
  {
    id: 'PROG1',
    name: 'PROGRAMACIÓN I',
    careerId: 'INF',
    semester: 1,
    color: courseColors[2],
    groups: [
      {
        id: 'G1',
        number: '1',
        teacher: 'RODRIGUEZ PEREZ ANA',
        schedule: [
          { day: 'Lunes', startTime: '10:15', endTime: '11:45', classroom: 'LAB1' },
          { day: 'Miércoles', startTime: '10:15', endTime: '11:45', classroom: 'LAB1' },
        ],
      },
    ],
  },
];

export const timeSlots = [
  "06:45", "07:15", "07:45", "08:15", "08:45", "09:15", "09:45", "10:15", 
  "10:45", "11:15", "11:45", "12:15", "12:45", "13:15", "13:45", "14:15", 
  "14:45", "15:15", "15:45", "16:15", "16:45", "17:15", "17:45", "18:15", 
  "18:45", "19:15", "19:45", "20:15", "20:45", "21:15"
];

export const days = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
