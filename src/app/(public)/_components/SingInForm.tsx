'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { APP_ROUTES } from '@/routes/paths'

import Loader from '@/components/loader'
import { SignInFormType, signInForm } from '@/validations'

export const SignInForm = () => {
  const form = useForm<SignInFormType>({
    resolver: zodResolver(signInForm),
  })
  const router = useRouter()

  const handleLogin = form.handleSubmit(async (data) => {
    const res = await signIn('credentials', {
      redirect: false,
      phone: data.phone,
      password: data.password,
    })

    if (res?.error) return toast.error(res.error)

    router.push(APP_ROUTES.private.home)
  })

  return (
    <FormProvider {...form}>
      <form className="flex w-full flex-col gap-4" onSubmit={handleLogin}>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Usuário</FormLabel>
              <FormControl>
                <Input placeholder="Insira o usuário" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Insira a senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          className="w-full max-sm:text-sm"
          type="submit"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting && <Loader />}
          Entrar
        </Button>
      </form>
    </FormProvider>
  )
}
