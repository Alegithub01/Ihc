'use client'
import React, { useState, useMemo } from 'react'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import IconButton from '@mui/material/IconButton'
import Snackbar from '@mui/material/Snackbar'
import Alert from '@mui/material/Alert'
import SaveIcon from '@mui/icons-material/Save'
import FileDownloadIcon from '@mui/icons-material/FileDownload'
import CloseIcon from '@mui/icons-material/Close'
import { jsPDF } from 'jspdf'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import { careers, courses, timeSlots, days } from '@/data/mock-data'
import { Group, ScheduleCell, Course } from '@/types/scheduler'
import { scheduleService } from '@/shared/services/scheduleService';


const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#f59e0b',
    },
    secondary: {
      main: '#d97706',
    },
  },
})

export default function SchedulePlanner() {
  const [selectedCareer, setSelectedCareer] = useState<string>('')
  const [schedule, setSchedule] = useState<Record<string, Record<string, ScheduleCell>>>({})
  const [currentSemester, setCurrentSemester] = useState('1')
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' as 'error' | 'info' })
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const handleCareerChange = (event: SelectChangeEvent<string>) => {
    setSelectedCareer(event.target.value)
    setSchedule({})
  }
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = courses.filter((course) => 
      course.name.toLowerCase().includes(term) || 
      course.careerId.toLowerCase().includes(term)
    );

    setFilteredCourses(filtered);
  };

  const checkScheduleConflict = (newSchedule: Group['schedule']) => {
    for (const slot of newSchedule) {
      const day = slot.day
      const startTime = new Date(`2000-01-01T${slot.startTime}:00`)
      const endTime = new Date(`2000-01-01T${slot.endTime}:00`)

      while (startTime < endTime) {
        const timeSlot = startTime.toTimeString().slice(0, 5)
        if (schedule[day]?.[timeSlot]) {
          return true // Conflict found
        }
        startTime.setMinutes(startTime.getMinutes() + 30)
      }
    }
    return false // No conflict
  }

  const handleGroupSelect = (course: Course, group: Group) => {
    if (checkScheduleConflict(group.schedule)) {
      setSnackbar({
        open: true,
        message: 'Esta materia se superpone con otra ya seleccionada.',
        severity: 'error',
      })
      return
    }

    const newSchedule = { ...schedule }
    
    group.schedule.forEach((slot) => {
      const startTime = new Date(`2000-01-01T${slot.startTime}:00`)
      const endTime = new Date(`2000-01-01T${slot.endTime}:00`)
      
      while (startTime < endTime) {
        const timeSlot = startTime.toTimeString().slice(0, 5)
        if (!newSchedule[slot.day]) {
          newSchedule[slot.day] = {}
        }
        newSchedule[slot.day][timeSlot] = {
          courseId: course.id,
          courseName: course.name,
          groupId: group.id,
          teacher: group.teacher,
          semester: course.semester,
          classroom: slot.classroom,
          color: course.color,
        }
        startTime.setMinutes(startTime.getMinutes() + 30)
      }
    })

    setSchedule(newSchedule)
  }

  const handleRemoveCourse = (day: string, time: string) => {
    const newSchedule = { ...schedule }
    const cell = newSchedule[day][time]
    if (cell) {
      Object.keys(newSchedule[day]).forEach(slot => {
        if (newSchedule[day][slot].courseId === cell.courseId && newSchedule[day][slot].groupId === cell.groupId) {
          delete newSchedule[day][slot]
        }
      })
    }
    setSchedule(newSchedule)
  }

  const availableCourses = useMemo(() => {
    return courses.filter(course => course.careerId === selectedCareer)
      .reduce((acc, course) => {
        if (!acc[course.semester]) {
          acc[course.semester] = []
        }
        acc[course.semester].push(course)
        return acc
      }, {} as Record<number, Course[]>)
  }, [selectedCareer])

  const occupiedTimeSlots = useMemo(() => {
    const occupied: Set<string> = new Set()
    Object.values(schedule).forEach(daySchedule => {
      Object.entries(daySchedule).forEach(([time, cell]) => {
        occupied.add(`${cell.courseId}-${cell.groupId}-${time}`)
      })
    })
    return occupied
  }, [schedule])

  const generatePDF = () => {
    const doc = new jsPDF()

    doc.setFontSize(16)
    doc.text('Horario Planificado', 20, 20)
    
    let y = 30
    timeSlots.forEach((time) => {
      doc.setFontSize(12)
      doc.text(time, 20, y)

      days.forEach((day, index) => {
        const cell = schedule[day]?.[time]
        if (cell) {
          doc.text(`${cell.courseName} - ${cell.teacher} (${cell.classroom})`, 50 + (index * 40), y)
        }
      })
      y += 10
    })

    doc.save('horario.pdf')
  }

  const handleSaveSchedule = () => {
    scheduleService.saveSchedule(schedule);
    setSnackbar({
      open: true,
      message: 'Horario guardado exitosamente.',
      severity: 'info',
    });
  };
  

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Planificación de Horarios
          </Typography>
          <Breadcrumbs aria-label="breadcrumb" sx={{ marginBottom: '16px' }} >
            <Link underline="hover" color="white" href="/">
              Inicio  /
            </Link>
            <Link underline="hover" color="white" href="/carreras">
              Carreras  /
            </Link>
            <Typography color="white">Semestre 1</Typography>
          </Breadcrumbs>
          <Box sx={{ mb: 2 }}>
            <Autocomplete
              freeSolo
              options={filteredCourses.map((course) => course.name)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Buscar Materias o Carreras"
                  variant="outlined"
                  onChange={handleSearchChange}
                  sx={{
                    border: '2px solid #f59e0b', 
                    borderRadius: '8px',         
                    backgroundColor: '#fff',    
                    '& .MuiOutlinedInput-root': {
                      '& fieldset': {
                        borderColor: '#f59e0b', 
                      },
                      '&:hover fieldset': {
                        borderColor: '#d97706', 
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#d97706', 
                      },
                      '& .MuiInputLabel-root': {
                        color: '#f59e0b', // Color amarillo
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#f59e0b', // Color amarillo más oscuro cuando está enfocado
                      },
                    },
                  }}
                />
              )}
            />
          </Box>
          {/* Lista de Materias Filtradas */}
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Card sx={{ width: 300 }}>
              <CardContent>
                {filteredCourses.map((course) => (
                  <Box key={course.id} sx={{ mb: 2 }}>
                    <Typography variant="subtitle1">{course.name}</Typography>
                    {course.groups.map((group) => (
                      <Button
                        key={group.id}
                        variant="outlined"
                        fullWidth
                        sx={{
                          mt: 1,
                          justifyContent: 'flex-start',
                          backgroundColor: course.color,
                          '&:hover': {
                            backgroundColor: course.color,
                            filter: 'brightness(90%)',
                          },
                        }}
                        onClick={() => handleGroupSelect(course, group)}
                      >
                        <Box sx={{ textAlign: 'left' }}>
                          <Typography variant="body2">Grupo {group.number}</Typography>
                          <Typography variant="caption" sx={{ display: 'block' }}>
                            {group.teacher}
                          </Typography>
                        </Box>
                      </Button>
                    ))}
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
            <Button startIcon={<SaveIcon />} variant="outlined" sx={{ mr: 1 }} onClick={handleSaveSchedule}>
              Guardar borrador
            </Button>
            <Button
              startIcon={<FileDownloadIcon />}
              variant="outlined"
              onClick={generatePDF}
            >
              Exportar PDF
            </Button>
            
            <Button
            startIcon={<FileDownloadIcon />}
            variant="outlined"
            onClick={() => {
              const savedSchedules = scheduleService.loadSchedules();
              if (savedSchedules.length > 0) {
                setSchedule(savedSchedules[0]); // Cargar el primero como ejemplo
                setSnackbar({
                  open: true,
                  message: 'Horario cargado correctamente.',
                  severity: 'info',
                });
              } else {
                setSnackbar({
                  open: true,
                  message: 'No hay horarios guardados.',
                  severity: 'info',
                });
              }
            }}
          >
            Cargar Ultimo Horario
          </Button>

          </Box>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Card sx={{ width: 300 }}>
              <CardContent>
                <FormControl fullWidth>
                  <InputLabel id="career-select-label">Seleccionar Carrera</InputLabel>
                  <Select
                    labelId="career-select-label"
                    value={selectedCareer}
                    label="Seleccionar Carrera"
                    onChange={handleCareerChange}
                  >
                    {careers.map((career) => (
                      <MenuItem key={career.id} value={career.id}>
                        {career.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {selectedCareer && (
                  <Box sx={{ mt: 2 }}>
                    <Tabs
                      value={currentSemester}
                      onChange={(_, newValue) => setCurrentSemester(newValue)}
                      variant="scrollable"
                      scrollButtons="auto"
                    >
                      {Object.keys(availableCourses).map((semester) => (
                        <Tab key={semester} label={`Sem ${semester}`} value={semester} />
                      ))}
                    </Tabs>
                    <Box sx={{ mt: 2, maxHeight: 400, overflow: 'auto' }}>
                      {availableCourses[Number(currentSemester)]?.map((course) => (
                        <Box key={course.id} sx={{ mb: 2 }}>
                          <Typography variant="subtitle1">{course.name}</Typography>
                          {course.groups.map((group) => (
                            <Button
                              key={group.id}
                              variant="outlined"
                              fullWidth
                              sx={{
                                mt: 1,
                                justifyContent: 'flex-start',
                                backgroundColor: course.color,
                                '&:hover': {
                                  backgroundColor: course.color,
                                  filter: 'brightness(90%)',
                                },
                              }}
                              onClick={() => handleGroupSelect(course, group)}
                              disabled={group.schedule.some(slot => 
                                occupiedTimeSlots.has(`${course.id}-${group.id}-${slot.startTime}`)
                              )}
                            >
                              <Box sx={{ textAlign: 'left' }}>
                                <Typography variant="body2">Grupo {group.number}</Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  {group.teacher}
                                </Typography>
                              </Box>
                            </Button>
                          ))}
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>
            <TableContainer component={Paper} sx={{ flexGrow: 1 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Hora</TableCell>
                    {days.map((day) => (
                      <TableCell key={day}>{day}</TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {timeSlots.map((time, index) => (
                    <TableRow key={time} sx={index % 3 === 0 ? { borderTop: 2, borderColor: 'divider' } : {}}>
                      <TableCell component="th" scope="row">
                        {time}
                      </TableCell>
                      {days.map((day) => {
                        const cell = schedule[day]?.[time]
                        return (
                          <TableCell 
                            key={`${day}-${time}`}
                            sx={{
                              backgroundColor: cell ? cell.color : 'inherit',
                              position: 'relative',
                              minWidth: 120,
                            }}
                          >
                            {cell && (
                              <Box>
                                <Typography variant="caption" sx={{ fontWeight: 'bold', display: 'block' }}>
                                  {cell.courseName}
                                </Typography>
                                <Typography variant="caption" sx={{ display: 'block' }}>
                                  Aula: {cell.classroom}
                                </Typography>
                                {index % 3 === 0 && (
                                  <IconButton
                                    size="small"
                                    sx={{ position: 'absolute', top: 0, right: 0 }}
                                    onClick={() => handleRemoveCourse(day, time)}
                                  >
                                    <CloseIcon fontSize="small" />
                                  </IconButton>
                                )}
                              </Box>
                            )}
                          </TableCell>
                        )
                      })}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Container>
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={6000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert onClose={() => setSnackbar({ ...snackbar, open: false })} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </ThemeProvider>
  )
}
