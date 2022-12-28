import { ClientComponent } from "../shared/ClientComponent";
import { Alert } from "@codegouvfr/react-dsfr/Alert";

export default function Page() {

    return (
        <>
            <h1>Hello World</h1>
            <ClientComponent />
            <Alert
                closable
                description="Everything went well"
                severity="success"
                title="Message successfully sent"
            />
        </>
    );

}
