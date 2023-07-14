---
description: >-
  Track your audience engagement and gain insights into how citizens interact
  with your website.
---

# 📊 Analytics

In the realm of analytics, the Service d'Information du Gouvernement (SIG) stipulates the utilization of [Eulerian](https://www.eulerian.com/). The vanilla JS/CSS module @gouvfr/dsfr, which powers this toolkit, is deeply integrated with the Eulerian platform.

Activating it equips you with the capabilities to accurately track user interactions with your application, including specific buttons they click and pages they navigate. To comply with GDPR regulations, it's crucial to request user consent before implementing this detailed level of tracking.

Presented here is an illustrative example demonstrating how to initialize the Eulerian integration and solicit user consent for its usage.

{% embed url="https://github.com/garronej/react-dsfr-next-appdir-demo/blob/main/ui/consentManagement.tsx" %}
Example Enabling Eulerian in Next.js App Router
{% endembed %}

You may refer to the documentation of the consentManagement utility via the following link:

{% embed url="https://components.react-dsfr.fr/?path=/docs/components-consentmanagement--default" %}
consentManagement utility documentation
{% endembed %}

To operate effectively, Eulerian requires certain parameters, which are provided upon initial registration on the Eulerian platform. This example includes only those. For a complete list and descriptions of accepted parameters, refer to the following link:

{% embed url="https://github.com/codegouvfr/react-dsfr/blob/c3b7459732ac909530d998b0c233b366c958d0a1/src/eulerianAnalytics.ts#L3-L71" %}
Type definition of the Eulerian params
{% endembed %}

In-depth documentation elaborating on all these parameters can be found here:

{% embed url="https://github.com/GouvernementFR/dsfr/tree/main/src/analytics/doc/analytics" %}
Documentation of the Eulerian integration into @gouvfr/dsfr
{% endembed %}

For efficient tracking of interactions with various website elements, it's essential that each DSFR component is assigned a unique ID. This allows you to distinguish between different elements via the Eulerian dashboard metrics.

Each component of the react-dsfr toolkit can be explicitly given an ID prop. In the event you don't assign one, react-dsfr will make an effort to generate comprehensible IDs that aid in component identification.
