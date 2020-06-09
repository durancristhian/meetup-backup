# meetup-backup

[Backup de Burger.js](burgerjs-backup.now.sh)

Hice esto muy rápido para backupear los eventos de [Burger.js](https://twitter.com/burgerjsba) de meetup.com porque vamos a dejar de usar esa plataforma.

> Importante: Este código no resiste un code review

## Desarrollar local

```bash
# instalar deps
npm i

# correr el proyecto
npm start
```

## Te gustaría hacer lo mismo con otro evento?

En el archivo `scripts/backup.js` puse un paso a paso.

> Dato: Correr este script con muchos eventos al mismo tiempo va a hacer que el API de meetup empiece a dar [429](https://httpstatuses.com/429). Por lo que fui corriendo el script una vez por cada id. Es muy fiaca, pero bue.

Por cualquier pregunta o mejora pueden crear un issue o hablarme por [tuiti](https://twitter.com/DuranCristhian).
