import { Routes } from '@angular/router';
import { Core } from './components/core/core';
import { PrivacyPolicy } from './components/privacy-policy/privacy-policy';
import { LegalNotice } from './components/legal-notice/legal-notice';

export const routes: Routes = [
    {
        path: "",
        component: Core
    },
    {
        path: "privacy-policy",
        component: PrivacyPolicy
    },
    {
        path: "legal-notice",
        component: LegalNotice
    }


];
