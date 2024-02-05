import doteenv from 'dotenv'

doteenv.config()

export const { APP_PORT ,DEBUG_MODE,DB_URL ,JWT_SECRETKEY, REFRESH_SECRETKEY} = process.env;