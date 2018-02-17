<template>
  <div class="timer">
    <p class='p1-xl p2-l p3-s'>{{ time | parseTimeString }}</p>
  </div>
</template>

<script>
export default {
  data () {
    return {
      ticker: '',
      time: ''
    }
  },
  filters: {
    parseTimeString (input) {
      return input.replace(/\//g, '.')
        .replace(/AM|PM/g, '')
        .split(',')
        .map((time, i) => {
          if (i < 1) {
            const year = time.substring((time.length - 4), (time.length))
            return (time[1] === '.' ? '0' : '') + time.replace(year, year.slice(2))
          }
          return time
        }).join('')
    }
  },
  created () {
    const options = {
      timeZone: 'America/New_York',
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    }
    const formatter = new Intl.DateTimeFormat([], options)
    this.ticker = setInterval(() => {
      this.time = formatter.format(new Date())
    })
  },
  beforeDestroy () {
    clearInterval(this.ticker)
  }
}
</script>

<style scoped>
  .timer {
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
