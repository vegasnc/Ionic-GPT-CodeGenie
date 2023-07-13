import { 
    IonContent, 
    IonPage,
    IonButton } from '@ionic/react';

import React from "react";

const Dashboard: React.FC = () => {
    return (
        <IonPage>
            <IonContent id="content" fullscreen>
                <h1>This is Dashboard</h1>
                <IonButton routerLink={`/chatbot`} size='default'>
                    Go To ChatBot
                </IonButton>
            </IonContent>
        </IonPage>
    );
}

export default Dashboard;