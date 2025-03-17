import type {UserConfig} from '@commitlint/types'
import fs from 'fs'
import path from 'path'

// Dynamically get the list of directories inside src/
const scopes = fs
  .readdirSync(path.join(__dirname, 'src'), {withFileTypes: true})
  .filter((dirent) => dirent.isDirectory())
  .map((dirent) => dirent.name)

const Configuration: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  formatter: '@commitlint/format',
  rules: {
    'scope-enum': [2, 'always', [...scopes, 'deps']],
  },
}

export default Configuration
