const {readFileSync} = require('fs')

const stringifyWeaponFile = (wfObj = {}) => {
  let answer = 'WEAPONFILE'

  for (let key in wfObj) {
    value = wfObj[key]

    answer += `\\${key}\\${value}`
  }

  return answer
}

const parseWeaponFile = (wfStr = '') => {
  const answer = {}

  splitWFStr = wfStr.split('\\')

  // [0] should be WEAPONFILE

  for (let i = 1; i < splitWFStr.length; i++) {
    // odds should be keys, evens should be values for those keys.

    const key = splitWFStr[i]
    const value = splitWFStr[++i]

    answer[key] = value
  }

  return answer
}

const argv = require('minimist')(process.argv.slice(2))

const weaponFileStr1 = readFileSync(argv._[0], 'utf-8')
const weaponFileStr2 = readFileSync(argv._[1], 'utf-8')

const wf1 = parseWeaponFile(weaponFileStr1)
const wf2 = parseWeaponFile(weaponFileStr2)

const wfmerged = Object.assign(wf1, wf2)

console.log(stringifyWeaponFile(wfmerged))
