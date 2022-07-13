import { serverHttp } from './app'
import constants from './constants'

const { port, host } = constants

serverHttp.listen(port, () => {
  console.log(`Server is running on http://${host}:${port}`);
});
