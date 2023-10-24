import {FormEvent, useState} from 'react'
import { Inter } from 'next/font/google'
import {Credentials} from "@/types";
import useAuth from "@/hooks/useAuth";
import {useRouter} from "next/router";
import {supabase} from "@/lib/initSupabase";


export default function Register() {
  const {signUp} = useAuth()
  const router = useRouter()
  const [userCredentials, setUserCredentials] = useState<Credentials | null>(null);

  function handleChange(key: string, value: string){
    setUserCredentials(prevState => ({...prevState, [key]: value}))
  }
  async function onSignUp(event: FormEvent<HTMLFormElement>){
    try{
      event.preventDefault()
      if(userCredentials){
        await signUp(userCredentials).then(async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if(user){
            await router.push(`register/onBoarding/${user.id}`)
          }
        })
      }
    }catch (e) {
      console.log(e)
    }
  }
  return (
      <div>
        <form onSubmit={onSignUp}>
          <label>Email</label>
          <input type="text" onChange={(event) => handleChange('email', event.target.value)}/>
          <label>Mot de passe</label>
          <input type="password" onChange={(event) => handleChange('password', event.target.value)}/>
          <button type="submit">Suivant</button>
        </form>
      </div>
    )
}
