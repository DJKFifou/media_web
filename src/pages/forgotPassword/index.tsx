import { FormEvent } from "react";
import useAuth from "@/hooks/useAuth";

interface CustomElements extends HTMLFormControlsCollection {
  email: HTMLInputElement;
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function ForgotPassword(){
  const {forgotPassword} = useAuth()
  async function resetPassword(event: FormEvent<CustomForm>){
    event.preventDefault();
    const target = event.currentTarget.elements;
    const email = target.email.value;

    try{
      console.log(email)
      await forgotPassword(email)
    }catch (e) {
      console.error(e)
    }
  }
  return (
    <div>
      <form onSubmit={resetPassword}>
        <label>email</label>
        <input type="text" id="email"/>
        <button type="submit">reset password</button>
      </form>
    </div>
  )
}
