# LUCK-G'S Family Club

## Customer onboarding

The registration form creates a `customers` document. Once the customer spins the wheel, staff can send the exact reward and coupon through WhatsApp using the button in the reward popup.

No WhatsApp API is required: the button opens WhatsApp with the customer number, reward, reward pass ID, and expiry date filled in.

Deploy the frontend with `firebase deploy`.

The Firestore rules enforce one customer per mobile number. Deploy them together with the website using `firebase deploy --only hosting,firestore:rules`.

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
