/*

1. Go to https://www.meetup.com/es-ES/{{YOUR_EVENT_NAME}}/events/past/

IMPORTANT: Scroll down until all events are loaded in the page

2. Open your developer tools and run the following

```js
const eventNodes = document.querySelectorAll('.eventList-list .eventCard--link')
const events = Array.from([...eventNodes])
copy(events.map(event => event.href))
```

This script will copy to your clipboard the url of each event in the group
ordered from the newest to the oldest, as they appear on the page

3. Save the array you got from the script on a file called events.json

4. Update the variable MEETUP_GROUP_NAME with the name of your meetup group name

*/

const MEETUP_GROUP_NAME = 'burgerjs'

require('es6-promise').polyfill()
require('isomorphic-fetch')

const fs = require('fs')
const path = require('path')
const request = require('request')

const events = require('./events.json')

const eventIds = events
    /* get the last part of the URL which contains the id */
    .map(event => event.split('events/')[1])
    /* extract the last '/' */
    .map(id => id.substr(0, id.length - 1))

const download = (url, path, callback) => {
    request.head(url, (err, res, body) => {
        request(url)
            .pipe(fs.createWriteStream(path))
            .on('close', callback)
    })
}

const get = url => new Promise((resolve, reject) => {
    fetch(url)
        .then(res => {
            if (res.status !== 200) {
                return reject(res)
            }

            return resolve(res.json())
        })
        .catch(error => {
            return reject(error)
        })
})

eventIds.forEach(async eventId => {
    try {
        const basePath = `https://api.meetup.com/${MEETUP_GROUP_NAME}/events/${eventId}`

        const event = await get(`${basePath}`)
        const attendance = await get(`${basePath}/attendance`)
        const comments = await get(`${basePath}/comments`)
        const photos = await get(`${basePath}/photos`)

        const eventPath = path.join(__dirname, 'events', event.name)

        const attendancePath = path.join(eventPath, 'attendance.json')
        const commentsPath = path.join(eventPath, 'comments.json')
        const eventInformationPath = path.join(eventPath, 'event.json')
        const photosPath = path.join(eventPath, 'photos.json')
        const photosFolderPath = path.join(eventPath, 'photos')

        fs.mkdirSync(eventPath, { recursive: true })

        fs.writeFileSync(attendancePath, JSON.stringify(attendance, null, 2))
        fs.writeFileSync(commentsPath, JSON.stringify(comments, null, 2))
        fs.writeFileSync(eventInformationPath, JSON.stringify(event, null, 2))
        fs.writeFileSync(photosPath, JSON.stringify(photos, null, 2))

        if (Object.values(photos)) {
            fs.mkdirSync(photosFolderPath, { recursive: true })

            Object.values(photos)
                .map(photo => photo.highres_link || photo.photo_link)
                .map((link, index) => ({
                    extension: link.substr(link.lastIndexOf('.')),
                    index,
                    url: link
                }))
                .forEach(({ extension, index, url }) => {
                    download(
                        url,
                        path.join(photosFolderPath, `${index}.${extension}`),
                        () => { }
                    )
                })
        }
    }
    catch (error) {
        throw new Error(error)
    }
})
