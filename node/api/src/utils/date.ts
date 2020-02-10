export default {
  toISODate: (date?: string | number): string => {
    let [isoDate] = new Date().toISOString().split('T')

    if (date) {
      [isoDate] = new Date(date).toISOString().split('T')
    }

    return isoDate
  }
}
