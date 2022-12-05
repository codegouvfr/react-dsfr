# ☑ Icons

{% embed url="https://youtu.be/FdabjOlaCUQ" %}

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

<figure><img src=".gitbook/assets/image (5) (1).png" alt=""><figcaption></figcaption></figure>

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

<figure><img src=".gitbook/assets/image (7) (1).png" alt=""><figcaption></figcaption></figure>

{% hint style="success" %}
No need to worry about importing the correct icons file.&#x20;

It's done automatically for you.

The `dsfr/utility/icons/icons.css` file is patched by the `only_include_used_icons` script. &#x20;

This script look at your code to see what icons you are actually using then proceed to patch `icon.css` file so that only thoses icons are defined.  &#x20;
{% endhint %}

The `fr.cx()` utility is also handy for autocompleting the icons that are supported: &#x20;

<figure><img src=".gitbook/assets/frcx (1).gif" alt=""><figcaption><p>Using fr.cx()</p></figcaption></figure>
