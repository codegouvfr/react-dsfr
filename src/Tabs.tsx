import React, { memo, forwardRef, useId, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { FrIconClassName, RiIconClassName } from "./lib/generatedFromCss/classNames";
import { symToStr } from "tsafe/symToStr";
import { fr } from "./lib";
import { cx } from "./lib/tools/cx";
import { assert } from "tsafe/assert";
import type { Equals } from "tsafe";
import { useCallbackFactory } from "./lib/tools/powerhooks/useCallbackFactory";

export type TabsProps = TabsProps.Uncontrolled | TabsProps.Controlled;

export namespace TabsProps {
    export type Common = {
        className?: string;
        label?: string;
        classes?: Partial<Record<"root" | "tab" | "panel", string>>;
    };

    export type Uncontrolled = Common & {
        tabs: {
            label: ReactNode;
            iconId?: FrIconClassName | RiIconClassName;
            content: ReactNode;
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
        children?: NonNullable<ReactNode>;
    };
}

/** @see <https://react-dsfr-components.etalab.studio/?path=/docs/components-tabs> */
export const Tabs = memo(
    forwardRef<HTMLDivElement, TabsProps>((props, ref) => {
        const {
            className,
            label,
            classes = {},
            tabs,
            selectedTabId,
            onTabChange,
            children,
            ...rest
        } = props;

        assert<Equals<keyof typeof rest, never>>();

        const id = useId();

        const getSelectedTabIndex = () => {
            assert(selectedTabId !== undefined);
            return tabs.findIndex(({ tabId }) => tabId === selectedTabId);
        };

        const [selectedTabIndex, setSelectedTabIndex] = useState<number>(
            selectedTabId !== undefined ? getSelectedTabIndex : 0
        );

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

        const getPanelId = (tabIndex: number) => `tabpanel-${id}-${tabIndex}-panel`;
        const getTabId = (tabIndex: number) => `tabpanel-${id}-${tabIndex}`;

        return (
            <div className={cx(fr.cx("fr-tabs"), className)} ref={ref} {...rest}>
                <ul className={fr.cx("fr-tabs__list")} role="tablist" aria-label={label}>
                    {tabs.map(({ label, iconId }, tabIndex) => (
                        <li key={label + (iconId ?? "")} role="presentation">
                            <button
                                id={getTabId(tabIndex)}
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
                                    `fr-tabs__panel${
                                        tabIndex === selectedTabIndex ? "--selected" : ""
                                    }`
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
