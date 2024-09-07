"use client";

import dynamic from "next/dynamic";
import { DefaultTrustedPolicy } from "../DefaultTrustedPolicy";

// Chart cannot be render on server, you nee to use lazy loading
// https://nextjs.org/docs/pages/building-your-application/optimizing/lazy-loading#with-no-ssr
const BarChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/BarChart"), {
    ssr: false
});
const BarLineChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/BarLineChart"), {
    ssr: false
});
const GaugeChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/GaugeChart"), {
    ssr: false
});
const LineChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/LineChart"), {
    ssr: false
});
const MultiLineChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/MultiLineChart"), {
    ssr: false
});
const PieChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/PieChart"), {
    ssr: false
});
const RadarChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/RadarChart"), {
    ssr: false
});
const ScatterChart = dynamic(() => import("@codegouvfr/react-dsfr/Chart/ScatterChart"), {
    ssr: false
});

export default function Page() {
    return (
        <>
            <DefaultTrustedPolicy />
            <BarChart
                x={[["1", "2"]]}
                y={[
                    [1, 2, 3],
                    [2, 3, 4]
                ]}
            />
            <BarLineChart ybar={[20, 15, 12]} x={[1, 2, 3]} y={[30, 10, 20]} />
            <GaugeChart value={30} init={0} target={100} />
            <LineChart x={["A", "B"]} y={[10, 20, 30]} />
            <MultiLineChart
                x={[
                    [1, 2, 3],
                    [1, 2, 3]
                ]}
                y={[
                    [30, 10, 20],
                    [10, 20, 30]
                ]}
            />
            <PieChart x={[1, 2, 3]} y={[10, 20, 30]} fill />
            <RadarChart
                x={[
                    ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                    ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
                    ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"]
                ]}
                y={[
                    [65, 59, 90, 81, 56, 55, 40],
                    [28, 48, 40, 19, 96, 27, 100],
                    [12, 12, 20, 23, 13, 14, 15]
                ]}
            />
            <ScatterChart
                x={[
                    [1, 5, 8],
                    [1, 2, 15]
                ]}
                y={[
                    [30, 10, 20],
                    [10, 20, 30]
                ]}
            />
        </>
    );
}
