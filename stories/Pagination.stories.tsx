import { Pagination } from "../dist/Pagination";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Pagination },
    "description": `
- [See DSFR documentation](//www.systeme-de-design.gouv.fr/elements-d-interface/composants/pagination)
- [See DSFR demos](//main--ds-gouv.netlify.app/example/component/pagination/)
- [See source code](//github.com/codegouvfr/react-dsfr/blob/main/src/Pagination.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    count: 100,
    defaultPage: 2,
    showFirstLast: true,
    getPageHref: pageNumber => `/page/${pageNumber}`
});

export const SummaryWithNoPage = getStory({
    count: 0,
    getPageHref: pageNumber => `/page/${pageNumber}`
});

export const SummaryWithSinglePage = getStory({
    count: 1,
    getPageHref: pageNumber => `/page/${pageNumber}`
});

export const SummaryWith32Pages = getStory({
    count: 132,
    defaultPage: 42,
    getPageHref: pageNumber => `/page/${pageNumber}`
});

export const SummaryWithoutShowFirstLast = getStory({
    count: 45,
    defaultPage: 42,
    showFirstLast: false,
    getPageHref: pageNumber => `/page/${pageNumber}`
});

export const SummaryWithLastPage = getStory({
    count: 24,
    defaultPage: 24,
    getPageHref: pageNumber => `/page/${pageNumber}`
});
