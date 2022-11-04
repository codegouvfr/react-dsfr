# ✅ Icons

Icons just works, you can copy paste the any code from [the dsfr documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/fondamentaux-techniques/icones) and expect things to work.

```jsx
<>
  <button className="fr-btn fr-icon-checkbox-circle-line fr-btn--icon-left">
    Label bouton MD
  </button>
  <span className="fr-icon-ancient-gate-fill" aria-hidden="true"/>
  <i className="fr-icon-ancient-gate-fill" />
<>
```

But on top of that all icons from [Remixicon](https://remixicon.com/) are supported.&#x20;

You can go and search for a keyword:  &#x20;

<figure><img src=".gitbook/assets/image (2).png" alt=""><figcaption><p>Searching for "download" on remixicon.com</p></figcaption></figure>

When you find something fitting you can copy paste the class name ( starting with `ri-` ) and use it anywhere you would have could have used a `.fr-icon-xxxx` ! 🚀 &#x20;

Example: &#x20;

```jsx
<>
  <button className="fr-btn ri-mail-download-line fr-btn--icon-left">
    Label bouton MD
  </button>
  <span className="ri-mail-download-line" aria-hidden="true"/>
  <i className="ri-mail-download-line" />
<>
```

{% hint style="success" %}
The `dsfr/utility/icons/icons.css` file that you import is patched when npx only\_include\_used\_icons is run. &#x20;

This script look at your code to see what icons you are actually using it will then proceed to patch the `icon.css` file so that only thoses icons are defined.  &#x20;
{% endhint %}

