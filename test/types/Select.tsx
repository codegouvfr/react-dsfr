import React from "react";
import { Select, type SelectProps } from "../../src/SelectNext";
import { assert, type Equals } from "tsafe";

{
    const values = ["foo", "bar", "baz"] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            //@ts-expect-error
            "value": "not foo"
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            //@ts-expect-error
            "value": "not foo"
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], Value>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], Value>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select<SelectProps.Option<Value>[]>
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], Value>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    type Value = typeof values[number];

    <Select<SelectProps.Option<Value>[]>
        label="Label"
        nativeSelectProps={{
            //@ts-expect-error
            "value": "not foo",
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], Value>>();
            }
        }}
        //@ts-expect-error
        options={values.map(value => ({
            "value": "not foo",
            "label": value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = [1, 2, 3] as const;

    <Select<SelectProps.Option<string>[]>
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], string>>();
            }
        }}
        options={values.map(value => ({
            "value": `${value}`,
            "label": "" + value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = [1, 2, 3] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            "value": "foo",
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], string>>();
            }
        }}
        options={values.map(value => ({
            "value": `${value}`,
            "label": "" + value
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    type Value = "foo" | "bar" | "baz";

    const options: SelectProps.Option<Value>[] = [
        {
            "value": "foo",
            "label": "Option foo"
        },
        {
            "value": "bar",
            "label": "Option bar"
        },
        {
            "value": "baz",
            "label": "Option bar"
        }
    ];

    <Select
        label="Label"
        nativeSelectProps={{
            "value": undefined,
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], Value>>();
            }
        }}
        options={options}
        placeholder="Sélectionnez une option"
    />;
}

{
    const values = ["foo", "bar", "baz"] as const;

    <Select
        label="Label"
        nativeSelectProps={{
            "value": undefined,
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], typeof values[number]>>();
            }
        }}
        options={values.map(value => ({
            value,
            "label": `Option ${value}`
        }))}
        placeholder="Sélectionnez une option"
    />;
}

{
    const dogOrCatOptions = [
        {
            value: "dog",
            label: "Dog"
        },
        {
            value: "cat",
            label: "Cat"
        }
    ] as const;

    type DogOrCat = typeof dogOrCatOptions[number]["value"];

    <Select
        label="Dog or cat person?"
        options={[...dogOrCatOptions]}
        placeholder="Select an option"
        nativeSelectProps={{
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], DogOrCat>>();
            }
        }}
    />;
}

{
    const dogOrCatOptions = [
        {
            value: "dog",
            label: "Dog"
        },
        {
            value: "cat",
            label: "Cat"
        }
    ] as const;

    type DogOrCat = typeof dogOrCatOptions[number]["value"];

    <Select
        label="Dog or cat person?"
        options={[...dogOrCatOptions]}
        //TODO: Make it work with: options={[...dogOrCatOptions]}
        placeholder="Select an option"
        nativeSelectProps={{
            "onChange": event => {
                assert<Equals<typeof event["target"]["value"], DogOrCat>>();
            }
        }}
    />;
}
