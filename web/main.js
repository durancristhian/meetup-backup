import { h, render, Fragment } from 'preact'
import { PreactHTMLConverter } from 'preact-html-converter';

const converter = PreactHTMLConverter();

import event1 from './events/Burger.js BA #1 - Combo 1, Simple con queso/**/*.*'
import event2 from './events/Burger.js BA #2 - Doble cheddar, doble panceta/**/*.*'
/* removed the ;) from the original event name */
import event3 from './events/Burger.js BA #3 - Deluxe Edition/**/*.*'
import event4 from './events/Burger.js BA #4 - Chorizo burger sin morrón/**/*.*'
import event5 from './events/Burger.js BA #5 - La quíntuple con Sysarmy y LinuxChix/**/*.*'
import event6 from './events/Burger.js #6 - La platense/**/*.*'
/* removed the double quotes from the original event name */
import event7 from './events/Burger.js #7 - El templo/**/*.*'
import event8 from './events/Burger.js #8 - En lo de Francis/**/*.*'
/* removed the 🍔🍔🍔 from the original event name */
import event9 from './events/Burger.js #9 - Volvimos para quedarnos/**/*.*'
/* removed the 💪🏼 from the original event name */
import event10 from './events/Burger.js #10 - Manteniendo la rutina/**/*.*'
import event11 from './events/Burger.js #11 - In Burger We Trust/**/*.*'
import event12 from './events/Burger.js #12 - Combatamos el calor con Burgers y Cerveza/**/*.*'
import event13 from './events/Burger.js #13 - Engordando gracias a Node.js v10/**/*.*'
import event15 from './events/Burger.js #15 - Mundialmente gordos/**/*.*'
import event16 from './events/Burger.js #16 - Día del programador/**/*.*'
import event17 from './events/Burger.js #17 - ¿Qué somos? ¡Lennyadores!/**/*.*'
import event18 from './events/Burger.js #18 - Hola 2019, ¿arrancamos morfando?/**/*.*'
import event19 from './events/¿Querían Burger.js? Acá tienen Burger.js/**/*.*'
import event19Bis from './events/Burger.js - Junio 2019/**/*.*'
import event20 from './events/Burger.js #20 - Agosto 2019/**/*.*'
import event21 from './events/Burger.js #21 - Octubre 2019/**/*.*'
import event22 from './events/Burger.js #22 - Noviembre 2019 - Por y para Manu Rueda/**/*.*'
import event23 from './events/Burger.js #23 - Diciembre 2019 - Despedida de año/**/*.*'
import event24 from './events/Burger.js #24 - Enero 2020 - Vorazmente felices/**/*.*'
import event25 from './events/Burger.js #25 - Febrero 2020 - Carnaval de Hamburguesas/**/*.*'

const EVENTS = [
    event1,
    event2,
    event3,
    event4,
    event5,
    event6,
    event7,
    event8,
    event9,
    event10,
    event11,
    event12,
    event13,
    event15,
    event16,
    event17,
    event18,
    event19,
    event19Bis,
    event20,
    event21,
    event22,
    event23,
    event24,
    event25,
].reverse()

function Event({ data }) {
    return <Fragment>
        <div className="box" id={data.event.json.name}>
            <h2>{data.event.json.name}</h2>
            <p>Fecha: {data.event.json.local_date}</p>
            <p>Hora: {data.event.json.local_time}</p>
            {
                data.event.json.venue && <p>Lugar: {data.event.json.venue.name}, {data.event.json.venue.address_1}</p>
            }
            <p>Asistentes: {data.event.json.yes_rsvp_count}</p>
            <ul>
                {
                    data.attendance.json
                        .filter(p => p.rsvp.response === 'yes')
                        .map(p => <li>{p.member.name} {p.rsvp.guests ? `+${p.rsvp.guests}` : null}</li>)
                }
            </ul>
            <p>Descripción del evento:</p>
            {converter.convert(data.event.json.description)}
            {
                data.comments.json.length
                    ? <div>
                        <p>Comentarios:</p>
                        <ul>
                            {
                                data.comments.json.map(c => <li>
                                    {c.member.name}: {c.comment}
                                </li>)
                            }
                        </ul>
                    </div>
                    : null
            }
            {
                data.photos.json.length
                    ? <div>
                        <p>Fotos:</p>
                        <ul>
                            <li>
                                {
                                    Object
                                        .keys(data.photos)
                                        .filter(k => k !== 'json')
                                        .map(k => data.photos[k])
                                        .map((img, i) => <img alt={`${data.event.json.name} Foto número ${i + 1}`} src={img.jpeg} />)
                                }
                            </li>
                        </ul>
                    </div>
                    : null
            }
        </div>
        <a href="#index" alt="Ir al índice">Ir al índice</a>
    </Fragment>
}

function Content() {
    const toggleDarkMode = () => {
        document.documentElement.classList.toggle('dark-mode')
    }

    return <main>
        <header>
            <div>
                <h1>Backup de Burger.js</h1>
                <p>Por <a target="_blank" href="https://twitter.com/DuranCristhian">Cristhian Duran</a></p>
            </div>
            <div>
                <p>
                    <a target="_blank" href="https://github.com/durancristhian/meetup-backup">Source code</a>
                </p>
                <p>
                    <button onClick={toggleDarkMode}>Dark mode</button>
                </p>
            </div>
        </header>
        {
            <div className="box" id="index">
                <h2>Índice</h2>
                <ul>
                    {
                        EVENTS.map(data => <li>
                            <a href={`#${data.event.json.name}`}>{data.event.json.name}</a>
                        </li>)
                    }
                </ul>
            </div>
        }
        {
            EVENTS.map(data => <Event data={data}></Event>)
        }
    </main>
}

console.log(EVENTS)

render(<Content />, document.getElementById('content'))
