const {readFileSync, writeFileSync, appendFileSync} = require('fs')
const argv = require('minimist')(process.argv.slice(2))


argv._.forEach(arg => {
  level = {waypoints:[]}
  function spawnstruct() {
    return {
      children: []
    }
  }

  let gscWpStr = readFileSync(arg, 'utf-8')


  gscWpStr = gscWpStr.split('(').join('[')
  gscWpStr = gscWpStr.split(')').join(']')
  gscWpStr = gscWpStr.split('[]').join('()')

  gscWpStr = gscWpStr.substr(gscWpStr.indexOf('level.waypoints[0]'))
  gscWpStr = gscWpStr.substr(0, gscWpStr.indexOf('level.waypointCount'))

  eval(gscWpStr)

  writeFileSync(arg + ".csv", level.waypoints.length+"\n")

  level.waypoints.forEach(wp => {
    let str = `${wp.origin[0]} ${wp.origin[1]} ${wp.origin[2]},`

    wp.children.forEach((c, i) => {
      str += c

      if (i < wp.children.length - 1)
        str += ' '
    })
    str += `,${wp.type},`

    if (wp.angles !== undefined)
      str += `${wp.angles[0]} ${wp.angles[1]} ${wp.angles[2]},`
    else
      str += ','

    if (wp.jav_point !== undefined)
      str += `${wp.angles[0]} ${wp.angles[1]} ${wp.angles[2]},`
    else
      str += ','

    appendFileSync(arg + ".csv", str + '\n')
  })
})
