# 🔀 Integration with Routing libraries

{% tabs %}
{% tab title="Vanilla" %}
In the same file where you call&#x20;

<pre class="language-diff"><code class="lang-diff">
<strong>
</strong><strong>+declare module "@codegouvfr/react-dsfr" {
</strong>+    // eslint-disable-next-line @typescript-eslint/no-empty-interface
+    export interface LinkProps extends TypeRouteLink { }
+}

 startDsfrReact({
     "defaultColorScheme": "system"
 });
</code></pre>
{% endtab %}

{% tab title="Second Tab" %}

{% endtab %}
{% endtabs %}
