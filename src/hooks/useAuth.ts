import {supabase} from "@/lib/initSupabase";
import {Credentials} from "@/types";

export default function useAuth(){
	async function signUp(credentials: Credentials){
		try{
			await supabase.auth.signUp({email: credentials.email, password: credentials.password})
		}catch (e) {
			console.error(e)
		}
	}

	async function signIn(credentials: Credentials){
		try{
			await supabase.auth.signInWithPassword({email: credentials.email, password: credentials.password})
		}catch (e) {
			console.error(e)
		}
	}

	return {signUp, signIn}
}
