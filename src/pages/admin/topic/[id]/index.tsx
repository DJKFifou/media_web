import useTheme from "@/hooks/useTheme";
import useTopic from "@/hooks/useTopic";
import { Theme, Topic } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";

export default function Topic() {
  const router = useRouter();
  const { getTopic, updateTopic, deleteTopic } = useTopic();
  const { getTheme, getThemes } = useTheme();
  const topicId = router.query.id;
  const [currentTopic, setCurrentTopic] = useState<Topic | null>(null);
  const [currentTopicTheme, setCurrentTopicTheme] = useState<Theme | null>(null);
  const [themesList, setThemesList] = useState<Theme[] | null>(null);
  const [isModify, setIsModify] = useState<boolean>(false);

  function handleShowModifyView() {
    setIsModify(!isModify);
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const updatedTopic = {
      // @todo Fix TS error
      title: event.currentTarget.title_name.value as string,
      introduction_text: event.currentTarget.introduction_text.value,
      theme: event.currentTarget.theme.value,
      is_hot: event.currentTarget.is_hot.checked,
    };
    if (currentTopic) {
      updateTopic(currentTopic?.id, updatedTopic).then(() => {
        router.push("/admin");
      });
    }
  }

  function onDelete() {
    if (currentTopic) {
      deleteTopic(currentTopic.id).then(() => {
        router.replace("/admin");
      });
    }
  }

  // @todo Remove the 3 useEffect to 1
  useEffect(() => {
    if (topicId && typeof topicId === "string") {
      getTopic(topicId).then((topic) => {
        setCurrentTopic(topic);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [topicId]);

  useEffect(() => {
    const themeId = currentTopic?.theme_id;
    if (themeId !== undefined) {
      getTheme(themeId).then((theme) => {
        setCurrentTopicTheme(theme);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTopic]);

  useEffect(() => {
    getThemes().then((themes) => {
      setThemesList(themes);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Link href="/admin">Retour</Link>
      <form onSubmit={onSubmit}>
        <label>Titre</label>
        <input type="text" name="title_name" id="title_name" defaultValue={currentTopic?.title} disabled={!isModify} />
        <label>{"Text d'introduction"}</label>
        <input
          type="text"
          name="introduction_text"
          id="introduction_text"
          defaultValue={currentTopic?.introduction_text}
          disabled={!isModify}
        />
        <label>Choisir le theme</label>
        {themesList && themesList.length > 0 && currentTopicTheme ? (
          <select name="theme" id="theme" disabled={!isModify}>
            {themesList?.map((theme, index) => {
              return (
                <option key={index} value={theme.id} selected={theme.id === currentTopicTheme.id}>
                  {theme.slug}
                </option>
              );
            })}
          </select>
        ) : null}
        <label>Sujet hot ?</label>
        <input type="checkbox" name="is_hot" id="is_hot" disabled={!isModify} />
        <label>Piste audio</label>
        <input type="file" name="audio" id="audio" />
        {isModify ? <button type="submit">Enregistrer les modifications</button> : null}
      </form>
      <button type="button" onClick={() => handleShowModifyView()}>
        {isModify ? "mode visualisation" : "mode edition"}
      </button>
      <button type="button" onClick={() => onDelete()}>
        Supprimer
      </button>
    </div>
  );
}
