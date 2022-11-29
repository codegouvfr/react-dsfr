# 🌎 Internationalisation

DSFR components contains hard coded strings.&#x20;

Theses strings can be switched form a langage to antother with a provider.&#x20;

![image](https://user-images.githubusercontent.com/6702424/202221151-9e04dd77-da52-4ce7-b1b1-5bb653addf50.png) ![image](https://user-images.githubusercontent.com/6702424/202221309-b11b89a7-4893-442b-ab2a-92f85177ba69.png)

{% embed url="https://github.com/etalab/etalab-website/blob/b427049dd9609ddbdd5fc2b42484d700e20851f4/pages/_app.tsx#L39-L42" %}
Example in the Etalab website with the i18n library i18nifty
{% endembed %}

If a translation for a langage is missing you can add translations on a component basis:&#x20;

{% embed url="https://github.com/etalab/etalab-website/blob/3978b9f0a799a5564cef52a352324b83db1ba48e/pages/_app.tsx#L7-L14" %}
Adding chinese translation for the Alert component
{% endembed %}
