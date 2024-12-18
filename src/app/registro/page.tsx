'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Coffee, Eye, EyeOff } from 'lucide-react'

import { Button, Input, InputAdornment, IconButton, Card, CardContent, CardHeader, Typography, Box } from '@mui/material'

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [aceptaTerminos, setAceptaTerminos] = useState(false)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Intento de registro con:', { nombre, email, password, aceptaTerminos })
    router.push('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-lg shadow-lg">
        <CardHeader className="flex flex-col items-center space-y-4 py-8">
          <div className="flex items-center justify-center mb-4">
            <Coffee className="h-16 w-16 text-amber-600 dark:text-amber-400" />
          </div>
          <Typography variant="h4" className="font-extrabold text-center text-amber-800 dark:text-amber-200">
            Crea tu cuenta en Capuccino
          </Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Typography variant="body1" className="font-medium">Nombre completo</Typography>
                <Input 
                  id="nombre" 
                  placeholder="Tu nombre" 
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  fullWidth
                  required
                  sx={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
                />
              </div>
              <div className="space-y-2">
                <Typography variant="body1" className="font-medium">Correo electrónico</Typography>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required
                  sx={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
                />
              </div>
              <div className="space-y-2">
                <Typography variant="body1" className="font-medium">Contraseña</Typography>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                    sx={{ fontSize: '16px', padding: '12px', borderRadius: '8px', border: '1px solid #e0e0e0' }}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                          )}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox"
                  id="terminos"
                  checked={aceptaTerminos}
                  onChange={(e) => setAceptaTerminos(e.target.checked)}
                  className="h-5 w-5 text-amber-600"
                />
                <label htmlFor="terminos" className="text-sm font-medium leading-none text-amber-800 dark:text-amber-200">
                  Acepto los términos y condiciones
                </label>
              </div>
            </div>
            <Button 
              variant="contained" 
              className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white"
              type="submit"
              disabled={!aceptaTerminos}
            >
              Registrarse
            </Button>
          </form>
        </CardContent>
        <Box className="flex justify-center py-4">
          <Typography variant="body2" className="text-sm text-center text-amber-700 dark:text-amber-300">
            ¿Ya tienes una cuenta?{' '}
            <Link href="/login" className="underline text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200">
              Inicia sesión
            </Link>
          </Typography>
        </Box>
      </Card>
      <BackgroundAnimation />
    </div>
  )
}

function BackgroundAnimation() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-950" />
      <div className="absolute inset-0 opacity-30 dark:opacity-20">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white dark:bg-amber-400"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              height: `${Math.random() * 10 + 5}px`,
              animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}
