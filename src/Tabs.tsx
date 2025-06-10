"use client";

import React, {
    memo,
    forwardRef,
    useId,
    useState,
    useEffect,
    type ReactNode,
    type CSSProperties
} from "react";
import type { FrIconClassName, RiIconClassName } from "./fr/generatedFromCss/classNames";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./fr";
import { cx } from "./tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { useCallbackFactory } from "./tools/powerhooks/useCallbackFactory";
import { useAnalyticsId } from "./tools/useAnalyticsId";

export type TabsProps = TabsProps.Uncontrolled | TabsProps.Controlled;

export namespace TabsProps {
    export type Common = {
        id?: string;
        className?: string;
        label?: string;
        classes?: Partial<Record<"root" | "tab" | "panel", string>>;
        style?: CSSProperties;
    };

    export type Uncontrolled = Common & {
        tabs: {
            label: ReactNode;
            iconId?: FrIconClassName | RiIconClassName;
            content: ReactNode;
            isDefault?: boolean;
        }[];
        selectedTabId?: undefined;
        onTabChange?: (params: { tabIndex: number; tab: Uncontrolled["tabs"][number] }) => void;
        children?: undefined;
    };

    export type Controlled = Common & {
        tabs: {
            tabId: string;
            label: ReactNode;
            iconId?: FrIconClassName | RiIconClassName;
        }[];
        selectedTabId: string;
        onTabChange: (tabId: string) => void;
        children: ReactNode;
    };
}

/** @see <https://components.react-dsfr.codegouv.studio/?path=/docs/components-tabs> */
export const Tabs = memo(
    forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
        const {
            id: id_props,
            className,
            label,
            classes = {},
            tabs,
            selectedTabId,
            onTabChange,
            children,
            style,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useAnalyticsId({
            "defaultIdPrefix": "fr-tabs",
            "explicitlyProvidedId": id_props
        });

        const getSelectedTabIndex = () => {
            const index = tabs.findIndex(tab =>
                "content" in tab ? tab.isDefault ?? false : tab.tabId === selectedTabId
            );
            return index === -1 ? 0 : index;
        };

        const buttonRefs = React.useRef<Array<HTMLButtonElement | null>>([]);

        const [selectedTabIndex, setSelectedTabIndex] = useState<number>(getSelectedTabIndex);

        useEffect(() => {
            if (selectedTabId === undefined) {
                return;
            }
            setSelectedTabIndex(getSelectedTabIndex());
        }, [selectedTabId]);

        const onTabClickFactory = useCallbackFactory(([tabIndex]: [number]) => {
            if (selectedTabId === undefined) {
                onTabChange?.({
                    tabIndex,
                    "tab": tabs[tabIndex]
                });
            } else {
                onTabChange(tabs[tabIndex].tabId);
            }
        });

        const onKeyboardNavigation = (
            event: React.KeyboardEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLUListElement>
        ) => {
            if (selectedTabId !== undefined) {
                let targetIndex = selectedTabIndex;
                switch (event.key) {
                    case "ArrowRight":
                        targetIndex = selectedTabIndex < tabs.length - 1 ? selectedTabIndex + 1 : 0;
                        break;
                    case "ArrowLeft":
                        targetIndex =
                            selectedTabIndex === 0 ? tabs.length - 1 : selectedTabIndex - 1;
                        break;
                    case "Home":
                        targetIndex = 0;
                        break;
                    case "End":
                        targetIndex = tabs.length - 1;
                        break;
                }
                buttonRefs.current[targetIndex]?.click();
                buttonRefs.current[targetIndex]?.focus();
            }
        };

        const { getPanelId, getTabId } = (function useClosure() {
            const id = useId();

            const getPanelId = (tabIndex: number) => `tabpanel-${id}-${tabIndex}-panel`;
            const getTabId = (tabIndex: number) => `tabpanel-${id}-${tabIndex}`;

            return {
                getPanelId,
                getTabId
            };
        })();

        return (
            <div
                id={id}
                className={cx(fr.cx("fr-tabs"), className)}
                ref={ref}
                style={style}
                {...rest}
            >
                <ul
                    className={fr.cx("fr-tabs__list")}
                    role="tablist"
                    aria-label={label}
                    onKeyDownCapture={e => onKeyboardNavigation(e)}
                >
                    {tabs.map(({ label, iconId }, tabIndex) => (
                        <li key={tabIndex} role="presentation">
                            <button
                                ref={button => (buttonRefs.current[tabIndex] = button)}
                                id={getTabId(tabIndex)}
                                type="button"
                                className={cx(
                                    fr.cx("fr-tabs__tab", iconId, "fr-tabs__tab--icon-left"),
                                    classes.tab
                                )}
                                tabIndex={tabIndex === selectedTabIndex ? 0 : -1}
                                role="tab"
                                aria-selected={tabIndex === selectedTabIndex}
                                aria-controls={getPanelId(tabIndex)}
                                onClick={onTabClickFactory(tabIndex)}
                            >
                                {label}
                            </button>
                        </li>
                    ))}
                </ul>
                {selectedTabId === undefined ? (
                    tabs.map(({ content }, tabIndex) => (
                        <div
                            key={tabIndex}
                            id={getPanelId(tabIndex)}
                            className={cx(
                                fr.cx(
                                    "fr-tabs__panel",
                                    tabIndex === selectedTabIndex && "fr-tabs__panel--selected"
                                ),
                                classes.panel
                            )}
                            role="tabpanel"
                            aria-labelledby={getTabId(tabIndex)}
                            tabIndex={0}
                        >
                            {content}
                        </div>
                    ))
                ) : (
                    <div
                        id={getPanelId(selectedTabIndex)}
                        className={cx(
                            fr.cx("fr-tabs__panel", "fr-tabs__panel--selected"),
                            classes.panel
                        )}
                        role="tabpanel"
                        aria-labelledby={getTabId(selectedTabIndex)}
                        tabIndex={0}
                    >
                        {children}
                    </div>
                )}
            </div>
        );
    })
);

Tabs.displayName = symToStr({ Tabs });

export default Tabs;
