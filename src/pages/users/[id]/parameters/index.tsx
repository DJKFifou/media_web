import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import useUser, { UpdateUserPayload } from "@/hooks/useUser";
import { Article_Frequency, Prisma, Theme, User } from "@prisma/client";
import useAuth from "@/hooks/useAuth";
import DropdownInformation from "@/components/user/DropdownInformation";
import useTheme from "@/hooks/useTheme";
import { EnhancedUser } from "@/types";

interface CustomElements extends HTMLFormControlsCollection {
  pseudo?: HTMLInputElement;
  frequency_number?: HTMLInputElement;
  frequency_name?: HTMLSelectElement
}

interface CustomForm extends HTMLFormElement {
  readonly elements: CustomElements;
}

export default function Parameters() {
  const router = useRouter();
  const { currentUser, updateUser } = useUser();
  const { logOut } = useAuth();
  const {getSaveThemes, getNoSaveThemes} = useTheme()
  const userId = router.query.id as string;
  // @todo robust this
  const [updateUserObject, setUpdateUserObject] = useState<EnhancedUser["db"] | null>(null);
  const [dropDownTheme, setDropDownTheme] = useState({ personalInformation: false, themes: false, frequency: false });
  const [saveThemes, setSaveThemes] = useState<Theme[]>([]);
  const [noSaveThemes, setNoSaveThemes] = useState<Theme[]>([]);


  const articleFrequencyList = [
    {
      label: "jours",
      value: Article_Frequency.DAY,
    },
    {
      label: "semaines",
      value: Article_Frequency.WEEK,
    },
    {
      label: "mois",
      value: Article_Frequency.MONTH,
    },
  ];

  function handleUpdateUserObject(key: string, value: string) {
    // @todo Improve type
    setUpdateUserObject((prevState: any) => ({ ...prevState, [key]: value }));
  }

  function onClickSaveTheme(theme: Theme){
    setNoSaveThemes((prevState: Theme[]) => ([...prevState, theme]))
    const newSaveList: Theme[] = saveThemes.filter((saveTheme: Theme) => saveTheme.id !== theme.id)
    setSaveThemes(newSaveList)
  }

  function onClickNoSaveTheme(theme: Theme){
    setSaveThemes((prevState: Theme[]) => ([...prevState, theme]))
    const newNoSaveList: Theme[] = noSaveThemes.filter((noSave: Theme) => noSave.id !== theme.id)
    setNoSaveThemes(newNoSaveList)
  }


  async function handleSubmit(event: FormEvent<CustomForm> ){
    event.preventDefault();
    const target = event.currentTarget.elements;
    const user_name = target.pseudo?.name;
    const frequency_name = target.frequency_name?.value;
    const frequency_number = target.frequency_number?.valueAsNumber
    const selectedThemes = saveThemes.map((theme) => theme.id)

    if( !currentUser){
      return;
    }
    let payload : UpdateUserPayload = {id: currentUser.db.id}

    if(user_name){
      payload = {...payload, user_name: user_name}
    }
    if(frequency_name){
      const article_frequency = frequency_name as Article_Frequency
      payload = {...payload, article_frequency: article_frequency}
    }
    if(frequency_number){
      payload = {...payload, article_number: frequency_number}
    }
    if(selectedThemes.length > 0 ){
      payload= {...payload, themes: selectedThemes}
    }

    try{
      await updateUser(payload)
    }catch (e) {
      console.error(e)
    }
  }


  async function onSignOut() {
    logOut().then(() => {
      router.replace("/");
    });
  }

  useEffect(() => {
    getSaveThemes(userId).then((res) => {
      setSaveThemes(res)
    })
    getNoSaveThemes(userId).then((res) => {
      setNoSaveThemes(res)
    })
  }, [userId]);


  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <button onClick={() => router.push(`/users/${userId}`)}>Retour</button>
      <h1>{currentUser.db.user_name}</h1>
      <form onSubmit={handleSubmit}>
        <DropdownInformation
          isOpen={dropDownTheme.personalInformation}
          title={"Mes information personnel"}
          onClick={() =>
            setDropDownTheme((prevState) => ({
              ...prevState,
              personalInformation: !dropDownTheme.personalInformation,
            }))
          }
        >
          {/*<label>Adresse Email</label>*/}
          {/*<input placeholder={}/>*/}
          <label>Mon pseudo</label>
          <input
            placeholder={currentUser?.db.user_name || ""}
            name="pseudo"
            id="pseduo"
            // onChange={(event) => handleUpdateUserObject("user_name", event.target.value)}
          />
        </DropdownInformation>
        <DropdownInformation
          isOpen={dropDownTheme.themes}
          title={"Mes thèmes sélectionnés"}
          onClick={() => setDropDownTheme((prevState) => ({ ...prevState, themes: !dropDownTheme.themes }))}
        >
          <div>
            {saveThemes.map((theme, index) => {
              return (
                <div key={index}>
                  <button onClick={() => onClickSaveTheme(theme)}>{theme.title}</button>
                </div>
              );
            })}
            <p style={{ fontWeight: "bold" }}>Themes disponibles</p>
            {noSaveThemes.map((theme, index) => {
              return (
                <div key={index}>
                  <button onClick={() => onClickNoSaveTheme(theme)}>{theme.title}</button>
                </div>
              );
            })}
          </div>
        </DropdownInformation>
        <DropdownInformation
          isOpen={dropDownTheme.frequency}
          title={"Le nombre et les fréquences"}
          onClick={() => setDropDownTheme((prevState) => ({ ...prevState, frequency: !dropDownTheme.frequency }))}
        >
          <label>Choisi ta quantité de news</label>
          <input
            type="number"
            id="frequency_number"
            name="frequency_number"
            placeholder={currentUser.db.article_number ? String(currentUser.db.article_number) : undefined}
            // onChange={(event) => handleUpdateUserObject("article_number", event.target.value)}
          />
          <label>Choisi ta fréquence</label>
          <select
            onChange={(event) => handleUpdateUserObject("article_frequency", event.target.value)}
            id="frequency_name"
            name="frequency_name"
          >
            {articleFrequencyList.map((frequency, index) => {
              return (
                <option
                  value={frequency.value}
                  key={index}
                >
                  {frequency.label}
                </option>
              );
            })}
          </select>
        </DropdownInformation>
        <button type={"submit"}>Enregistrer les informations</button>
        <button onClick={() => onSignOut()}>Me déconnecter</button>
        <button>Supprimer on compte</button>
      </form>
    </div>
  );
}
