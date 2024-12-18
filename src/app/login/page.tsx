'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Coffee, Eye, EyeOff, Mail, Lock } from 'lucide-react'

import { Button, Input, InputAdornment, IconButton, Card, CardContent, CardHeader, Typography, Box } from '@mui/material'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Aquí iría la lógica de autenticación
    console.log('Login attempt with:', { email, password })
    // Redirigir al usuario después del login exitoso
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 dark:from-amber-900 dark:to-orange-950 flex items-center justify-center p-4">
      <Card className="w-full max-w-md rounded-lg shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-amber-600 text-white flex items-center justify-center">
              <Typography variant="h4" className="font-bold">☕</Typography>
            </div>
          </div>
          <Typography variant="h5" className="text-2xl font-bold text-center text-amber-800 dark:text-amber-200">
            Bienvenido a Capuccino
          </Typography>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Typography variant="subtitle1">Correo electrónico</Typography>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="tu@email.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  required 
                  startAdornment={
                    <InputAdornment position="start">
                      <Mail className="text-amber-600 dark:text-amber-400" />
                    </InputAdornment>
                  }
                  sx={{
                    borderRadius: '8px',
                    boxShadow: 2,
                    backgroundColor: 'white',
                    '& .MuiInputBase-input': {
                      paddingLeft: '10px',
                    },
                  }}
                />
              </div>
              <div className="space-y-2">
                <Typography variant="subtitle1">Contraseña</Typography>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required 
                    startAdornment={
                      <InputAdornment position="start">
                        <Lock className="text-amber-600 dark:text-amber-400" />
                      </InputAdornment>
                    }
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
                    sx={{
                      borderRadius: '8px',
                      boxShadow: 2,
                      backgroundColor: 'white',
                      '& .MuiInputBase-input': {
                        paddingLeft: '10px',
                      },
                    }}
                  />
                </div>
              </div>
            </div>
            <Button 
              className="w-full mt-6 bg-amber-600 hover:bg-amber-700 text-white" 
              type="submit"
              sx={{ borderRadius: '8px', boxShadow: 3 }}
            >
              Iniciar sesión
            </Button>
          </form>
        </CardContent>
        <Box className="flex flex-col space-y-2 p-4">
          <Button variant="text" className="text-amber-600 dark:text-amber-400">
            ¿Olvidaste tu contraseña?
          </Button>
          <div className="text-sm text-center text-amber-700 dark:text-amber-300">
            ¿No tienes una cuenta?{' '}
            <Link href="/registro" className="underline text-amber-600 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-200">
              Regístrate
            </Link>
          </div>
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
