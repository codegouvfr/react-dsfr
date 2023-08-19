# ☑ Icons

{% embed url="https://youtu.be/FdabjOlaCUQ" %}

Icons just work, you can copy paste any code from [the dsfr documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/icone) and expect things to work.

{% hint style="info" %}
Whenever you add a new icon to your project, restart your local server. This will launch the `only_include_used_icons` script configured in the [Initial setup](./) (else you'll see a blue square instead of your icon).
{% endhint %}

```jsx
import { fr } from "@codegrouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

<>
  <Button iconId="fr-icon-checkbox-circle-line">Label button MD</Button>
  <span className={fr.cx("fr-icon-ancient-gate-fill")} aria-hidden={true}/>
  <i className={fr.cx("fr-icon-ancient-gate-fill")} />
<>
```

<figure><img src=".gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>

But on top of that, all icons from [Remixicon](https://remixicon.com/) are supported.

You can go and search for a keyword:

<figure><img src=".gitbook/assets/image (2) (1) (1).png" alt=""><figcaption><p>Searching for "download" on remixicon.com</p></figcaption></figure>

When you find something fitting, you can copy paste the class name ( starting with `ri-` ) and use it anywhere you would have used a `.fr-icon-xxxx` ! 🚀

Example:

```jsx
import { fr } from "@codegrouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";

<>
  <Button iconId="ri-mail-download-line">Label button MD</Button>
  <span className={fr.cx("ri-mail-download-line")} aria-hidden={true}/>
  <i className={fr.cx("ri-mail-download-line")} />
<>
```

<figure><img src=".gitbook/assets/image (7) (1).png" alt=""><figcaption></figcaption></figure>

{% hint style="success" %}
No need to worry about importing the correct icons file.

It's done automatically for you.

The `dsfr/utility/icons/icons.css` file is patched by the `only_include_used_icons` script.

This script looks at your code to see what icons you are actually using then proceed to patch `icon.css` file so that only those icons are defined.
{% endhint %}

The `fr.cx()` utility is also handy for autocompleting the icons that are supported:

<figure><img src=".gitbook/assets/frcx (1).gif" alt=""><figcaption><p>Using fr.cx()</p></figcaption></figure>
