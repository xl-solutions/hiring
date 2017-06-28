import moment from 'moment-timezone'

moment.tz.setDefault('America/Sao_Paulo')

export const date = () => new Date(moment().format('YYYY-MM-DD'))
