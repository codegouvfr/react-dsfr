import { Pagination } from "../dist/Pagination";
import { sectionName } from "./sectionName";
import { getStoryFactory } from "./getStory";

const { meta, getStory } = getStoryFactory({
    sectionName,
    "wrappedComponent": { Pagination },
    "description": `
- [See DSFR documentation](https://www.systeme-de-design.gouv.fr/elements-d-interface/composants/pagination)
- [See DSFR demos](https://main--ds-gouv.netlify.app/example/component/pagination/)
- [See source code](https://github.com/codegouvfr/react-dsfr/blob/main/src/Pagination.tsx)`,
    "disabledProps": ["lang"]
});

export default meta;

export const Default = getStory({
    count: 100,
    defaultPage: 2,
    showFirstLast: true,
    getPageLinkProps: pageNumber => ({ href: `/page/${pageNumber}` })
});

export const SummaryWithNoPage = getStory({
    count: 0,
    getPageLinkProps: pageNumber => ({ href: `/page/${pageNumber}` })
});

export const SummaryWithSinglePage = getStory({
    count: 1,
    getPageLinkProps: pageNumber => ({ href: `/page/${pageNumber}` })
});

export const SummaryWith132Pages = getStory({
    count: 132,
    defaultPage: 42,
    getPageLinkProps: pageNumber => ({ href: `/page/${pageNumber}` })
});

export const SummaryWithoutShowFirstLast = getStory({
    count: 45,
    defaultPage: 42,
    showFirstLast: false,
    getPageLinkProps: pageNumber => ({ href: `/page/${pageNumber}` })
});

export const SummaryWithLastPage = getStory({
    count: 24,
    defaultPage: 24,
    getPageLinkProps: pageNumber => ({ href: `/page/${pageNumber}` })
});
