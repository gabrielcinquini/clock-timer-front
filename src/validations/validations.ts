import { z } from 'zod'

export const signInForm = z.object({
  phone: z.string().regex(/^\d{3}-\d{3}$/, 'Formato inválido(123-456)'),
  password: z.string().min(4, 'Mínimo de 4 caracteres'),
})
export type SignInFormType = z.infer<typeof signInForm>

export const signUpForm = z.object({
  firstName: z
    .string()
    .regex(/^[A-ZÁÉÍÓÚÃÕÂÊÎÔÇ][a-záéíóúãõâêîôç]+$/, 'Nome inválido(Joe)'),
  lastName: z
    .string()
    .regex(/^[A-ZÁÉÍÓÚÃÕÂÊÎÔÇ][a-záéíóúãõâêîôç]+$/, 'Nome inválido(Joe)'),
  phone: z.string().regex(/^\d{3}-\d{3}$/, 'Formato inválido(123-456)'),
  isManager: z.boolean().optional().default(false),
  password: z.string().min(4, 'Mínimo de 4 caracteres'),
  confirmPassword: z.string().min(4, 'Mínimo de 4 caracteres'),
}).refine(
  (data) => {
    if (data.password !== data.confirmPassword) return false
    return true
  },
  {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  },
)
.transform(({ ...data }) => ({
  ...data,
  fullName: `${data.firstName} ${data.lastName}`,
}))
export type SignUpFormType = z.infer<typeof signUpForm>
