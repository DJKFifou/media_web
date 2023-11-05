import { FormEvent } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/router";

interface CustomElements extends HTMLFormControlsCollection {
  password: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function ResetPassword(){
  const {resetPassword} = useAuth()
  const router = useRouter()
  async function onResetPassword(event: FormEvent<CustomForm>){
    event.preventDefault()
    const target = event.currentTarget.elements;
    const newPassword = target.password.value;

    try{
      await resetPassword(newPassword).then(() => {
        router.replace('/login')
      })
    }catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      <form onSubmit={onResetPassword}>
        <label>nouveau mot de passe</label>
        <input type={"text"} id={"password"}/>
        <button type={"submit"}>envoyer</button>
      </form>
    </div>
  )
}
