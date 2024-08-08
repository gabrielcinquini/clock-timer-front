'use client'

import Link from 'next/link'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import ModeToggle from '@/components/ui/mode-toggle'
import { Typography } from '@/components/ui/typography'
import { APP_ROUTES } from '@/routes/paths'
import { SignUpForm } from './sign-up-form'


export function SignUp() {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl font-bold max-sm:text-xl">
          Registrar
        </CardTitle>
      </CardHeader>
      <CardContent>
        <SignUpForm />
      </CardContent>
    </Card>
  )
}
