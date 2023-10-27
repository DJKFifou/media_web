import styles from "@/components/feed/feed.module.scss";
import BackButton from "@/components/Buttons/BackButton/BackButton.component";


export default function LegalNotice() {
  return (
    <div className={styles.main} style={{padding: 20}}>
      <BackButton />
      <h1 style={{textAlign: 'center', marginBottom: 20}}>Les conditions générales d'utilisation</h1>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Mentions légales</h4>
      <p>L'édition du site est assurée par AMÉDIA, dont le siège social est situé au 1 Rue Jacques Ellul, 33800
        Bordeaux </p>
      <p>Numéro de téléphone 05 57 12 20 44</p>
      <p>Hébergeur du site : Vercel</p>
      <p>Directeur de l’édition : Dulaurans Marlène</p>
      <p>Mail : marlene.dulaurans@mmibordeaux.com</p>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Les Conditions Générales d'Utilisation (CGU)</h4>
      <p>Les Conditions Générales d'Utilisation (CGU) ont pour but de définir le cadre juridique régissant la mise à
        disposition du site et de ses services par AMÉDIA, ainsi que d'établir les modalités d'accès et d'utilisation de
        ces services par "l'Utilisateur".</p>
      <p>Toute inscription sur le site ou utilisation de ses services implique l'acceptation préalable de ces CGU par
        l'Utilisateur. Lors de son inscription, chaque utilisateur accepte les CGU en cochant la case située à côté de
        la déclaration suivante : "Je reconnais avoir pris connaissance des CGU et les avoir comprises, et j'accepte de
        m'y conformer".</p>
      <p>En cas de refus des CGU dans le cadre du contrat, l'Utilisateur est tenu de renoncer à l'accès aux services
        offerts par le site. Il est important de noter que AMÉDIA se réserve le droit de modifier le contenu de ces CGU
        à tout moment.</p>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Propriété Intellectuelle</h4>
      <p>Tous les éléments graphiques et autres contenus de l'application sont protégés par les dispositions du Code de
        la propriété intellectuelle. Toute utilisation est soumise aux règles du droit d’auteur.</p>
      <p>Il est à noter que le site AMÉDIA peut contenir des liens externes renvoyant vers des applications ou des sites
        Internet gérés par des tiers. Les mentions légales de l'application ne s'étendent pas à ces tiers, et
        l'application ne peut être tenue responsable des contenus et des pratiques de ces tiers.</p>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Liens hypertextes</h4>
      <p>Le site peut contenir des liens hypertextes. Il est important pour l'Utilisateur de savoir que lorsqu'il clique
        sur ces liens, il quitte le site AMÉDIA. Nous tenons à préciser que nous n'avons aucun contrôle sur le contenu
        des pages web vers lesquelles ces liens dirigent, et par conséquent, nous ne pouvons en aucun cas être tenus
        responsables de leur contenu.</p>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Responsabilité</h4>
      <p>Les informations diffusées sur le site AMÉDIA proviennent de sources réputées fiables. Toutefois, le site ne
        peut garantir l'absence totale de défauts, d'erreurs ou d'omissions. Les informations fournies sont présentées à
        titre indicatif et général, sans constituer un engagement contractuel. </p>
      <p>Malgré des mises à jour régulières, le site AMÉDIA ne peut être tenu responsable des modifications apportées
        aux dispositions administratives et juridiques après leur publication.</p>
      <p>En outre, le site décline toute responsabilité quant à l'utilisation et à l'interprétation des informations
        contenues dans ce site.</p>
      <p>L'utilisateur est tenu de maintenir la confidentialité de son mot de passe. Toute divulgation du mot de passe
        est strictement interdite. L'utilisateur assume tous les risques associés à l'utilisation de son identifiant et
        de son mot de passe, et le site décline toute responsabilité à cet égard.</p>
      <p>Le site AMÉDIA ne peut en aucun cas être tenu pour responsable d'éventuelles infections virales affectant
        l'ordinateur ou tout autre matériel informatique de l'Internaute, résultant de son utilisation, de son accès ou
        du téléchargement de contenu à partir de ce site.</p>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Politique de confidentialité et Cookies</h4>
      <p>Collecte de données personnelles :</p>
      <p>Le site collecte des données personnelles : l’adresse e-mail. Cette donnée est conservée conformément au RGPD.
        Les données ne sont pas revendues. Pour toute demande au sujet des données personnelles, contacter le délégué
        aux données personnelles, vous pouvez contacter l'éditeur aux coordonnées indiquées à l'ARTICLE 1.</p>
      <p>Cookies :</p>
      <p>Lorsque l'Utilisateur visite le site, il doit être conscient qu'un cookie peut être automatiquement installé
        sur son navigateur. Les cookies sont de petits fichiers temporaires stockés sur le disque dur de l'ordinateur de
        l'utilisateur par le navigateur, et ils sont nécessaires pour l'utilisation du site AMÉDIA.</p>
      <p>Il est important de noter que les cookies ne contiennent aucune information personnelle et ne peuvent pas être
        utilisés pour identifier un individu. Chaque cookie renferme un identifiant unique généré de manière aléatoire,
        garantissant ainsi l'anonymat. Certains cookies expirent à la fin de la visite de l'utilisateur, tandis que
        d'autres persistent.</p>
      <p>Les informations contenues dans les cookies sont utilisées dans le but d'améliorer le fonctionnement du site
        AMÉDIA. Cependant, pour certains cookies, le consentement de l'Utilisateur est requis. Si ce consentement n'est
        pas donné, il est important de noter que certaines fonctionnalités ou pages du site pourraient être
        inaccessibles.</p>
      <p>L'utilisateur a la possibilité de désactiver ces cookies en ajustant les paramètres de son navigateur.</p>
      <h4 style={{marginBottom: 10, marginTop: 10}}>Droit Applicable et Compétence Juridique</h4>
      <p>Le présent contrat est régi par la législation française. En cas d'incapacité à résoudre de manière amiable un
        litige survenant entre les parties, seuls les tribunaux français sont habilités à en connaître.</p>
      <p>Pour toute question liée à l'application des présentes Conditions Générales d'Utilisation, vous pouvez
        contacter l'éditeur aux coordonnées indiquées à l'ARTICLE 1.</p>
    </div>
  );
}
