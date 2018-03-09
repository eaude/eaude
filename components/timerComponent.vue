<template>
  <div class="timer">
    <p class='p1-xl p2-l p3-s'>{{ time | parseTime }}</p>
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
    parseTime (input) {
      const split = input.split(',')
      const timer = typeof split[1] !== 'undefined'
        ? split[1].replace(/AM|PM/g, '')
        : split[1]
      const year = split[0]
        .split('/')
        .map((el) => el.length <= 1 ? '0' + el : el)
        .join('.')
      return year + timer
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
