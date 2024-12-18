import { Metadata } from 'next'
import Link from 'next/link'
import { Box, Typography, Card, CardContent, Button } from '@mui/material'
import { CalendarToday, Settings, Help, MoreHoriz } from '@mui/icons-material'

export const metadata: Metadata = {
  title: 'Capuccino - Organizador de Horarios',
  description: 'Organizador de horarios desarrollado por HOLOVERSE',
}

export default function Home() {
  return (
    <Box className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-950">
      <Box className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <Typography variant="h4" color="amber" gutterBottom>
            Capuccino
          </Typography>
          <Typography variant="h6" color="amber">
            Organizador de Horarios by HOLOVERSE
          </Typography>
        </header>

        <main>
          <Box className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <CategoryCard 
              title="Planificación de Horarios" 
              icon={<CalendarToday fontSize="large" />} 
              href="/planificacion"
            />
            <CategoryCard 
              title="Configuración y Personalización" 
              icon={<Settings fontSize="large" />} 
              href="/configuracion"
            />
            <CategoryCard 
              title="Ayuda y Guía" 
              icon={<Help fontSize="large" />} 
              href="/ayuda"
            />
            <CategoryCard 
              title="Otras Funciones" 
              icon={<MoreHoriz fontSize="large" />} 
              href="/otras-funciones"
            />
          </Box>

          {/* Botones de Login y Registro */}
          <Box className="flex justify-center gap-4 mt-8">
            <Button 
              variant="contained" 
              sx={{
                backgroundColor: '#FFB74D', // Color ámbar suave
                '&:hover': {
                  backgroundColor: '#FFA000', // Color más oscuro en hover
                },
                padding: '10px 20px', 
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none', // Para no poner el texto en mayúsculas
              }}
              component={Link} 
              href="/login"
            >
              Iniciar Sesión
            </Button>
            <Button 
              variant="outlined" 
              sx={{
                borderColor: '#FFB74D', // Bordes color ámbar suave
                color: '#FFB74D', // Texto color ámbar suave
                '&:hover': {
                  backgroundColor: '#FFB74D', // Fondo color ámbar en hover
                  color: '#fff', // Texto blanco en hover
                },
                padding: '10px 20px', 
                fontSize: '16px',
                fontWeight: 'bold',
                textTransform: 'none', // Para no poner el texto en mayúsculas
              }}
              component={Link} 
              href="/registro"
            >
              Registrarse
            </Button>
          </Box>
        </main>

        <footer className="mt-12 text-center text-amber-700 dark:text-amber-300">
          <Typography variant="body2">
            &copy; 2024 HOLOVERSE. Todos los derechos reservados.
          </Typography>
        </footer>
      </Box>
      <BackgroundAnimation />
    </Box>
  )
}

function CategoryCard({ title, icon, href }: { title: string, icon: React.ReactNode, href: string }) {
  return (
    <Card className="group hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <Link href={href} passHref>
          <Box className="flex flex-col items-center text-center">
            <Box className="mb-4 p-3 bg-amber-100 dark:bg-amber-800 rounded-full group-hover:bg-amber-200 dark:group-hover:bg-amber-700 transition-colors duration-300">
              {icon}
            </Box>
            <Typography variant="h6" color="amber" className="font-semibold">
              {title}
            </Typography>
          </Box>
        </Link>
      </CardContent>
    </Card>
  )
}

function BackgroundAnimation() {
  return (
    <Box className="fixed inset-0 -z-10 overflow-hidden">
      <Box className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-950" />
      <Box className="absolute inset-0 opacity-30 dark:opacity-20">
        {[...Array(50)].map((_, i) => (
          <Box
            key={i}
            className="absolute rounded-full bg-white dark:bg-amber-400"
            sx={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </Box>
    </Box>
  )
}
