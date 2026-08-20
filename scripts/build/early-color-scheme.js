/* eslint-disable no-undef */

{
    const isDark = (() => {
        query_param: {
            const value = new URLSearchParams(location.search).get("dark");

            switch (value) {
                case "true":
                    return true;
                case "false":
                    return false;
                default:
                    break query_param;
            }
        }

        local_storage: {
            const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");

            if (colorSchemeReadFromLocalStorage === null) {
                break local_storage;
            }

            if (colorSchemeReadFromLocalStorage === "system") {
                break local_storage;
            }

            switch (colorSchemeReadFromLocalStorage) {
                case "dark":
                    return true;
                case "light":
                    return false;
                default: 
                    break local_storage;
            }
        }

        return matchMedia("(prefers-color-scheme: dark)").matches;
    })();

    document.documentElement.setAttribute(
        "data-fr-scheme",
        (() => {
            const colorSchemeReadFromLocalStorage = localStorage.getItem("scheme");

            if (colorSchemeReadFromLocalStorage === null) {
                return "system";
            }

            return colorSchemeReadFromLocalStorage;
        })()
    );
    document.documentElement.setAttribute("data-fr-theme", isDark ? "dark" : "light");

    {
        let element = document.getElementById("dsfr-root-color-scheme");

        if (element !== null) {
            element.remove();
        }

        element = document.createElement("style");

        element.id = "dsfr-root-color-scheme";

        element.innerHTML = `:root { color-scheme: ${isDark ? "dark" : "light"}; }`;

        document.head.appendChild(element);
    }

    {
        const name = "theme-color";

        let element = document.querySelector(`meta[name=${name}]`);

        if (element !== null) {
            element.remove();
        }

        element = document.createElement("meta");

        element.name = name;

        element.content = isDark ? "#161616" : "#ffffff";

        document.head.appendChild(element);
    }
}
