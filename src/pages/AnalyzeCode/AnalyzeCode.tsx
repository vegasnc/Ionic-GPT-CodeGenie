import { 
    IonContent, 
    IonPage,
    IonTitle,
    IonButton,
    IonItem,
    IonSelect,
    IonSelectOption,
    IonTextarea,
    IonText,
    IonSplitPane,
    IonMenu,
    IonHeader,
    IonToolbar,
    IonGrid,
    IonRow,
    IonCol} from '@ionic/react';
import { Configuration, OpenAIApi } from 'openai';

import React, { useEffect, useRef, useState } from "react";

const ANYCODE = 0;
const SMART_CONTRACT = 1;
const API_DOCUMENTATION = 2;

const TEXT_TYPE = 0;
const IMAGE_TYPE = 1;
const URL_TYPE = 2;

const OPENAI_API_KEY = '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';

const AnalyzeCode: React.FC = () => {

    const [stack, setStack] = useState(ANYCODE);
    const [type, setType] = useState(TEXT_TYPE);

    const codeTextBoxRef = useRef<HTMLIonTextareaElement>(null);

    const configuration = new Configuration({
        apiKey: OPENAI_API_KEY,

      });
    const openai = new OpenAIApi(configuration);

    const handleStack = (value: number) => {
        console.log("handleStack");
        
        setStack(value);
    }

    const handleType = (value: number) => {
        console.log("handleType");
        setType(value);
    }

    const handleAnalyze = async () => {
        console.log(codeTextBoxRef.current?.value);
        const response = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: "Analyze this program code: " + codeTextBoxRef.current?.value,
        });

        console.log(response);
    }

    return (
        <IonPage >
            <IonContent id="content" className='ion-padding' fullscreen>
                <IonSelect 
                    aria-label='AnyCode' 
                    interface="popover" 
                    value={stack} 
                    onIonChange={(e) => handleStack(e.detail.value)}>
                    <IonSelectOption value={ANYCODE}>AnyCode</IonSelectOption>
                    <IonSelectOption value={SMART_CONTRACT}>Smart Contracts</IonSelectOption>
                    <IonSelectOption value={API_DOCUMENTATION}>Api Documentation</IonSelectOption>
                </IonSelect>
                <IonSelect 
                    aria-label='Text' 
                    interface="popover" 
                    value={type}  
                    onIonChange={(e) => handleType(e.detail.value)}>
                    <IonSelectOption value={TEXT_TYPE}>Text</IonSelectOption>
                    <IonSelectOption value={IMAGE_TYPE}>Image</IonSelectOption>
                    <IonSelectOption value={URL_TYPE}>URL</IonSelectOption>
                </IonSelect>

                { 
                    type == IMAGE_TYPE ? <IonButton>Upload</IonButton> : 
                            <></>
                }

                <IonGrid>
                    <IonRow>
                        <IonCol sizeXl="5" sizeMd='6' sizeSm='12' sizeXs='12'>
                            <IonTextarea ref={codeTextBoxRef} placeholder='Please enter ot copy and paste your code'>

                            </IonTextarea>
                        </IonCol>
                        <IonCol sizeXl="2" sizeMd='2' sizeSm='12' sizeXs='12'>
                            <IonButton
                                onClick={handleAnalyze}>Analyze</IonButton>
                            <IonButton>Explain</IonButton>
                            <IonButton>Debug</IonButton>
                            <IonButton>Test Cases</IonButton>
                            <IonButton>Feature Suggestions</IonButton>
                            <IonButton>Refactor</IonButton>
                            <IonButton>Rewrite</IonButton>
                            <IonButton>Microservices</IonButton>
                        </IonCol>
                        <IonCol sizeXl="5" sizeMd='6' sizeSm='12' sizeXs='12'>
                            <IonTextarea 
                                placeholder='Please wait for a response...'
                                readonly={true}>

                            </IonTextarea>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
}

export default AnalyzeCode;