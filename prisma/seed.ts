import { prisma } from "@/lib/prisma"
import { Format, Prisma } from "@prisma/client"

// DD-MM-YYYY
const publish_date: `${number}-${number}-${number}` = "01-10-2023"

async function main() {
  const themesSlug = [
    "geopolitique",
    "sport",
    "fashion",
    "politique",
    "geographie",
    "histoire",
    "lifestyle",
    "environnement",
    "sante",
    "culture",
    "voyage",
    "international",
    "national",
    "regional",
  ] as const

  const themes: (Prisma.ThemeCreateInput & {
    slug: (typeof themesSlug)[number]
  })[] = [
    {
      slug: "geopolitique",
      title: "Geo-Politique",
      type: "GEOPOLITIC",
    },
    {
      slug: "sport",
      title: "Sport",
      type: "SPORT",
    },
    {
      slug: "fashion",
      title: "Fashion",
      type: "FASHION",
    },
    {
      slug: "politique",
      title: "Politique",
      type: "POLITIC",
    },
    {
      slug: "geographie",
      title: "Géographie",
      type: "GEOGRAPHY",
    },
    {
      slug: "histoire",
      title: "Histoire",
      type: "HISTORY",
    },
    {
      slug: "lifestyle",
      title: "Lifestyle",
      type: "LIFESTYLE",
    },
    {
      slug: "environnement",
      title: "Environnement",
      type: "ENVIRONMENT",
    },
    {
      slug: "sante",
      title: "Santé",
      type: "HEALTH",
    },
    {
      slug: "culture",
      title: "Culture",
      type: "CULTURE",
    },
    {
      slug: "voyage",
      title: "Voyage",
      type: "TRAVEL",
    },
    {
      slug: "international",
      title: "International",
      type: "INTERNATIONAL",
    },
    {
      slug: "national",
      title: "National",
      type: "NATIONAL",
    },
    {
      slug: "regional",
      title: "Régional",
      type: "REGIONAL",
    },
  ]

  const medias = [
    // const medias: Prisma.MediaCreateInput[] = [
    {
      title: "Les Echos",
      link: "https://www.lesechos.fr/",
      slug: "les-echos",
    },
    {
      title: "Le Monde",
      link: "https://www.lemonde.fr/",
      slug: "le-monde",
    },
    {
      title: "L'Equipe",
      link: "https://www.lequipe.fr/",
      slug: "lequipe",
    },
    {
      title: "CNews",
      link: "https://www.cnews.fr/",
      slug: "cnews",
    },
    {
      title: "Le Figaro",
      link: "https://www.lefigaro.fr/",
      slug: "le-figaro",
    },
    {
      title: "Eurosport",
      link: "https://www.eurosport.fr/",
      slug: "eurosport",
    },
    {
      title: "France 24",
      link: "https://www.france24.com/",
      slug: "france-24",
    },
    {
      title: "RFI",
      link: "https://www.rfi.fr/",
      slug: "rfi",
    },
    {
      title: "France TV Info",
      link: "https://www.francetvinfo.fr/",
      slug: "france-tv-info",
    },
    {
      title: "La 1ère",
      link: "https://la1ere.francetvinfo.fr/",
      slug: "la-1ere",
    },
    {
      title: "Service Public",
      link: "https://www.service-public.fr/",
      slug: "service-public",
    },
    {
      title: "Numerama",
      link: "https://www.numerama.com/",
      slug: "numerama",
    },
    {
      title: "Libération",
      link: "https://www.liberation.fr/",
      slug: "liberation",
    },
    {
      title: "Public Sénat",
      link: "https://www.publicsenat.fr/",
      slug: "public-senat",
    },
    {
      title: "Courrier Picard",
      link: "https://www.courrier-picard.fr/",
      slug: "courrier-picard",
    },
    {
      title: "France Bleu",
      link: "https://www.francebleu.fr/",
      slug: "france-bleu",
    },
    {
      title: "Sud Ouest",
      link: "https://www.sudouest.fr/",
      slug: "sud-ouest",
    },
    {
      title: "Air Zen",
      link: "https://www.airzen.fr/",
      slug: "air-zen",
    },
    {
      title: "Aquitaine Online",
      link: "https://www.aquitaineonline.com/",
      slug: "aquitaine-online",
    },
    {
      title: "Le Quotidien",
      link: "https://lequotidien.lu/",
      slug: "le-quotidien",
    },
    {
      title: "Unidivers",
      link: "https://www.unidivers.fr/",
      slug: "unidivers",
    },
    {
      title: "RMC",
      link: "https://rmc.bfmtv.com/",
      slug: "rmc",
    },
    {
      title: "Huffington Post",
      link: "https://www.huffingtonpost.fr/",
      slug: "huffington-post",
    },
    {
      title: "Ouest France",
      link: "https://www.ouest-france.fr/",
      slug: "ouest-france",
    },
    {
      title: "Nostalgie",
      link: "https://www.nostalgie.fr/",
      slug: "nostalgie",
    },
    {
      title: "RCI",
      link: "https://www.rci.fm/",
      slug: "rci",
    },
    {
      title: "20 Minutes",
      link: "https://20minutes.fr/",
      slug: "20minutes",
    },
    {
      title: "Journal du Coin",
      link: "https://journalducoin.com/",
      slug: "journalducoin",
    },
  ] as const

  const articles: (Prisma.ArticleCreateInput & { media: { connect: { slug: (typeof medias)[number]["slug"] } } })[] = [
    {
      reading_duration: 5,
      title:
        "Antoine Dupont de retour dans le groupe, le PSG et l'OM à l'arrêt, les adieux de Peter Sagan... Ce qu'il faut retenir du week-end de sport",
      link: "https://www.francetvinfo.fr/sports/antoine-dupont-de-retour-dans-le-groupe-le-psg-et-l-om-a-l-arret-les-adieux-de-peter-sagan-ce-qu-il-faut-retenir-du-week-end-de-sport_6095325.html",
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "L'Europe remporte la 44e édition de la Ryder Cup",
      link: "https://www.lequipe.fr/Golf/Actualites/L-europe-remporte-la-44e-edition-de-la-ryder-cup/1422904",
      reading_duration: 5,
      media: {
        connect: {
          slug: "lequipe",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Golf : le palmarès complet de la Ryder Cup",
      link: "https://www.cnews.fr/sport/2023-10-01/golf-le-palmares-complet-de-la-ryder-cup-1402278",
      reading_duration: 5,
      media: {
        connect: {
          slug: "cnews",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Peter Sagan, la rock star du cyclisme, fait ses adieux à la route et vise Paris 2024 en VTT",
      link: "https://www.lemonde.fr/sport/article/2023/10/01/peter-sagan-la-rock-star-du-cyclisme-fait-ses-adieux-a-la-route-et-vise-paris-2024-en-vtt_6191877_3242.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "le-monde",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Cyclisme : Peter Sagan, le bouquet final",
      link: "https://www.lefigaro.fr/sports/cyclisme/cyclisme-peter-sagan-le-bouquet-final-20230927",
      reading_duration: 5,
      media: {
        connect: {
          slug: "le-figaro",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Power of Sport : Peter Sagan raconte son amour du VTT, quelle liberté !",
      link: "https://www.eurosport.fr/cyclisme/power-of-sport-peter-sagan-raconte-son-amour-du-vtt-quelle-liberte_vid2000055/video.shtm",
      reading_duration: 5,
      media: {
        connect: {
          slug: "eurosport",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Le Haut-Karabakh se vide et l'Arménie tremble",
      link: "https://www.lesechos.fr/monde/europe/le-haut-karabakh-se-vide-et-larmenie-tremble-1981767",
      reading_duration: 5,
      media: {
        connect: {
          slug: "les-echos",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Haut-Karabakh : « La haine contre les Arméniens a atteint son paroxysme dans mon pays »",
      link: "https://www.lefigaro.fr/international/haut-karabakh-la-haine-contre-les-armeniens-a-atteint-son-paroxysme-dans-mon-pays-20231001",
      reading_duration: 5,
      media: {
        connect: {
          slug: "le-figaro",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Haut-Karabakh : l'exode des réfugiés vers l'Arménie s'accélère",
      link: "https://www.france24.com/fr/asie-pacifique/20230929-haut-karabakh-exode-r%C3%A9fugi%C3%A9s-armenie-s%C3%A9paratistes-azerbaidjan-russie-maintien-paix-onu-experts",
      reading_duration: 5,
      media: {
        connect: {
          slug: "france-24",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title:
        "La crise au Sahel est l'occasion pour la France de se poser une question fondamentale : quels sont ses intérêts en Afrique ?",
      link: "https://www.lemonde.fr/afrique/article/2023/09/27/la-crise-au-sahel-est-l-occasion-pour-la-france-de-se-poser-une-question-fondamentale-quels-sont-ses-interets-en-afrique_6191286_3212.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "le-monde",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Le Sahel, la France et la fabrique de l'hystérie",
      link: "https://www.rfi.fr/fr/podcasts/%C3%A7a-fait-d%C3%A9bat-avec-wathi/20230930-le-sahel-la-france-et-la-fabrique-de-l-hyst%C3%A9rie",
      reading_duration: 5,
      media: {
        connect: {
          slug: "rfi",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Violences faites aux femmes en Outre-Mer : après la Guadeloupe, Justine Benin en Martinique",
      link: "https://rci.fm/deuxiles/infos/Societe/Violences-faites-aux-femmes-en-Outre-Mer-apres-la-Guadeloupe-Justine-Benin-en",
      reading_duration: 5,
      media: {
        connect: {
          slug: "rci",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Violences faites aux femmes : Justine Benin consciente de l'ampleur de la tâche qui lui incombe",
      link: "https://la1ere.francetvinfo.fr/guadeloupe/violences-faites-aux-femmes-justine-benin-consciente-de-l-ampleur-de-la-tache-qui-lui-incombe-1407462.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "la-1ere",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title:
        "Violences faites aux femmes en Outre-Mer : les associations réclament des actions concrètes, souligne Justine Benin",
      link: "https://la1ere.francetvinfo.fr/violences-faites-aux-femmes-en-outre-mer-les-associations-reclament-des-actions-concretes-souligne-justine-benin-1428107.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "la-1ere",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Covid-19 : la campagne de vaccination avancée",
      link: "https://www.francetvinfo.fr/sante/maladie/coronavirus/vaccin/covid-19-la-campagne-de-vaccination-avancee_6095553.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Covid-19 : la campagne de vaccination avancée",
      link: "https://www.numerama.com/sciences/1506974-vaccin-contre-le-covid-a-qui-sadresse-la-campagne-2023.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "numerama",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Covid-19 : la campagne de vaccination avancée",
      link: "https://www.service-public.fr/particuliers/actualites/A16758",
      reading_duration: 5,
      media: {
        connect: {
          slug: "service-public",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "La France connaît son mois de septembre le plus chaud jamais enregistré, selon Météo-France",
      link: "https://www.liberation.fr/environnement/climat/la-france-connait-son-mois-de-septembre-le-plus-chaud-jamais-enregistre-selon-meteo-france-20230929_ARKFDLON5JBVBE23TE2OYSSACQ/",
      reading_duration: 5,
      media: {
        connect: {
          slug: "liberation",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Météo : des températures anormalement élevées pour un mois d'octobre",
      link: "https://www.francetvinfo.fr/meteo/meteo-des-temperatures-anormalement-elevees-pour-un-mois-d-octobre_6095556.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Météo : à quoi sert le nouvel épisode de chaleur automnale ?",
      link: "https://www.20minutes.fr/planete/4054741-20230926-meteo-quoi-nouvel-episode-chaleur-automnale",
      reading_duration: 5,
      media: {
        connect: {
          slug: "20minutes",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Reconnaissance faciale : l'Europe sacrifie la vie privée",
      link: "https://journalducoin.com/analyses/europe-sacrifie-vie-privee/",
      reading_duration: 5,
      media: {
        connect: {
          slug: "journalducoin",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title:
        "Reconnaissance faciale : une opposition entre le Parlement européen et les États membres, explique Bastien Le Querrec, juriste et membre de la Quadrature du Net",
      link: "https://www.francetvinfo.fr/sciences/high-tech/reconnaissance-faciale-une-opposition-entre-le-parlement-europeen-et-les-etats-membres-explique-bastien-le-querrec-juriste-et-membre-de-la-quadranure-du-net_6095601.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Gérard Larcher en passe d'être élu président du Sénat pour la cinquième fois",
      link: "https://www.publicsenat.fr/actualites/politique/gerard-larcher-en-passe-detre-elu-president-du-senat-pour-la-cinquieme-fois",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "public-senat",
        },
      },
    },
    {
      title: "Sénat : Gérard Larcher en passe de rempiler au plateau",
      link: "https://www.courrier-picard.fr/id453782/article/2023-10-01/senat-gerard-larcher-en-passe-de-rempiler-au-plateau",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "courrier-picard",
        },
      },
    },
    {
      title: "Politique : Gérard Larcher en passe de devenir président du Sénat pour la 5e fois",
      link: "https://www.francetvinfo.fr/politique/parlement-francais/senat/politique-gerard-larcher-en-passe-de-devenir-president-du-senat-pour-la-5-fois_6095607.html",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
    },
    {
      title: "La Teste-de-Buch : Vermilion voudrait forer des puits de pétrole supplémentaires en forêt usagère",
      link: "https://www.francebleu.fr/infos/environnement/la-teste-de-buch-vermilion-voudrait-forer-des-puits-de-petrole-supplementaires-en-foret-usagere-6583576",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "france-bleu",
        },
      },
    },
    {
      title: "Forages pétroliers à Cazaux : les écologistes dénoncent « le cynisme des bénéfices à court terme »",
      link: "https://www.sudouest.fr/environnement/forages-petroliers-a-cazaux-les-ecologistes-denoncent-le-cynisme-des-benefices-a-court-terme-16838239.php",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "sud-ouest",
        },
      },
    },
    {
      title: "Culture : à Bordeaux, une 8ᵉ édition du FAB sous le signe de la lune",
      link: "https://www.airzen.fr/culture-a-bordeaux-une-8%E1%B5%89-edition-du-fab-sous-le-signe-de-la-lune/",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "air-zen",
        },
      },
    },
    {
      title:
        "Bordeaux : l'ouverture du FAB cartonne avec le récital de piano suspendu à une grue du chantier Bastide Niel",
      link: "https://www.sudouest.fr/culture/bordeaux-l-ouverture-du-fab-cartonne-avec-le-recital-de-piano-suspendu-a-une-grue-du-chantier-bastide-niel-16881756.php",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "sud-ouest",
        },
      },
    },
    {
      title: "Festival international des arts de Bordeaux : 8ème édition",
      link: "https://aquitaineonline.com/actualites-en-aquitaine/gironde/6683-festival-international-des-arts-de-bordeaux.html",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "aquitaine-online",
        },
      },
    },
    {
      title: "Dali avant Dali",
      link: "https://www.francetvinfo.fr/replay-radio/bd-bande-dessinee/dali-avant-dali_6066375.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Dans la tête de Salvador Dalí",
      link: "https://lequotidien.lu/a-la-une/dans-la-tete-de-salvador-dali/",
      reading_duration: 5,
      media: {
        connect: {
          slug: "le-quotidien",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "BD : Dali",
      link: "https://www.unidivers.fr/bd-dali-birmant-oubrerie/",
      reading_duration: 5,
      media: {
        connect: {
          slug: "unidivers",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Bernadette, avec la réalisatrice Léa Domenach et sa directrice de production et sa compositrice",
      link: "https://www.francebleu.fr/emissions/terre-de-tournage/bernadette-avec-la-realisatrice-lea-domenach-et-sa-directrice-de-production-et-sa-compositrice-7224310",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "france-bleu",
        },
      },
    },
    {
      title: "La vie de Bernadette Chirac racontée dans un film",
      link: "https://rmc.bfmtv.com/actualites/politique/la-vie-de-bernadette-chirac-racontee-dans-un-film_AN-202309300242.html",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "rmc",
        },
      },
    },
    {
      title:
        "Bernadette : Catherine Deneuve devient Madame Chirac dans un biopic inattendu vu du petit bout de la lorgnette",
      link: "https://www.francetvinfo.fr/culture/cinema/sorties-de-films/bernadette-catherine-deneuve-devient-madame-chirac-dans-un-biopic-inattendu-vu-du-petit-bout-de-la-lorgnette_6089799.html",
      reading_duration: 5,
      format: Format.ARTICLE,
      media: {
        connect: {
          slug: "france-tv-info",
        },
      },
    },
    {
      title: "À Las Vegas, U2 inaugure la Sphere, une salle de concert immersive entièrement constituée d'écrans",
      link: "https://www.huffingtonpost.fr/culture/video/a-las-vegas-u2-inaugure-la-sphere-une-salle-de-concert-immersive-entierement-constituee-d-ecrans_223824.html",
      reading_duration: 5,
      media: {
        connect: {
          slug: "huffington-post",
        },
      },
      format: Format.ARTICLE,
    },
    {
      title: "Concert de U2 : plus d'un million de LED, trois choses à savoir sur la salle The Sphere à Las Vegas",
      link: "https://www.ouest-france.fr/monde/etats-unis/concert-de-u2-plus-dun-million-de-led-trois-choses-a-savoir-sur-la-salle-the-sphere-a-las-vegas-b9f1c9a6-6115-11ee-a34c-eb9c49c0487f",
      reading_duration: 5,
      media: {
        connect: {
          slug: "ouest-france",
        },
      },
      format: Format.ARTICLE,
    },
  ]

  const topics: Prisma.TopicCreateInput[] = [
    {
      title: "Récap Football du 01/10/2023",
      introduction_text: "Retrouvez tous les résultats et les faits marquants de la journée de football du 01/10/2023.",
      slug: "recap-football-01-10-2023",
      // @todo: add audio for topics
      audio: "audio.mp3",
      publish_date: publish_date,
      theme: {
        connect: {
          slug: "sport",
        },
      },
      articles: {
        connect: {
          link: "https://www.francetvinfo.fr/sports/antoine-dupont-de-retour-dans-le-groupe-le-psg-et-l-om-a-l-arret-les-adieux-de-peter-sagan-ce-qu-il-faut-retenir-du-week-end-de-sport_6095325.html",
        },
      },
    },
    {
      title: "Récap Rugby du 01/10/2023",
      introduction_text: "Retrouvez tous les résultats et les faits marquants de la journée de rugby du 01/10/2023.",
      slug: "recap-rugby-01-10-2023",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "sport",
        },
      },
      articles: {
        connect: {
          link: "https://www.francetvinfo.fr/sports/antoine-dupont-de-retour-dans-le-groupe-le-psg-et-l-om-a-l-arret-les-adieux-de-peter-sagan-ce-qu-il-faut-retenir-du-week-end-de-sport_6095325.html",
        },
      },
    },
    {
      title: "Récap Golf du 01/10/2023",
      introduction_text: "Retrouvez tous les résultats et les faits marquants de la journée de golf du 01/10/2023.",
      slug: "recap-golf-01-10-2023",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "sport",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.lequipe.fr/Golf/Actualites/L-europe-remporte-la-44e-edition-de-la-ryder-cup/1422904",
          },
          {
            link: "https://www.cnews.fr/sport/2023-10-01/golf-le-palmares-complet-de-la-ryder-cup-1402278",
          },
        ],
      },
    },
    {
      title: "Peter Sagan laisse la route derrière lui, mais vise Paris 2024 en VTT",
      introduction_text:
        "Le célèbre cycliste Peter Sagan a annoncé qu'il se retirait de la route pour se concentrer sur le VTT et viser les Jeux Olympiques de Paris en 2024.",
      slug: "peter-sagan-vtt-paris-2024",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "sport",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.lemonde.fr/sport/article/2023/10/01/peter-sagan-la-rock-star-du-cyclisme-fait-ses-adieux-a-la-route-et-vise-paris-2024-en-vtt_6191877_3242.html",
          },
          {
            link: "https://www.lefigaro.fr/sports/cyclisme/cyclisme-peter-sagan-le-bouquet-final-20230927",
          },
          {
            link: "https://www.eurosport.fr/cyclisme/power-of-sport-peter-sagan-raconte-son-amour-du-vtt-quelle-liberte_vid2000055/video.shtm",
          },
        ],
      },
    },
    {
      title: "Récap du conflit dans le Haut-Karabakh",
      introduction_text:
        "Le Haut-Karabakh, enclave peuplée d'Arméniens en Azerbaïdjan, est revendiqué par les deux pays et a été le théâtre de deux guerres depuis l'effondrement de l'URSS. Le conflit a repris en septembre 2020, faisant des centaines de morts et des milliers de déplacés. Les combats ont cessé après un cessez-le-feu négocié par la Russie, mais la situation reste tendue.",
      slug: "recap-conflit-haut-karabakh",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "geopolitique",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.lesechos.fr/monde/europe/le-haut-karabakh-se-vide-et-larmenie-tremble-1981767",
          },
          {
            link: "https://www.lefigaro.fr/international/haut-karabakh-la-haine-contre-les-armeniens-a-atteint-son-paroxysme-dans-mon-pays-20231001",
          },
          {
            link: "https://www.france24.com/fr/asie-pacifique/20230929-haut-karabakh-exode-r%C3%A9fugi%C3%A9s-armenie-s%C3%A9paratistes-azerbaidjan-russie-maintien-paix-onu-experts",
          },
        ],
      },
    },
    {
      title: "Les forces françaises armées quittent le Sahel",
      introduction_text:
        "Après huit ans de présence au Sahel, les forces françaises armées ont commencé leur retrait. Cette décision intervient après une série d'attaques terroristes dans la région.",
      slug: "forces-francaises-armees-quittent-sahel",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "geopolitique",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.lemonde.fr/afrique/article/2023/09/27/la-crise-au-sahel-est-l-occasion-pour-la-france-de-se-poser-une-question-fondamentale-quels-sont-ses-interets-en-afrique_6191286_3212.html",
          },
          {
            link: "https://www.rfi.fr/fr/podcasts/%C3%A7a-fait-d%C3%A9bat-avec-wathi/20230930-le-sahel-la-france-et-la-fabrique-de-l-hyst%C3%A9rie",
          },
        ],
      },
    },
    {
      title: "Violences faites aux femmes : la coordinatrice interministérielle Justine Benin en Martinique",
      introduction_text:
        "La coordinatrice interministérielle pour la lutte contre les violences faites aux femmes, Justine Benin, s'est rendue en Martinique pour rencontrer les acteurs locaux et faire le point sur la situation dans l'île.",
      slug: "violences-faites-aux-femmes-justine-benin-martinique",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "national",
        },
      },
      articles: {
        connect: [
          {
            link: "https://rci.fm/deuxiles/infos/Societe/Violences-faites-aux-femmes-en-Outre-Mer-apres-la-Guadeloupe-Justine-Benin-en",
          },
          {
            link: "https://la1ere.francetvinfo.fr/guadeloupe/violences-faites-aux-femmes-justine-benin-consciente-de-l-ampleur-de-la-tache-qui-lui-incombe-1407462.html",
          },
          {
            link: "https://la1ere.francetvinfo.fr/violences-faites-aux-femmes-en-outre-mer-les-associations-reclament-des-actions-concretes-souligne-justine-benin-1428107.html",
          },
        ],
      },
    },
    {
      title: "Covid 19 : Début de la campagne de vaccination le 2 Octobre",
      introduction_text:
        "La campagne de vaccination contre la Covid 19 débutera le 2 octobre. Les personnes les plus vulnérables seront les premières à être vaccinées.",
      slug: "covid-19-campagne-vaccination-2-octobre",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "national",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.francetvinfo.fr/sante/maladie/coronavirus/vaccin/covid-19-la-campagne-de-vaccination-avancee_6095553.html",
          },
          {
            link: "https://www.numerama.com/sciences/1506974-vaccin-contre-le-covid-a-qui-sadresse-la-campagne-2023.html",
          },
          {
            link: "https://www.service-public.fr/particuliers/actualites/A16758",
          },
        ],
      },
    },
    {
      title: "Chaleur : un mois de septembre bouillant",
      introduction_text:
        "Le mois de septembre a été marqué par une vague de chaleur exceptionnelle. Les températures ont dépassé les 30 degrés dans de nombreuses régions.",
      slug: "chaleur-mois-septembre-bouillant",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "national",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.liberation.fr/environnement/climat/la-france-connait-son-mois-de-septembre-le-plus-chaud-jamais-enregistre-selon-meteo-france-20230929_ARKFDLON5JBVBE23TE2OYSSACQ/",
          },
          {
            link: "https://www.francetvinfo.fr/meteo/meteo-des-temperatures-anormalement-elevees-pour-un-mois-d-octobre_6095556.html",
          },
          {
            link: "https://www.20minutes.fr/planete/4054741-20230926-meteo-quoi-nouvel-episode-chaleur-automnale",
          },
        ],
      },
    },
    {
      title: "Discussion autour de la Reconnaissance faciale au parlement européen",
      introduction_text:
        "Le parlement européen a organisé une discussion sur l'utilisation de la reconnaissance faciale dans l'Union européenne. Les députés ont exprimé leurs préoccupations quant à l'impact de cette technologie sur la vie privée.",
      slug: "discussion-reconnaissance-faciale-parlement-europeen",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "politique",
        },
      },
      articles: {
        connect: [
          {
            link: "https://journalducoin.com/analyses/europe-sacrifie-vie-privee/",
          },
          {
            link: "https://www.francetvinfo.fr/sciences/high-tech/reconnaissance-faciale-une-opposition-entre-le-parlement-europeen-et-les-etats-membres-explique-bastien-le-querrec-juriste-et-membre-de-la-quadranure-du-net_6095601.html",
          },
        ],
      },
    },
    {
      title: "Gérard Larcher, président du Sénat 5e mandat",
      introduction_text:
        "Gérard Larcher a été réélu président du Sénat pour un cinquième mandat. Il a obtenu 222 voix sur 343 votants.",
      slug: "gerard-larcher-president-senat-5e-mandat",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "politique",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.publicsenat.fr/actualites/politique/gerard-larcher-en-passe-detre-elu-president-du-senat-pour-la-cinquieme-fois",
          },
          {
            link: "https://www.courrier-picard.fr/id453782/article/2023-10-01/senat-gerard-larcher-en-passe-de-rempiler-au-plateau",
          },
          {
            link: "https://www.francetvinfo.fr/politique/parlement-francais/senat/politique-gerard-larcher-en-passe-de-devenir-president-du-senat-pour-la-5-fois_6095607.html",
          },
        ],
      },
    },
    {
      title: "Puits de pétrole à la Teste de buch",
      introduction_text:
        "Un nouveau puits de pétrole a été découvert à la Teste de Buch. Les autorités locales ont exprimé leur préoccupation quant aux conséquences environnementales de cette découverte.",
      slug: "puits-petrole-teste-buch",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "regional",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.francebleu.fr/infos/environnement/la-teste-de-buch-vermilion-voudrait-forer-des-puits-de-petrole-supplementaires-en-foret-usagere-6583576",
          },
          {
            link: "https://www.sudouest.fr/environnement/forages-petroliers-a-cazaux-les-ecologistes-denoncent-le-cynisme-des-benefices-a-court-terme-16838239.php",
          },
        ],
      },
    },
    {
      title: "Le lancement du festival FAB cartonne à Bordeaux",
      introduction_text:
        "Le festival FAB (Festival des Arts de Bordeaux) a connu un grand succès pour sa première édition. Les organisateurs ont annoncé que l'événement serait reconduit l'année prochaine.",
      slug: "lancement-festival-fab-bordeaux",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "regional",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.airzen.fr/culture-a-bordeaux-une-8%E1%B5%89-edition-du-fab-sous-le-signe-de-la-lune/",
          },
          {
            link: "https://www.sudouest.fr/culture/bordeaux-l-ouverture-du-fab-cartonne-avec-le-recital-de-piano-suspendu-a-une-grue-du-chantier-bastide-niel-16881756.php",
          },
          {
            link: "https://aquitaineonline.com/actualites-en-aquitaine/gironde/6683-festival-international-des-arts-de-bordeaux.html",
          },
        ],
      },
    },
    {
      title: "Dali avant Dali",
      introduction_text:
        "L'exposition 'Dali avant Dali' présente les oeuvres du célèbre artiste espagnol Salvador Dali avant qu'il ne devienne célèbre. L'exposition est visible au musée national d'art moderne de Paris.",
      slug: "dali-avant-dali",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "culture",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.francetvinfo.fr/replay-radio/bd-bande-dessinee/dali-avant-dali_6066375.html",
          },
          {
            link: "https://lequotidien.lu/a-la-une/dans-la-tete-de-salvador-dali/",
          },
          {
            link: "https://www.unidivers.fr/bd-dali-birmant-oubrerie/",
          },
        ],
      },
    },
    {
      title: "Bernadette : Catherine Deneuve devient Madame Chirac",
      introduction_text:
        "Le film 'Bernadette', qui retrace la vie de l'épouse de l'ancien président français Jacques Chirac, sortira en salles le mois prochain. Catherine Deneuve y incarne le rôle-titre.",
      slug: "bernadette-catherine-deneuve-madame-chirac",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "culture",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.francebleu.fr/emissions/terre-de-tournage/bernadette-avec-la-realisatrice-lea-domenach-et-sa-directrice-de-production-et-sa-compositrice-7224310",
          },
          {
            link: "https://rmc.bfmtv.com/actualites/politique/la-vie-de-bernadette-chirac-racontee-dans-un-film_AN-202309300242.html",
          },
          {
            link: "https://www.francetvinfo.fr/culture/cinema/sorties-de-films/bernadette-catherine-deneuve-devient-madame-chirac-dans-un-biopic-inattendu-vu-du-petit-bout-de-la-lorgnette_6089799.html",
          },
        ],
      },
    },
    {
      title: "U2 à la sphère de Las Vegas",
      introduction_text:
        "Le groupe de rock irlandais U2 a donné un concert exceptionnel dans la sphère de Las Vegas. Les fans ont pu profiter d'un spectacle unique en son genre.",
      slug: "u2-sphere-las-vegas",
      publish_date: publish_date,
      // @todo: add audio for topics
      audio: "audio.mp3",
      theme: {
        connect: {
          slug: "culture",
        },
      },
      articles: {
        connect: [
          {
            link: "https://www.huffingtonpost.fr/culture/video/a-las-vegas-u2-inaugure-la-sphere-une-salle-de-concert-immersive-entierement-constituee-d-ecrans_223824.html",
          },
          {
            link: "https://www.ouest-france.fr/monde/etats-unis/concert-de-u2-plus-dun-million-de-led-trois-choses-a-savoir-sur-la-salle-the-sphere-a-las-vegas-b9f1c9a6-6115-11ee-a34c-eb9c49c0487f",
          },
        ],
      },
    },
  ]

  try {
    for (const theme of themes) {
      console.log(theme)
      await prisma.theme.create({
        data: theme,
      })
    }

    for (const media of medias) {
      console.log(media)
      await prisma.media.create({
        data: media,
      })
    }

    for (const article of articles) {
      console.log(article)
      await prisma.article.create({
        data: article,
      })
    }

    for (const topic of topics) {
      console.log(topic)
      await prisma.topic.create({
        data: topic,
      })
    }
  } catch (error) {
    console.error(error)
  }
}

main()
