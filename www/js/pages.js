import '@riotjs/hot-reload'
import * as riot from 'riot'

import App from '../tags/app.riot'

riot.register('app', App)

riot.mount('app')
