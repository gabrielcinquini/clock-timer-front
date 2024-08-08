'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { FormProvider, useForm } from 'react-hook-form'
import { toast } from 'sonner'

import Loader from '@/components/loader'
import { Button } from '@/components/ui/button'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { api } from '@/lib/api'
import { formatName } from '@/utils'
import { SignUpFormType, signUpForm } from '@/validations'
import { Switch } from '@/components/ui/switch'
import { useSession } from 'next-auth/react'

export function SignUpForm() {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(signUpForm),
  })
  const { data: currentSession } = useSession()

  const handleRegister = form.handleSubmit(async (data) => {
    try {
      const res = await api.post('/auth/sign-up', data, {
        headers: {
          Authorization: `Bearer ${currentSession?.token}`,
        }
      })
      toast.success(res.data.message)
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error)
        toast.error(error.response?.data.message)
      } else if (error instanceof Error) toast.error(error.message)
      else toast.error('An error occurred')
    }
  })

  return (
    <FormProvider {...form}>
      <form onSubmit={handleRegister} className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="John"
                    onChange={(e) => {
                      formatName(e)
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Sobrenome</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Doe"
                    onChange={(e) => {
                      formatName(e)
                      field.onChange(e)
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Celular</FormLabel>
              <FormControl>
                <Input placeholder="123-456" {...field} />
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
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirme a senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="isManager"
          render={({ field }) => (
            <FormItem className='flex flex-col'>
              <FormLabel>Gerente</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col space-y-4">
          <Button
            className="w-full"
            type="submit"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting && <Loader />}
            Registrar
          </Button>
        </div>
      </form>
    </FormProvider>
  )
}
