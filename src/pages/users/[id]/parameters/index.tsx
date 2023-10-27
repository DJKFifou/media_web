import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import useUser from "@/hooks/useUser";
import { Article_Frequency, Prisma, User } from "@prisma/client";
import useAuth from "@/hooks/useAuth";
import DropdownInformation from "@/components/user/DropdownInformation";
import useTheme from "@/hooks/useTheme";
import { EnhancedUser } from "@/types";

type UserWithTheme = Prisma.UserGetPayload<{ include: { subscribed_themes: true } }>;

export default function Parameters() {
  const router = useRouter();
  const { getUser, currentUser } = useUser();
  const { logOut } = useAuth();
  const { themes } = useTheme();
  const userId = router.query.id as string;
  // @todo robust this
  const [updateUserObject, setUpdateUserObject] = useState<EnhancedUser["db"] | null>(null);
  const [dropDownTheme, setDropDownTheme] = useState({ personalInformation: false, themes: false, frequency: false });
  const saveThemes = themes.filter((theme) => {
    return theme.subscribers.some((subscriber) => subscriber.id === userId);
  });
  const nonSaveThemes = themes.filter((theme) => {
    if (theme.subscribers.length === 0) {
      return theme;
    }
    return theme.subscribers.some((subscriber) => subscriber.id !== userId);
  });
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

  async function onSignOut() {
    logOut().then(() => {
      router.replace("/");
    });
  }

  if (!currentUser) {
    return null;
  }

  return (
    <div>
      <button onClick={() => router.push(`/users/${userId}`)}>Retour</button>
      <h1>{currentUser.db.user_name}</h1>
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
          value={String(updateUserObject?.user_name)}
          onChange={(event) => handleUpdateUserObject("user_name", event.target.value)}
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
                <button>{theme.title}</button>
              </div>
            );
          })}
          <p style={{ fontWeight: "bold" }}>Themes disponibles</p>
          {nonSaveThemes.map((theme, index) => {
            return (
              <div key={index}>
                <button>{theme.title}</button>
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
          placeholder={currentUser.db.article_number ? String(currentUser.db.article_number) : undefined}
          value={updateUserObject ? String(updateUserObject.article_number) : 0}
          onChange={(event) => handleUpdateUserObject("article_number", event.target.value)}
        />
        {/* <label>Choisi ta fréquence</label>
        <select onChange={(event) => handleUpdateUserObject("article_frequency", event.target.value)}>
          {articleFrequencyList.map((frequency, index) => {
            return (
              <option
                value={frequency.value}
                key={index}
                selected={currentUser.db.article_frequency ? frequency[] === currentUser.db.article_frequency : null}
              >
                {frequency.label}
              </option>
            );
          })}
        </select> */}
      </DropdownInformation>
      <button type={"submit"}>Enregistrer les informations</button>
      <button onClick={() => onSignOut()}>Me déconnecter</button>
      <button>Supprimer on compte</button>
    </div>
  );
}
