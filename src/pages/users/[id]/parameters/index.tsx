import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { User } from "@prisma/client";
import useAuth from "@/hooks/useAuth";
import DropdownInformation from "@/components/user/DropdownInformation";

export default function Parameters() {
  const router = useRouter();
  const { getUser } = useUser();
  const { logOut } = useAuth();
  const userId = router.query.id as string;
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [dropDownTheme, setDropDownTheme] = useState({ personalInformation: false, themes: false, frequency: false });

  async function onSignOut() {
    logOut().then(() => {
      router.replace("/");
    });
  }
  useEffect(() => {
    getUser(userId).then((user) => {
      setCurrentUser(user);
    });
  }, [userId]);
  return (
    <div>
      <h1>{`Bonjour ${currentUser?.user_name}`}</h1>
      <DropdownInformation isOpen={dropDownTheme.personalInformation} title={"Mes information personnel"}>
        <label>email</label>
        <input />
        <label>pseudo</label>
        <input />
      </DropdownInformation>
      <button onClick={() => onSignOut()}>Me déconnecter</button>
    </div>
  );
}
