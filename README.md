<h1 align="center">
    Feedget
</h1>

<p align="center">
  <a href="#-tech">Tech</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-project">Project</a>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-run">Run</a>&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-extras">Extras</a>&nbsp;&nbsp;
</p>

## 🔧 Tech

This project has been developed with:

- [Node.js](https://nodejs.org/en/)
- [React](https://reactjs.org)
- [React Native](https://facebook.github.io/react-native/)
- [Expo](https://expo.io/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)

## 💻 Project

A widget that allow users to send, in general, what they think about that page, sending user feedback, suggestions or any other comment that can be useful to page owner.

## 🚦 Run

This project can be executed in mobile or web version.

1. Before anything, start server.

- Server

```bash
# nlw-return/server
npm run dev
```

2. Choose between mobile or web

- Web version

```bash
# nlw-return/web
npm run dev
```

- Mobile version
  - to run mobile version you must first change mobile/libs/api.ts
    - in this file you can change ip variable so it matches your local machine Ipv4 address.
  - its also needed that you have a compatible mobile simulator or expo go installed in your phone.

```bash
# nlw-return/mobile
expo start
```

3. If you want, you can also see database, to do this, run:

```bash
# nlw-return/server
npx prisma studio
# this will open prisma studio into your main browser, so you can look at database
```

---

### 📎 Extras

It has very useful tools that can help page management, such as use of nodemailer service with [Mailtrap](mailtrap.io) that automatically mails the user feedback to page owner inbox.

Beside that it also apply principles from SOLID concept, like Dependency Inversion Principle. Which tells that a module shouldn't search for it dependencies, but use them as abstractions.
